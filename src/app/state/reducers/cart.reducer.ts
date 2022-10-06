import { OfferStatusEnum } from '@shared/enums/offers.enum';
import { AppActionTypes } from '../actions/app.actions';
import { CartActionTypes } from '../actions/cart.actions';

export const initialState = {
  products: [],
  totalProductsValue: 0,
  currencyCode: 'USD',
  discount: 0,
  coupon_type: 0,
};

const getTotalProductsValue = (products, selectedCurrency = 'USD') =>
  products.reduce((currentValue, nextProduct) => {
    let price = 0;

    if (nextProduct.offers && nextProduct.offers.statusId == OfferStatusEnum.ACCEPTED)
      price = nextProduct.offers.price[selectedCurrency.toLowerCase()]?.value;
    else if (nextProduct.catalog.is_discount == 1 && nextProduct.catalog.discount_price.length)
      price = nextProduct.catalog.discount_price.find(({ currency }) => currency === selectedCurrency).value;
    else if (nextProduct.catalog.regular_price.length)
      price = nextProduct.catalog.regular_price.find(({ currency }) => currency === selectedCurrency).value;
    else price = 0;

    return currentValue + (price ?? 0);
  }, 0);

const onAddDiscount = (state, action) => {
  const newState = { ...state, discount: action.discount, couponType: action.couponType };

  return newState;
};

const onARemoveDiscount = (state, action) => {
  const newState = {
    ...state,
    discount: action.discount,
    couponType: 0,
    totalProductsValue: action.totalProductsValue ?? state.totalProductsValue,
  };

  return newState;
};

const onAddToCart = (state, action) => {
  if (action.products?.length) {
    const newState = { ...state, products: [...action.products], discount: 0 };

    newState.totalProductsValue = getTotalProductsValue(newState.products, action.selectedCurrency);

    if (action.selectedCurrency) newState.currencyCode = action.selectedCurrency;

    return newState;
  }

  return state;
};

const onRemoveFromCart = (state, action) => {
  const newState = {
    ...state,
    products: state.products.filter(({ id }) => id !== action.id),
    discount: 0,
  };

  newState.totalProductsValue = getTotalProductsValue(newState.products, action.selectedCurrency);

  return newState;
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
  case CartActionTypes.addToCart:
    return onAddToCart(state, action);

  case CartActionTypes.removeFromCart:
    return onRemoveFromCart(state, action);

  case AppActionTypes.add:
    return onAddToCart(state, {
      products: action.products,
      selectedCurrency: action.settings.currencyCode,
    });
  case CartActionTypes.addDiscount:
    return onAddDiscount(state, action);
  case CartActionTypes.removeDiscount:
    return onARemoveDiscount(state, action);
  case CartActionTypes.clearCart:
    return Object.assign({}, initialState);
    // return initialState;
  default:
    return state;
  }
}
