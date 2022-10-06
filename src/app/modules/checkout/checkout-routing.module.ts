import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { CheckoutMainComponent } from './components/checkout-main/checkout-main.component';
import { CheckoutLoginComponent } from './components/checkout-login/login.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutMainComponent,
    children: [
      {
        path: '',
        component: CheckoutViewComponent,
        children: [
          {
            path: 'login',
            component: CheckoutLoginComponent,
          },
          {
            path: 'shipping-address',
            component: ShippingAddressComponent,
          },
          {
            path: 'payment-method',
            component: PaymentMethodComponent,
          },
          {
            path: 'review-order',
            component: OrderReviewComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
