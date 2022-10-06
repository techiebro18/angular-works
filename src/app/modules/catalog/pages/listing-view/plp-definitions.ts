import { UserData } from '@schemas/user.interface';

export interface PlpRouteParams {
  parent_category_seo_url: string | null;
  child_category_seo_url: string | null;
  designer_seo_url: string | null;
  discover_seo_url: string | null;
  seller_seo_url: string | null;
  styles_seo_url: string | null;
  search_query: string | null;
}

export interface PlpRouteStaticData {
  plpFor: string;
  plpLanguage: string;
}
export interface PlpCurrencyData {
  plpCurrency: string;
  plpCurrencySymbol: string;
}

export interface PlpRouteInfo {
  routeParams: PlpRouteParams;
  staticData: PlpRouteStaticData;
  currencyInfo: PlpCurrencyData;
  userData: UserData;
}

/**
 * Single filter configuration
 */
export interface FilterConfig {
  name: string;
  label: string;
  attribute: string;
  childLabel?: string;
  childAttribute?: string;
  columnsNum?: number;
  isShowCategories?: boolean;
}

export interface PLPConfiguration {
  language: string;
  currency: string;
  currencySymbol: string;
  parentCategoryValue: string | null;
  childCategoryValue?: string | null;
  autoSelectChildCategory?: boolean;
  searchParameters: any;
  filtersStructure: FilterConfig[];
}
