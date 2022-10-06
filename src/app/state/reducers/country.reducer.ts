import { CountryActionTypes } from '../actions/country.actions';

export const initialState = [];

export function countryReducer(state = initialState, action) {
  switch (action.type) {
  case CountryActionTypes.addCountries:
    return [...action.countries];

  default:
    return state;
  }
}
