export interface SearchRequest {
  pageSize: number;
  page: number;
  filters: Filters[];
  sorting: Sorting[];
  currency?: string | 'USD' | 'EUR' | 'GBP' | 'DKK' | 'SEK' | 'NOK' | 'PLN' | 'JPY';
  language?: string | 'en' | 'da' | 'dk' | 'de' | 'it' | 'es' | 'sv' | 'fr';
}

export interface Filters {
  field: string;
  value: string;
  operator: string;
}

export interface Sorting {
  field: string;
  order: string;
}
