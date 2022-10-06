export interface CountryMapping {
  id: number;
  country_id: number;
  language_id: number;
  currency_id: number;
  region: string;
  is_default: string;
  status: string;
  deleted: string;
  updated_at: Date;
  created_at: Date;
  country: CountrySummary;
  language: LanguageSummary;
  currency: CurrencySummary;
}

export interface CountrySummary {
  id: number;
  sortname: string;
  name: string;
}

export interface CurrencySummary {
  id: number;
  currency: string;
  code: string;
}

export interface LanguageSummary {
  id: number;
  name: string;
}
