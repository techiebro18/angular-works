import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app/app.service';
import { CartService } from '@services/cart/cart.service';
import CartPlusMinusRequestFiltered from '@services/cart/models/cart-plus-minus-request-filtered';
import GetShoppingCartRequestFiltered from '@services/cart/models/get-shopping-cart-request-filtered';
import { SharedService } from '@services/common/shared.service';
import { LocalStorageService } from '@services/local-storage.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { addToCart } from 'src/app/state/actions/cart.actions';

@Injectable({ providedIn: 'root' })
export class CartActionsService {
  public device_id: string;
  public currency: string;
  public language: string;
  public currentLanguage: string;

  constructor(
    private cartService: CartService,
    private appService: AppService,
    private store: Store<any>,
    private _sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
  ) {
    const appConfig = this.appService.getAppConfigurationValue();

    if (appConfig && appConfig.currencyCode) {
      this.currency = appConfig.currencyCode;
    }

    if (appConfig && appConfig.languageShortName) {
      this.language = appConfig.languageShortName;
    }

    this.currentLanguage = this.getCurrentPLPLanguageSuffix();
  }

  public addToCart(productId): Observable<any> {
    this.device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (this.device_id == null || this.device_id.trim() == '') {
      return this.cartService.getDeviceId().pipe(
        switchMap((device_id: string) => {
          this.device_id = device_id;

          if (this.device_id != null) {
            this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID, this.device_id, {
              path: '/',
              domain: environment.cookieDomain,
            });

            return this.getCart(this.device_id, productId);
          }
          else return of({});
        }),
        catchError(errorForFirstOrSecondCall => {
          throw new Error('Error: ' + errorForFirstOrSecondCall.message);
        })
      );
    }
    else return this.getCart(this.device_id, productId);
  }

  getCart(device_id: string, productId): Observable<any> {
    const access_token = this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    const cartRequest: GetShoppingCartRequestFiltered = {
      device_id: device_id,
      language: this.language,
      currency: this.currency,
    };

    return this.cartService.getCart(cartRequest, access_token).pipe(
      switchMap((response: any) => {
        const cartPlusMinusRequest: CartPlusMinusRequestFiltered = {
          device_id: device_id,
          cart_id: response.cart.id,
          product_id: productId,
          position: 0,
          language: this.language,
          currency: this.currency,
        };

        return this.cartService.cartPlus(cartPlusMinusRequest, access_token).pipe(
          map((response: any) => {
            const cart = response.cart;
            const products = response.products;

            this.store.dispatch(addToCart({ products: response.products, selectedCurrency: this.currency }));

            this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, products.length + '', {
              path: '/',
              domain: environment.cookieDomain,
            });

            this._sharedService.updateItemCount(products.length);
            this._sharedService.updateCartCount(products.length);

            return { status: true, message: 'Product added successfully' };
          })
        );
      }),
      catchError(errorForFirstOrSecondCall => {
        throw new Error('Error: ' + errorForFirstOrSecondCall.message);
      })
    );
  }

  public getCurrentPLPLanguageSuffix() {
    // Language should be taken from domain
    let languageSuffix = '';
    const subdomain = this.appService.getCurrentSubDomain(null);

    // Algolia uses en for English-us and Englisg-uk
    languageSuffix = subdomain == '' || subdomain == 'uk' ? 'en' : subdomain;

    // Algolia has swedish language as 'sv' instead of 'se' !!
    // Algolia has Danish language as 'da' instead of 'dk' !!
    if (languageSuffix == 'se') {
      languageSuffix = 'sv';
    }
    else if (languageSuffix == 'dk') {
      languageSuffix = 'da';
    }

    return languageSuffix;
  }

  public getTotalAmount(products, currency) {
    return products.reduce((accumulator, current) => {
      let price = 0;

      if (current.offers && current.offers.statusId == 2) {
        price = current.offers.price[currency.toLowerCase()].value;
      }
      else if (current.catalog.is_discount == 1 && current.catalog.discount_price.length) {
        price = current.catalog.discount_price.find(item => item.currency === currency).value;
      }
      else if (current.catalog.regular_price.length) {
        price = current.catalog.regular_price.find(item => item.currency === currency).value;
      }

      return accumulator + price;
    }, 0);
  }

  public getRegularTotalAmount(products, currency) {
    return products.reduce((accumulator, current) => {
      const price = current.catalog.regular_price.find(item => item.currency === currency).value;

      return accumulator + price;
    }, 0);
  }

  public getTotalDiscount(products, currency) {
    return this.getRegularTotalAmount(products, currency) - this.getTotalAmount(products, currency);
  }

  public getProductPrice(product, curr) {
    let price = 0;

    if (product.is_discount == 1 && product.discount_price.length)
      price = product.discount_price.find(({ currency }) => currency === curr).value;
    else if (product.regular_price.length)
      price = product.regular_price.find(({ currency }) => currency === curr).value;
    else price = 0;

    return price ?? 0;
  }

  public getProductOfferPrice(product, currencyCode: string | CurrencyCodeEnum) {
    let price = 0;

    if (product.offers) price = product.offers.price[currencyCode.toLowerCase()].value;
    else price = 0;

    return price ?? 0;
  }

  public getRegularProductPrice(product, curr) {
    let price = 0;

    if (product.regular_price.length) price = product.regular_price.find(({ currency }) => curr === currency).value;
    else price = 0;

    return price ?? 0;
  }

  public getDiscountPercentage(product, curr) {
    let discount_price = 0;
    let price = 0;

    discount_price = product.discount_price.find(({ currency }) => currency === curr).value;
    price = product.regular_price.find(({ currency }) => currency === curr).value;

    return (((discount_price - price) / price) * 100 * -1).toFixed(0);
  }

  public getOfferPercentage(product, currency: string | CurrencyCodeEnum): number {
    let price = 0;
    const offer_price = this.getProductOfferPrice(product, currency);

    price = this.getRegularProductPrice(product.catalog, currency);

    return +(((offer_price - price) / price) * 100 * -1).toFixed(0);
  }

  public getDiscountProductPrice(product, curr) {
    return product.discount_price.find(({ currency }) => currency === curr).value;
  }
}
