// app configuration for language country currency as in local storage
export interface AppConfiguration {
  currencyID: number;
  currencyCode: string;
  currencySymbol: string;

  languageID: number;
  languageName: string;
  languageShortName: string;

  countryID: number;
  countryName: string;
  countrycode: string;

  openToOffers?: boolean;

  configuration?: number;
}

export interface AppResponse {
  id: number;
  currency_id: number;
  tax_percent: number;
  taxPercent: number;
  currency: string;
  symbol: string;
  language_id: number;
  languagesName: string;
  languageShortName: string;
  country_id: number;
  name: string;
  code: string;
  status: string;
  sortname: string;
  config: any;
}

export interface Country {
  id?: number;
  name?: string;
  sortname: string;
  phonecode: number;
}

export interface State {
  id?: number;
  name?: string;
  country_id?: number;
}

export interface City {
  id?: number;
  name?: string;
  state_id?: number;
}

export interface Language {
  id?: number;
  code?: string;
  name?: string;
  status?: string;
  deleted?: string;
  modified_on?: string;
  created_on: string;
  is_default?: any;
}

export interface Currency {
  id?: number;
  country?: string;
  currency?: string;
  code?: string;
  symbol?: string;
  status?: string;
  deleted?: string;
  updated_at?: Date;
  created_at?: Date;
  cprice?: any;
  gprice?: any;
  is_complete?: any;
  is_default?: any;
}

export interface Menu {
  id: number;
  type: string;
  name: string;
  url?: string;
  Child?: Menu[];
  image_url: any;
  extension: any;
  child: any;
  seo_url: string;
  language_id: number;
}

export interface AppSetting {
  id: number;
  key?: string;
  value?: string;
  comment?: any;
  status?: string;
  deleted?: string;
}
