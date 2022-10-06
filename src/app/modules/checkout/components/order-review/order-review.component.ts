import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { CheckoutService } from '@services/checkout/checkout.service';
import Order from '@services/checkout/models/order';
import Payment from '@services/checkout/models/payment';
import { ConfigurationService } from '@services/checkout/payment-configuration.service';
import { SharedService } from '@services/common/shared.service';
import { EmailNotificationService } from '@services/email_notification.service';
import { LocalStorageService } from '@services/local-storage.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CookieService } from 'ngx-cookie-service';
import { IPayPalConfig } from 'ngx-paypal';
import { NgxSpinnerService } from 'ngx-spinner';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { clearCart } from 'src/app/state/actions/cart.actions';
declare let Klarna: any;
@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnInit {
  @Input() currency;
  klarnaService: any;
  public EmailNotiFormGroup: FormGroup;
  public checkout$: Subscription;
  public countries$: Subscription;
  public cart$: Subscription;
  public countries;
  public checkoutState;
  public price_drop: boolean;
  public waitlist: boolean;
  public news_letter: boolean;
  public order: Order;
  public payment: Payment = new Payment();
  public payPalConfig?: IPayPalConfig;
  public shippingModel = false;
  public klarnaResponse: any;
  public validKlarna = false;
  public invalidMessage: string = null;
  public totalProductsValue;
  public discount = 0;
  public products = [];
  public selectedLanguage: string;
  public shippingValue = 0;
  public totalShippingValue = 0;
  public countryWise;
  public user;
  public alreadyPaid = false;

  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private _appService: AppService,
    private segmentService: SegmentService,
    private emailNotificationService: EmailNotificationService,
    private _checkoutService: CheckoutService,
    private router: Router,
    private stripeService: StripeService,
    private localStorageService: LocalStorageService,
    private _configurationService: ConfigurationService,
    private _sharedService: SharedService,
    private cookieService: CookieService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.getOrder();
    this.setupPayment();
    this.checkOrderAlreadyPaid();
  }

  getOrder() {
    this.order = this._checkoutService.getPaymentMethod();

    if (!this.order) this.router.navigate(['/checkout/shipping-address']);
  }

  setupPayment() {
    switch (this.order.provider) {
      case 'stripe':
        this.stripeConfig();
        break;
      case 'paypal':
        this.paypalConfig();
        break;
      case 'klarna':
        this.klarnaConfig();
        break;
    }
  }

  loadData() {
    this.user = this.userService.getUserData().getValue() as UserData;
    this.cart$ = this.getCart();
    this.checkout$ = this.store.select('checkoutReducer').subscribe(state => {
      this.checkoutState = state;
      this.countryWise = state.shippingAddress?.countryWiseTax;

      if (!this.countryWise) return;

      this.shippingValue = this.countryWise[`shipping_cost_${this.currency}`];
      this.totalShippingValue = this.products.length * this.shippingValue;
    });
    this.countries$ = this.store.select('countryReducer').subscribe(state => {
      this.countries = state;
    });

    this.EmailNotiFormGroup = this.formBuilder.group({
      news_letter: [true],
    });
    this.getEmailNotification();
  }

  getEmailNotification() {
    this.emailNotificationService.getEmailNotification().subscribe(
      userData => {
        this.price_drop = userData.price_drop == 1 ? true : false;
        this.waitlist = userData.waitlist == 1 ? true : false;
        this.news_letter = userData.news_letter == 1 ? true : false;

        if (!this.news_letter) {
          this.updateEmailNotification();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getCart(): Subscription {
    const cart = this.store.select('cartReducer').subscribe(({ products, totalProductsValue, discount }) => {
      if (products && products.length) {
        this.products = products;
        this.totalProductsValue = totalProductsValue;
        this.discount = discount;

        return;
      }
    });

    return cart;
  }

  getCountryName(countryId) {
    return this.countries.find(({ id }) => id === countryId).name;
  }

  updateEmailNotification() {
    const body = [
      `news_letter=${this.EmailNotiFormGroup.value.news_letter == true ? 1 : 0}`,
      `&price_drop=${this.price_drop ? 1 : 0}&waitlist=${this.waitlist ? 1 : 0}`,
    ].join('');

    this.emailNotificationService.updateEmailNotification(body).subscribe();
  }

  submitPayment() {
    if (!this.alreadyPaid) {
      this.spinnerService.show();
      this.segmentService.trackOnePageUser('Checkout Step Completed', {
        step: 4,
        step_name: 'Review',
        shipping_method: 'dhl',
        payment_method: 'stripe',
      });
      this.stripeService
        .confirmCardPayment(this.payment.payment_intent_client_secret, {
          payment_method: {
            card: this._checkoutService.getCardMethod(),
            billing_details: {
              name: this.order.card.name,
            },
          },
        })
        .subscribe(data => {
          if (data?.paymentIntent?.status === 'succeeded') {
            this.payment.payment_id = data.paymentIntent.id;
            this._checkoutService.confirmPayment(this.payment).subscribe(response => {
              if (response.status) this.orderSuccess();
              else this.invalidMessage = response.error?.message;

              this.spinnerService.hide();
            });
          }
          else {
            this.invalidMessage = data.error?.message;
            this.spinnerService.hide();
          }
        });
    }
    else this.router.navigate([`/ordersuccess/${this.order.order_id}`]);
  }

  submitKlarnaPayment() {
    if (!this.alreadyPaid) {
      const foo = this;
      const spinnerService = this.spinnerService;

      spinnerService.show();
      this.segmentService.trackOnePageUser('Checkout Step Completed', {
        step: 4,
        step_name: 'Review',
        shipping_method: 'dhl',
        payment_method: 'klarna',
      });
      this.klarnaService.Payments.authorize(
        {
          payment_method_category: 'pay_later',
        },
        function (klarnaResponse) {
          if (!klarnaResponse.approved) {
            spinnerService.hide();
          }

          if (klarnaResponse.approved) {
            foo.payment.authorization_token = klarnaResponse.authorization_token;
            foo._checkoutService.confirmPayment(foo.payment).subscribe(response => {
              if (response.status) foo.orderSuccess();
            });
          }
        }
      );
    }
    else this.router.navigate([`/ordersuccess/${this.order.order_id}`]);
  }

  private stripeConfig(): void {
    this.spinnerService.show();
    this._checkoutService.createPayment(this.order).subscribe(data => {
      this.payment.provider = this.order.provider;
      this.payment.order_id = this.order.order_id;
      this.payment.payment_intent_client_secret = data.payment_intent_client_secret;
      this.payment.response = data;
      this.spinnerService.hide();
    });
  }

  private paypalConfig(): void {
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();
    const responseConfig = this._configurationService.loadConfiguration(currentAppConfiguaration.currencyID);

    responseConfig.then(config => {
      this._checkoutService.createPayment(this.order).subscribe(data => {
        const result: any = data.result;

        this.payment.order_id = this.order.order_id;
        this.payment.provider = this.order.provider;
        this.payment.response = result;
        this.payPalConfig = {
          currency: this.currency,
          clientId: config.paypal,
          createOrderOnClient: data =>
            <any>{
              intent: result.intent,
              orderId: this.order.order_id,
              purchase_units: result.purchase_units,
            },
          advanced: {
            commit: 'true',
            extraQueryParams: [{ name: 'disable-funding', value: 'credit,card,mercadopago' }],
          },
          style: {
            label: 'paypal',
            layout: 'vertical',
          },
          onApprove: (data, actions) => {
            this.spinnerService.show();
            actions.order.get().then(details => {});
          },
          onClientAuthorization: data => {
            this.payment.response.status = data.status;
            const payPalResponse: any = data;

            this.payment.response.transaction_id = payPalResponse?.purchase_units[0]?.payments.captures[0]?.id;
            this._checkoutService.confirmPayment(this.payment).subscribe(response => {
              if (response?.success) this.orderSuccess();
            });
          },
          onCancel: (data, actions) => {},
          onError: err => {},
          onClick: (data, actions) => {
            if (!this.alreadyPaid) {
              this.segmentService.trackOnePageUser('Checkout Step Completed', {
                step: 4,
                step_name: 'Review',
                shipping_method: 'dhl',
                payment_method: 'paypal',
              });
            }
            else this.router.navigate([`/ordersuccess/${this.order.order_id}`]);
          },
        };
      });
    });
  }

  private checkOrderAlreadyPaid() {
    this._checkoutService.checkPayment(this.order.order_id).subscribe(
      response => {},
      error => {
        if (error.status === 'confirmed') {
          this.segmentService.trackOnePageUser('Double payment avoid', {
            step: 4,
            step_name: 'Review',
            shipping_method: 'dhl',
            payment_method: 'paypal',
          });
          this.alreadyPaid = true;
        }
      }
    );
  }

  private klarnaConfig(): void {
    this.spinnerService.show();
    this._checkoutService.createPayment(this.order).subscribe(data => {
      this.payment.provider = this.order.provider;
      this.payment.order_id = this.order.order_id;
      this.payment.response = data;
      this.klarnaResponse = data.response;
      this.setupKlarna();
    });
  }

  private setupKlarna(): void {
    const foo = this;

    try {
      this.klarnaService = Klarna;
      this.klarnaService.Payments.init({
        client_token: this.klarnaResponse.klarnaResponse.client_token,
      });
      this.klarnaService.Payments.load(
        {
          container: '#klarna-payments-container',
          payment_method_category: 'pay_later',
        },
        {
          billing_address: this.klarnaResponse.postFields.billing_address,
        },
        function (response) {
          foo.validKlarna = response.show_form;

          if (!foo.validKlarna) {
            foo._checkoutService.setKlarnaIssue(true);
            foo.router.navigate(['/checkout/payment-method']);
          }

          foo.spinnerService.hide();
        }
      );
    }
    catch (e) {}
  }

  orderSuccess() {
    this.spinnerService.hide();

    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, 0 + '', {
      path: '/',
      domain: environment.cookieDomain,
    });

    this._sharedService.updateItemCount(0);
    this._sharedService.updateCartCount(0);
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();

    this.selectedLanguage = currentAppConfiguaration.languageShortName;
    this.segmentService.OrderCompleted(
      this.currency,
      this.selectedLanguage,
      this.products,
      this.totalProductsValue,
      this.totalShippingValue,
      this.discount,
      this.order,
      this.user
    );
    this.destroy();
    this.router.navigate([`/ordersuccess/${this.order.order_id}`]);
  }

  destroy() {
    this.localStorageService.removeItem(APP_CONSTANTS.STORAGE_KEYS.PRODUCTS);
    this.store.dispatch(clearCart({}));
    this.checkout$.unsubscribe();
    this.countries$.unsubscribe();
    this.cart$.unsubscribe();
    this._checkoutService.destroy();
    this.spinnerService.hide();
  }

  openShippingInfo() {
    this.shippingModel = true;
  }

  hideShipPop() {
    this.shippingModel = false;
  }
}
