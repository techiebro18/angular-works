import { Offer } from '@schemas/account/offer.interface';
import Card from './card';

export default class Order {
  order_id?: number;
  coupon_code?: string;
  coupon_type: number;
  shipping_address_id: number;
  billing_address_id: number;
  device_id: string;
  provider: string;
  product_ids: string;
  order_detail: OrderDetail;
  order_cart: OrderCart[];
  products: OrderProduct[];
  card?: Card;
}

export interface OrderCart {
  product_id: string;
  catalog_product_id: string;
  quantity: number;
  price: number;
  cart_id: number;
  is_discount: number;
  is_special_tax: string;
  total_item_price: number;
  cost_of_good: number;
  regular_price: number;
  order_item_id: number;
}

export interface OrderDetail {
  id: number;
  user_id: number;
  delivery_id: number;
  billing_address_id: number;
  coupon_id: number;
  coupon_amount: number;
  currency_id: number;
  language_id: number;
  country_order_tax: number;
  tax: number;
  tax_percent: number;
  special_tax: number;
  shipping_charge: number;
  coupon_discount: number;
  total_paid_amount: number;
  packing_type: string;
  status: string;
  new_order: string;
  updated_at: string;
  created_at: string;
}

export interface OrderProduct {
  product_id: string;
  offers: Offer[];
}

export interface OrderUser {
  id: number;
  role_id: number;
  connected_stripe_id: string;
  username: string;
  email: string;
  slpassword?: any;
  phone_code: string;
  mobile_no: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  address: string;
  address_2: string;
  country_id: number;
  city_id?: any;
  state_id?: any;
  news_letter: string;
  image_id: string;
  language_id: number;
  currency_id: number;
  status: string;
  loyality_programme: string;
  api_key: string;
  access_token: string;
  social_auth_id?: any;
  remember_token?: any;
  preferred_currency: number;
  vat_number: string;
  company_name: string;
  postal_code: string;
  login_type: string;
  shipping_timing: string;
  pin_code?: any;
  city: string;
  state: string;
  company?: any;
  catalog_type: string;
  catalog_url: string;
  shipped_from: number;
  bank_country: number;
  bank_account_number: string;
  soft_registered: number;
  enable_sell: string;
  updated_at: string;
  created_at: string;
  cover_image: string;
  member_description?: any;
  image_url?: any;
  extension?: any;
  languageName: string;
  currencyName: string;
  countryName: string;
  preferredCurrencyName?: any;
}
