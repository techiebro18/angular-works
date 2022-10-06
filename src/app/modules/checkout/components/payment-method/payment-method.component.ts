import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app/app.service';
import { CheckoutService } from '@services/checkout/checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SegmentService } from '@services/segment.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import Order from '@services/checkout/models/order';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '@services/cart/cart.service';
import { Observable, Subscription } from 'rxjs';
import Card from '@services/checkout/models/card';
import { addDiscount, removeDiscount } from 'src/app/state/actions/cart.actions';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { LoaderService } from '@services/app/loader.service';
import { addOrder } from 'src/app/state/actions/checkout.actions';
import { ConfigurationService } from '@services/checkout/payment-configuration.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss', '../checkout-view/checkout-view.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    hidePostalCode: true,
    style: {
      base: {
        'iconColor': '#777',
        'color': '#707070',
        'fontWeight': 300,
        'fontFamily': 'FuturaBT Light, system-ui, sans-serif',
        'fontSize': '14px',
        'fontSmoothing': 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: '#888' },
      },
      invalid: {
        iconColor: '#dc3545',
        color: '#dc3545',
      },
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  constructor(
    private _appService: AppService,
    private store: Store<any>,
    private _checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private router: Router,
    public segmentService: SegmentService,
    private _cookieService: CookieService,
    private _cartService: CartService,
    private loaderService: LoaderService,
    private stripeService: StripeService,
    private _configurationService: ConfigurationService
  ) {
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();
    const responseConfig = this._configurationService.loadConfiguration(currentAppConfiguaration.currencyID);

    responseConfig.then(config => {
      this.stripeService.setKey(config.stripe);
      this.paymentMethod = 'stripe';
    });

    this.router.events.subscribe(event => {
      this.klarnaIssue = this._checkoutService.getKlarnaIssue();

      if (this.klarnaIssue && this.paymentMethod === 'klarna') this.paymentMethod = null;
    });
  }

  public order: Order = new Order();
  orderId?: number = null;
  public checkoutForm = new FormGroup({});
  public couponForm = new FormGroup({});
  public paymentMethod: string;
  public couponCode: string;
  public selectedCurrency = 'USD';
  public selectedLanguage: string;
  public cardIcon = 'nocard.png';
  public checkout$: Subscription;
  public cart$: Observable<any>;
  public checkoutState;
  public modelCard: Card;
  public invalidMessage: string = null;
  public klarnaIssue = false;
  public hasOffer = false;
  products: any;
  couponApplied = false;
  couponMessage: string = null;
  validCard = false;

  ngOnInit(): void {
    this.getSettings();
    this.getOrder();
    this.setupForm();
  }

  onCardChange(event: StripeCardElementChangeEvent) {
    this.validCard = event.complete;
  }

  private getSettings(): void {
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();

    this.selectedCurrency = currentAppConfiguaration.currencyCode;
    this.selectedLanguage = currentAppConfiguaration.languageShortName;
  }

  private setupForm(): void {
    this.checkoutForm = this.formBuilder.group({
      card_name: ['', Validators.required],
    });
    this.couponForm = this.formBuilder.group({
      coupon_code: ['', Validators.required],
    });
  }

  public addCoupon(): void {
    this.loaderService.triggerLoading.emit(true);
    this.getOrder();
    this.order.coupon_code = this.couponForm?.value.coupon_code;
    this.couponMessage = null;
    this._checkoutService.applyCoupon(this.order).subscribe(
      result => {
        if (result?.status) {
          this.couponApplied = true;
          this.store.dispatch(
            addDiscount({
              discount: result.coupon_amount,
              couponType: result.coupon_type,
            })
          );
        }

        this.loaderService.triggerLoading.emit(false);
      },
      error => {
        this.couponMessage = error.message;
        this.loaderService.triggerLoading.emit(false);
      }
    );
  }

  public cancelCoupon(): void {
    this.loaderService.triggerLoading.emit(true);
    this.getOrder();
    this.order.coupon_code = this.couponForm?.value.coupon_code;
    this._checkoutService.cancelCoupon(this.order).subscribe(data => {
      if (data?.status) {
        this.couponApplied = false;
        this.couponForm?.patchValue({ coupon_code: null });
        this.store.dispatch(
          removeDiscount({
            discount: 0,
            couponType: 0,
            totalProductsValue: data.subTotal_amt,
          })
        );
      }

      this.loaderService.triggerLoading.emit(false);
    });
  }

  public addCard(): void {
    if (this.order) this.getOrder();

    this.modelCard = {
      name: this.checkoutForm?.value.card_name,
    };
    this.order.card = this.modelCard;
    this._checkoutService.setCardMethod(this.card.element);
    this.submitOrder();
  }

  public addPaypal(): void {
    if (this.order) this.getOrder();

    this.submitOrder();
  }

  public addKlarna(): void {
    if (this.order) this.getOrder();

    this.submitOrder();
  }

  public submitOrder(): void {
    this.loaderService.triggerLoading.emit(true);
    this._checkoutService.createOrder(this.order, this.selectedLanguage, this.selectedCurrency).subscribe(
      result => {
        if (result?.status === 'success') {
          this._checkoutService.setOrderId(result.data.order_id);
          this.order.order_id = result.data.order_id;
          this.order.order_detail = result.data.orderDetail;
          this.order.order_cart = result.data.cartList
            ? JSON.parse(result.data.cartList)
            : {};
          this.order.provider = this.paymentMethod;
          this._checkoutService.setPaymentMethod(this.order);
          this.store.dispatch(addOrder({ order: this.order }));
          this.reviewStep();
        }
      },
      error => {
        this.setErrorMessage(error);
        this.loaderService.triggerLoading.emit(false);
      }
    );
  }

  public reviewStep() {
    this.loaderService.triggerLoading.emit(false);
    this.segmentService.trackOnePageUser('Checkout Step Completed', {
      step: 3,
      step_name: 'Payment',
      payment_method: this.paymentMethod,
    });
    this.router.navigate(['/checkout/review-order']);
  }

  setErrorMessage(error: any) {
    this.invalidMessage = error.message;
  }

  getOrder() {
    if (this.order) this.order = new Order();

    this.getDeviceId();
    this.getProducts();
    this.order.order_id = this._checkoutService.getOrderId();
    this.order.coupon_code = this.couponApplied
      ? this.couponForm?.value.coupon_code
      : '';
    this.checkout$ = this.store.select('checkoutReducer').subscribe(state => (this.checkoutState = state));

    if (this.checkoutState.shippingAddress) {
      this.order.billing_address_id = this.checkoutState.billingAddress.id;
      this.order.shipping_address_id = this.checkoutState.shippingAddress.id;
    }
    else this.router.navigate(['/checkout/shipping-address']);
  }

  getDeviceId() {
    this.order.device_id = this._cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (this.order.device_id == null || this.order.device_id.trim() === '') {
      this._cartService.getDeviceId().subscribe(device_id => {
        this.order.device_id = device_id;
      });
    }
  }

  getProducts() {
    //const keys = 'product_id', 'offers'];
    this.cart$ = this.store.select('cartReducer');
    this.cart$.subscribe(data => {
      if (data?.discount > 0) this.couponApplied = true;

      if (data?.products && data?.products.length) {
        this.products = data.products;
        this.order.product_ids = data.products.map(x => x.product_id).join(',');
        this.order.products = data.products.map(x => ({
          product_id: x.product_id,
          offers: x.offers
            ? x.offers
            : {},
        }));
        data.products.forEach(product => {
          if (product.offers && product.offers.statusId == 2) this.hasOffer = true;
        });

        return;
      }
    });
  }
}
