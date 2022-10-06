# State Management

We work with [NgRx](https://ngrx.io/) as our State Management.  
It shall be our single source of data for the user journey. We use it to store data as user config, cart, checkout etc.

## Structure

The key components you'll interact with are described below.

### Actions

Actions describe unique events that are dispatched from components and services.  
They live in `app/state/actions` folder.

### Reducers

State changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.  
They live in `app/state/reducers` folder.

### Selectors

Selectors are pure functions used to select, derive and compose pieces of state.  
We consume it from our classes:

```typescript
import { Store } from '@ngrx/store';

class MyComponent {
  constructor(private store: Store) {}

  appData$;

  ngOnInit() {
    this.appData$ = this.store.select('appReducer');
  }
}
```

## Creating a new Store

The app is big, so we break data into separate pieces based on their context.  
Let's say you want to store Cart data.  

### 1. Create the Actions

It's important for you to design what you want to store, and how to interact with the data.  
The Actions should describe it well.
We can define the actions like this:

```typescript
import { createAction, props } from '@ngrx/store';

export enum CartActionTypes {
  addToCart= '[Cart] Add to Shopping Cart',
  removeFromCart= '[Cart] Remove from Shopping Cart',
}

export const addToCart = createAction(
  CartActionTypes.addToCart,
  props<any>(),
);

export const removeFromCart = createAction(
  CartActionTypes.removeFromCart,
  props<any>(),
);
```

### 2. Create the Reducers

As mentioned before, state changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.  

```typescript
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CartActionTypes } from '../actions/cart.actions';

// Always define an initial state
export const initialState = {
  products: JSON.parse(localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.PRODUCTS)),
}

export function cartReducer(state = initialState, action) {
  // Here you'll go through all actions you defined for this state
  switch (action.type) {
    case CartActionTypes.addToCart:
      return {...state, products: { ...state.products, ...action.products } };

    case CartActionTypes.removeFromCart:
      return { ...state, products: state.products.filter(({ id }) => id !== action.id) };

    // Always return the current state, when the action is not recognised
    // Usually read actions pass here
    default:
      return state;
  }
}
```

### 3. Make it public to the whole App

Export the Reducer to the App Module, so any component from anywhere can consume this data:

```typescript
// Do this changes to src/app.module.ts

import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/reducers/cart.reducer';

@NgModule({
  // ...
  imports: [
    // ...
    StoreModule.forRoot({
      cartReducer,
    }),
    // ...
  ],
  // ...
})
export class AppModule {}
```

### 4. Consume the data from you component

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart } from 'src/app/state/actions/cart.actions';

@Component({
  selector: 'app-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  styleUrls: ['./checkout-order-summary.component.scss']
})
export class CheckoutOrderSummaryComponent implements OnInit {
  public cart$: Observable<any>;
  public products = [];

  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    // pass the reducer name, as you named it in app.module.ts
    this.cart$ = this.store.select('cartReducer');

    // you can subscribe to changes
    this.cart$.subscribe(({ products }) => this.products = products);
  }

  onAddToCart() {
    // You can change the data dispatching actions you defined before with new data
    this.store.dispatch(addToCart(this.products));
  }
}
```
