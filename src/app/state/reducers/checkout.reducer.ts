import { CheckoutActionTypes } from '../actions/checkout.actions';

export const initialState = {
  path: 'shipping-address',
  shippingAddress: null,
  paymentMethod: null,
  order: null,
};

export function checkoutReducer(state = initialState, action) {
  switch (action.type) {
  case CheckoutActionTypes.addOrder:
    return { ...state, order: { ...action.order } };

  case CheckoutActionTypes.addPaymentMethod:
    return { ...state, paymentMethod: { ...action.paymentMethod } };

  case CheckoutActionTypes.addShippingAddress:
    return action.billingAddress
      ? {
        ...state,
        shippingAddress: { ...action.shippingAddres },
        billingAddress: { ...action.billingAddress },
      }
      : { ...state, shippingAddress: { ...action.shippingAddres } };

  case CheckoutActionTypes.removeShippingAddress:
    return { ...state, shippingAddress: null, billingAddress: null };

  default:
    return state;
  }
}
