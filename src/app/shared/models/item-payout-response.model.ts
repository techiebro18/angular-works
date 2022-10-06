export interface ItemPayoutResponseModel {
  orderItem: OrderItem;
  itemTravelLine: ItemTravelStep[];
}

export interface ItemTravelStep {
  status: string;
  val: number;
  tracking_created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: string;
  status: string;
  qa_status: string;
  buyer_shipping_status: number;
  product_variation_id?: any;
  discount: number;
  tax: number;
  cost_of_good: number;
  price: number;
  is_discount: number;
  regular_price: string;
  price_type: string;
  is_special_tax: string;
  special_tax_percent: number;
  quantity: number;
  partial_refund: string;
  refund_qty: number;
  refund_amount: number;
  is_return: number;
  total_return_amount?: any;
  return_item_amount?: any;
  country_return_id?: any;
  country_return_amount?: any;
  return_reason?: any;
  return_policy: number;
  return_apply_date?: any;
  shippeing_cost: number;
  product_name: string;
  seller_sku: string;
  sku: string;
  stock: number;
  fixed_discount?: any;
  seo_url: string;
  country_of_origin: string;
  tarif_number: string;
  brand_name: string;
  brand_id: number;
  imgix_image_url: string;
  image_url?: any;
  commission_user_type: string;
  commission_user_id: number;
  commission: string;
  currency_code: string;
  currency_id: number;
  discounted_price_NOK: string;
  discounted_price_PLN: string;
  discounted_price_GBP: string;
  discounted_price_EUR: string;
  discounted_price_SEK: string;
  discounted_price_DKK: string;
  discounted_price_USD: string;
  regular_price_NOK: string;
  regular_price_GBP: string;
  regular_price_EUR: string;
  regular_price_SEK: string;
  regular_price_DKK: string;
  regular_price_USD: string;
  cost_of_good_NOK: string;
  cost_of_good_PLN: string;
  cost_of_good_GBP: string;
  cost_of_good_EUR: string;
  cost_of_good_SEK: string;
  cost_of_good_DKK: string;
  cost_of_good_USD: string;
  base_currency: string;
  position: number;
  offer_id?: any;
  updated_at: string;
  created_at: string;
  third_party?: any;
  third_party_id?: any;
  regular_price_PLN: string;
  shipping_discount: number;
  tariff_code_id: number;
  orderItemShipmentTracking: OrderItemShipmentTracking;
  commissionInvoicelink?: any;
  orders: Order;
  payout_details?: PayoutDetails;
  seller_information_details: SellerInfo;
  order_item_logs: OrderItemLog[];
  order_item_shipment_tracking: OrderItemShipmentTracking[];
}

export interface OrderItemLog {
  id: number;
  order_id: number;
  order_item_id: number;
  previous_status: string;
  status: string;
  qa_status: string;
  stock: string;
  notes: string;
  updated_at: string;
  created_at: string;
}

export interface SellerInfo {
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
  member_description: string;
  preferred_currency_code?: any;
  sellerCountryCode: string;
  sellerCountryName: string;
}

export interface Order {
  id: number;
  user_id: number;
  delivery_id: number;
  billing_address_id: number;
  coupon_id: number;
  currency_id: number;
  language_id: number;
  special_tax: number;
  country_order_tax: number;
  tax: number;
  tax_percent: number;
  shipping_charge: number;
  coupon_discount: number;
  coupon_amount: number;
  total_paid_amount: number;
  payment_amount: string;
  wallet_amount: string;
  is_apply_wallet: string;
  shipping_method?: any;
  shipping_id?: any;
  packing_type: string;
  payment_method?: any;
  txn_id?: any;
  payment_data?: any;
  hash_key?: any;
  status: string;
  is_return: string;
  is_return_apply: string;
  return_pickup: string;
  is_refund: number;
  refund_amount: number;
  delivery_status?: any;
  delivered_to_drop_point_time?: any;
  delivery_time?: any;
  new_order: number;
  return_amount: number;
  country_return_id: number;
  country_return_amount: number;
  payment_refund_amount: string;
  wallet_refund_amount: string;
  non_taxable_amount: string;
  notes_order: string;
  updated_at: string;
  created_at: string;
  third_party?: any;
  third_party_id?: any;
}

export interface OrderItemShipmentTracking {
  order_item_id: number;
  user_type: string;
  shipment_tracking_number: string;
  dhl_label: string;
}

export interface PayoutDetails {
  payment_due_date: string;
  status: string;
}
