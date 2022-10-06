import { createAction, props } from '@ngrx/store';

export enum CartActionTypes {
  addToCart = '[Cart] Add to Shopping Cart',
  removeFromCart = '[Cart] Remove from Shopping Cart',
  addDiscount = '[Cart] Add Discount coupon code',
  removeDiscount = '[Cart] Remove Discount coupon code',
  clearCart = '[Cart] Clear products from the cart',
}

export const addToCart = createAction(CartActionTypes.addToCart, props<any>());

export const removeFromCart = createAction(CartActionTypes.removeFromCart, props<any>());

export const addDiscount = createAction(CartActionTypes.addDiscount, props<any>());

export const removeDiscount = createAction(CartActionTypes.removeDiscount, props<any>());

export const clearCart = createAction(CartActionTypes.clearCart, props<any>());
