import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLoaderFactory, SharedModule } from '@shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutMainComponent } from './components/checkout-main/checkout-main.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { CheckoutHeaderComponent } from './components/checkout-header/checkout-header.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { CheckoutLoginComponent } from './components/checkout-login/login.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { CheckoutOrderSummaryComponent } from './components/checkout-order-summary/checkout-order-summary.component';
import { OnePageRegisterComponent } from './components/register/register.component';
import { OnePageLoginComponent } from './components/onepage-login/onepage-login.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxMaskModule } from 'ngx-mask';
import { TotalOrderValueComponent } from './components/total-order-value/total-order-value.component';
import { CheckoutFooterComponent } from './components/checkout-footer/checkout-footer.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '@environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { DhlInfoComponent } from './components/dhl-info/dhl-info.component';
import { GuestLoginComponent } from './components/guest-login/guest-login.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    CheckoutMainComponent,
    CheckoutViewComponent,
    CheckoutHeaderComponent,
    ShippingAddressComponent,
    PaymentMethodComponent,
    CheckoutLoginComponent,
    OrderReviewComponent,
    StepperComponent,
    CheckoutOrderSummaryComponent,
    OnePageRegisterComponent,
    OnePageLoginComponent,
    TotalOrderValueComponent,
    CheckoutFooterComponent,
    DhlInfoComponent,
    GuestLoginComponent,
  ],
  imports: [
    CheckoutRoutingModule,
    CommonModule,
    SharedModule,
    NgxPayPalModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    NgxStripeModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
})
export class CheckoutModule {}
