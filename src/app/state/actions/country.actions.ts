import { createAction, props } from '@ngrx/store';

export enum CountryActionTypes {
  addCountries = '[Country] Add Countries',
}

export const addCountries = createAction(CountryActionTypes.addCountries, props<any>());
