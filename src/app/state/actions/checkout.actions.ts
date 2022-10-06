import { createAction, props } from '@ngrx/store';
import { PaymentMethod } from '../../modules/checkout/interfaces/payment-method.interface';
import { Address } from '../../modules/checkout/interfaces/address.interface';

export enum CheckoutActionTypes {
  addShippingAddress = '[Checkout] Add Shipping Address',
  addPaymentMethod = '[Checkout] Add Payment Method',
  addOrder = '[Checkout] Add Order',
  removeShippingAddress = '[Checkout] Remove Shipping Address',
}

export type ShippingAddress = {
  shippingAddres: Address;
  billingAddress: Address;
};

export const addShippingAddress = createAction(
  CheckoutActionTypes.addShippingAddress,
  props<ShippingAddress>()
);

export const addPaymentMethod = createAction(
  CheckoutActionTypes.addPaymentMethod,
  props<PaymentMethod>()
);

export const addOrder = createAction(CheckoutActionTypes.addOrder, props<any>());

export const removeShippingAddress = createAction(
  CheckoutActionTypes.removeShippingAddress,
  props<any>()
);
