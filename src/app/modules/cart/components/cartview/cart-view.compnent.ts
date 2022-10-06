import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app/app.service';
import { CartService } from '@services/cart/cart.service';
import CartPlusMinusRequestFiltered from '@services/cart/models/cart-plus-minus-request-filtered';
import GetShoppingCartRequestFiltered from '@services/cart/models/get-shopping-cart-request-filtered';
import { LocalStorageService } from '@services/local-storage.service';
import { ProductService } from '@services/product.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '@services/common/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';
import { addToCart, removeFromCart } from 'src/app/state/actions/cart.actions';
import { PlpCurrencyData } from 'src/app/modules/catalog/pages/listing-view/plp-definitions';
import { SegmentService } from '@services/segment.service';
import { MetaService } from '@services/app/meta.service';
import { ProductWishlist } from '@schemas/product/wishlist.interface';
import { LoaderService } from '@services/app/loader.service';
import { DialogService } from '@services/app/dialog.service';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import { UrlService } from '@services/url.service';
import { CartActionsService } from '@services/cart/cart-actions.service';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';

@Component({
  selector: 'tvb-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
})
export class CartViewComponent implements OnInit {
  public isFetched = false;
  public cart = { id: 0, item_count: 0, amount_payable: 0 };
  public products = [];
  public device_id: string = null;
  public userInfo: any = null;
  public language = 'en';
  public currency: string | CurrencyCodeEnum = 'USD';
  public currencyCode = 'USD';
  public amount_payable = 0;
  public showRemovedItemMessage = false;
  public currencyConfiguration$: Observable<PlpCurrencyData>;
  public currencyConfig: PlpCurrencyData;
  public cart$: Observable<any>;
  public user$: BehaviorSubject<UserData | null>;
  public hasDiscount = false;
  public hasOffer = false;
  public allFavorite = false;
  public previousUrl = '';
  loggedInStatus: any;
  private subscribes = [];

  constructor(
    private cookieService: CookieService,
    private _sharedService: SharedService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private appService: AppService,
    private store: Store<any>,
    private metaService: MetaService,
    private segmentService: SegmentService,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private userService: UserService,
    private urlService: UrlService,
    private cartActionsService: CartActionsService
  ) {
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    const appConfig = this.appService.getAppConfigurationValue();

    this.metaService.getStaticPageMeta('cart');
    this.currencyConfiguration$ = this.appService.getAppConfigurationObservable().pipe(
      switchMap(appConfig => {
        if (appConfig) {
          return of({
            plpCurrency: appConfig.currencyCode,
            plpCurrencySymbol: appConfig.currencySymbol,
          });
        }
        else {
          return of({
            plpCurrency: 'USD',
            plpCurrencySymbol: '$',
          });
        }
      })
    );
    this.setInitialCurrency(appConfig);
    this.setInitialLanguage(appConfig);
    this.setDeviceId();
    this.loggedInStatus = this.authService.loggedIn;
    this.cart$ = this.store.select('cartReducer');
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl;
    });
  }

  getWishlist(): void {
    this.loggedInStatus = this.authService.loggedIn;

    if (this.loggedInStatus) {
      this.productService.getWishlist().subscribe(
        data => {
          this.productService.updateUserWishlistRecords(data);
          this.allFavorite = true;
          this.products.forEach(product => {
            if (!data['list'].find(x => x.product_id == product.product_id)) this.allFavorite = false;
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setInitialCurrency(appConfig) {
    if (appConfig && appConfig.currencyCode) {
      this.currency = appConfig.currencyCode;
    }

    this.currencyConfiguration$.subscribe(value => {
      this.currencyConfig = value;
      this.currency = this.currencyConfig.plpCurrency;
    });
  }

  setInitialLanguage(appConfig) {
    if (appConfig && appConfig.languageShortName) {
      this.language = appConfig.languageShortName;
    }
  }

  setDeviceId() {
    this.device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (this.device_id == null || this.device_id.trim() == '') {
      this.cartService.getDeviceId().subscribe(device_id => {
        this.device_id = device_id;

        if (this.device_id != null) {
          this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID, this.device_id, {
            path: '/',
            domain: environment.cookieDomain,
          });

          this.getCart(this.device_id);
        }
      });
    }
    else {
      this.getCart(this.device_id);
    }
  }

  continueShopping() {
    this.segmentService.continueShoppingButtonClick();

    if (this.previousUrl.includes('pdp=')) this.router.navigateByUrl(this.previousUrl);
    else this.router.navigate(['/new-in']);
  }

  doCheckout() {
    this.segmentService.proceedToCheckoutButtonClick();
    this.segmentService.CheckoutStarted(this.currency, this.language, this.amount_payable, this.products);
    this.router.navigate(['checkout/login']);
  }

  getDeviceId() {
    return this.cartService.getDeviceId().subscribe(device_id => {
      this.device_id = device_id;

      if (this.device_id != null) {
        this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID, this.device_id, {
          path: '/',
          domain: environment.cookieDomain,
        });

        this.getCart(this.device_id);
      }
    });
  }

  cartMinus(product) {
    const cartPlusMinusRequest: CartPlusMinusRequestFiltered = {
      cart_id: this.cart.id,
      product_id: product.product_id,
      device_id: this.device_id,
      language: this.language,
      currency: this.currency,
      position: 0,
    };
    const access_token = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN);
    const cartMinusSubscription = this.cartService.cartMinus(cartPlusMinusRequest, access_token).subscribe(
      response => {
        this.store.dispatch(removeFromCart({ id: product.id, selectedCurrency: this.currency }));
        this.onCartMinusSuccess(response);
      },
      error => console.error('Inside cartMinus, error caught in component', error)
    );

    this.subscribes.push(cartMinusSubscription);
  }

  onCartMinusSuccess(response) {
    this.cart = response.cart;
    this.products = response.products;
    this.amount_payable = this.getTotalAmount();
    this.showRemovedItemMessage = true;
    this.isFetched = true;
    this.localStorageService.setItem(APP_CONSTANTS.STORAGE_KEYS.CART, JSON.stringify(this.cart));
    this.localStorageService.setItem(APP_CONSTANTS.STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));

    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, this.products.length + '', {
      path: '/',
      domain: environment.cookieDomain,
    });

    this.segmentService.removeProductButtonClick();

    this._sharedService.updateItemCount(this.products.length);
    this._sharedService.updateCartCount(this.products.length);
    this.verifyDiscount();
  }

  getCart(device_id: string) {
    const cartRequest: GetShoppingCartRequestFiltered = {
      device_id: device_id,
      language: this.language,
      currency: this.currency,
    };
    const access_token = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN);

    const getCartSubscription = this.cartService.getCart(cartRequest, access_token).subscribe(
      response => this.onGetCartSuccess(response),
      error => console.error('Inside GET CART error caught in component', error)
    );

    this.subscribes.push(getCartSubscription);
  }

  onGetCartSuccess(response) {
    this.cart = response.cart;
    this.products = response.products;
    this.amount_payable = this.getTotalAmount();
    this.isFetched = true;
    this.segmentService.CartViewed(this.currency, this.language, this.products);
    this.localStorageService.setItem(APP_CONSTANTS.STORAGE_KEYS.CART, JSON.stringify(this.cart));
    this.localStorageService.setItem(APP_CONSTANTS.STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));

    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, this.products.length + '', {
      path: '/',
      domain: environment.cookieDomain,
    });

    this._sharedService.updateItemCount(this.products.length);
    this._sharedService.updateCartCount(this.products.length);
    this.verifyDiscount();
    this.verifyOffer();
    this.getWishlist();
  }

  getBrandUrl(product) {
    if (product.catalog.brand_seo.length) {
      const brandSeo = product.catalog.brand_seo.find(({ lang }) => lang === this.language);

      return `${brandSeo ? brandSeo.value : product.catalog.brand_seo[0].value}`;
    }
    else return '';
  }

  getTotalAmount() {
    return this.cartActionsService.getTotalAmount(this.products, this.currency);
  }

  getRegularTotalAmount() {
    return this.cartActionsService.getRegularTotalAmount(this.products, this.currency);
  }

  getTotalDiscount() {
    return this.cartActionsService.getTotalDiscount(this.products, this.currency);
  }

  getProductPrice(product) {
    return this.cartActionsService.getProductPrice(product, this.currency);
  }

  getProductOfferPrice(product) {
    return this.cartActionsService.getProductOfferPrice(product, this.currency);
  }

  getRegularProductPrice(product) {
    return this.cartActionsService.getRegularProductPrice(product, this.currency);
  }

  getDiscountPercentage(product) {
    return this.cartActionsService.getDiscountPercentage(product, this.currency);
  }

  getOfferPercentage(product): number {
    return this.cartActionsService.getOfferPercentage(product, this.currency);
  }

  verifyDiscount(): void {
    this.products.forEach(product => {
      if (product.catalog.is_discount == 1 && product.catalog.discount_price.length) this.hasDiscount = true;
    });
  }

  verifyOffer(): void {
    this.products.forEach(product => {
      if (product.offers && product.offers.statusId == 2) this.hasOffer = true;
    });
  }

  openLoginPopUp(): void {
    this.loggedInStatus = this.authService.loggedIn;

    if (!this.loggedInStatus) {
      this.dialogService
        .open(LoginRegisterDialogComponent, {
          isDefaultDialog: true,
          isWishlist: true,
          isSignIn: true,
        })
        .afterClosed()
        .subscribe(wasClosedByTheUser => {
          this.segmentService.addToWishlistButtonClick();

          if (wasClosedByTheUser) return;

          this.saveAllToWishlist();
        });
    }
    else this.saveAllToWishlist();
  }

  saveAllToWishlist(): void {
    this.loaderService.triggerLoading.emit(true);
    const productsWishlist: Array<ProductWishlist> = new Array<ProductWishlist>();

    this.products.forEach(product => {
      productsWishlist.push({ id: product.product_id });
    });
    this.productService.addProductsToWishlist(productsWishlist).subscribe(data => {
      this.getCart(this.device_id);
      this.createSegmentEvent(data);
      this.loaderService.triggerLoading.emit(false);
    });
  }

  createSegmentEvent(data: any) {
    data.forEach(item => {
      if (item.status === 'success') {
        const product = this.products.find(x => x.product_id == item.id);

        this.segmentService.AddedToWishlist(
          this.user$.getValue()?.id,
          item.wishlist_id,
          product.catalog,
          this.currency
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscribes.forEach(item => item?.unsubscribe());
  }
}
