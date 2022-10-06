export interface SellerSoldItemsResponseModel {
  orderlist: SoldItem[];
  totalrow: number;
}

export interface SoldItem {
  order_item_id: number;
  order_id: number;
  preferred_currency?: any;
  image: string;
  product_name: string;
  brand_name: string;
  seo_url: string;
  sku: string;
  cost_of_good_USD: number;
  cost_of_good_DKK: number;
  cost_of_good_SEK: number;
  cost_of_good_EUR: number;
  cost_of_good_GBP: number;
  regular_price_USD: number;
  regular_price_DKK: number;
  regular_price_SEK: number;
  regular_price_EUR: number;
  regular_price_GBP: number;
  discounted_price_USD: number;
  discounted_price_DKK: number;
  discounted_price_SEK: number;
  discounted_price_EUR: number;
  discounted_price_GBP: number;
  is_discount: number;
  order_item_date: string;
  base_currency: string;
  cost_of_good: number;
  order_item_status: string;
}
