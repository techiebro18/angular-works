import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';
import { UniversalService } from '@services/universal.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { addToCart } from 'src/app/state/actions/cart.actions';
import { CartActionsService } from '@services/cart/cart-actions.service';

@Component({
  selector: 'app-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  styleUrls: ['./checkout-order-summary.component.scss'],
})
export class CheckoutOrderSummaryComponent implements OnInit {
  @Input() currency = 'USD';
  @Input() hideTitle = false;
  public cart$: Observable<any>;
  public products = [];
  public shippingValue = 0;
  public totalShippingValue = 0;
  public subTotal;
  public countryWise;
  public totalProductsValue;
  public discount = 0;
  public hasDiscount = false;
  public hasOffer = false;
  public appConfig = {
    currencyCode: 'USD',
  };
  public couponType = 0;
  constructor(
    private store: Store<any>,
    private universalService: UniversalService,
    private localStorageService: LocalStorageService,
    private cartActionsService: CartActionsService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.store.select('cartReducer');
    this.cart$.subscribe(({ products, totalProductsValue, discount, couponType }) => {
      if (products && products.length) {
        this.couponType = couponType
          ? couponType
          : 0;
        this.products = products;
        this.totalProductsValue = totalProductsValue;
        this.discount = discount;
        this.verifyDiscount();
        this.verifyOffer();

        return;
      }

      this.getProductsFromStorage();
    });

    this.store.select('appReducer').subscribe(state => (this.appConfig = state));
    this.store.select('checkoutReducer').subscribe(state => {
      this.countryWise = state.shippingAddress?.countryWiseTax;

      if (!this.countryWise) return;

      this.shippingValue = this.countryWise[`shipping_cost_${this.appConfig.currencyCode}`];
      this.totalShippingValue = this.products.length * this.shippingValue;
    });
  }

  getProductsFromStorage() {
    if (!this.universalService.isBrowser) return;

    this.store.dispatch(
      addToCart({
        products: JSON.parse(this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.PRODUCTS)),
        selectedCurrency: this.appConfig.currencyCode,
      })
    );
  }

  getProductPrice(product) {
    return this.cartActionsService.getProductPrice(product, this.appConfig.currencyCode);
  }

  getRegularProductPrice(product) {
    return this.cartActionsService.getRegularProductPrice(product, this.appConfig.currencyCode);
  }

  getDiscountProductPrice(product) {
    return this.cartActionsService.getDiscountProductPrice(product, this.appConfig.currencyCode);
  }

  getDiscountPercentage(product) {
    return this.cartActionsService.getDiscountPercentage(product, this.appConfig.currencyCode);
  }

  getOfferPercentage(product): number {
    return this.cartActionsService.getOfferPercentage(product, this.appConfig.currencyCode);
  }

  getRegularTotalAmount() {
    return this.cartActionsService.getRegularTotalAmount(this.products, this.appConfig.currencyCode);
  }

  getProductOfferPrice(product) {
    return this.cartActionsService.getProductOfferPrice(product, this.appConfig.currencyCode);
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

  getShippingValue() {
    if (!this.countryWise) return;

    this.shippingValue = this.countryWise[`shipping_cost_${this.appConfig.currencyCode}`];
  }
}
