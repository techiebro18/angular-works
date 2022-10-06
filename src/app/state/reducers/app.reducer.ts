import { AppActionTypes } from '../actions/app.actions';

export const initialState = {
  languageID: 1,
  languageName: 'English',
  languageShortName: 'en',
  currencyID: 1,
  currencySymbol: '$',
  configuration: '',
  countryID: 1,
  countryName: 'United States',
  countrycode: 'us',
  currencyCode: 'USD',
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
  case AppActionTypes.add:
    return { ...state, ...action.settings };

  default:
    return state;
  }
}
