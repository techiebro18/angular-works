import { Url } from 'url';

export interface orderItem {
  base_currency: string;
  billing_address: billingAddress;
  brand_id: number;
  brand_name: string;
  buyer_shipping_status: number;
  commission: string;
  commission_user_id: number;
  commission_user_type: string;
  cost_of_good: number;
  cost_of_good_DKK: number;
  cost_of_good_EUR: number;
  cost_of_good_GBP: number;
  cost_of_good_NOK: number;
  cost_of_good_SEK: number;
  cost_of_good_USD: number;
  country_of_origin: string;
  country_return_amount: number;
  country_return_id: null;
  created_at: Date;
  currency_code: string;
  currency_id: number;
  deliver_address: deliverAddress;
  discount: number;
  discounted_price_DKK: number;
  discounted_price_EUR: number;
  discounted_price_GBP: number;
  discounted_price_NOK: number;
  discounted_price_SEK: number;
  discounted_price_USD: number;
  fixed_discount: number;
  id: number;
  image_url: string;
  imgix_image_url: string;
  is_discount: number;
  is_return: number;
  is_special_tax: string;
  order_id: number;
  order_item_logs: orderLog;
  order_item_shipment_tracking: orderItemShipmentTracking;
  orders: any;
  partial_refund: number;
  payment_information: paymentDetail;
  payout_details: sellerPaymentDetail;
  position: number;
  price: number;
  price_type: string;
  product_id: string;
  product_name: string;
  product_variation_id: any;
  qa_status: string;
  quantity: number;
  refund_amount: number;
  refund_qty: number;
  regular_price: number;
  regular_price_DKK: number;
  regular_price_EUR: number;
  regular_price_GBP: number;
  regular_price_NOK: number;
  regular_price_SEK: number;
  regular_price_USD: number;
  return_apply_date: Date;
  return_item_amount: number;
  return_policy: number;
  return_reason: string;
  seller_information_details: sellerDetail;
  seller_invoice_commission: invoice;
  seller_invoice_complete: invoice;
  seller_invoice_return: invoice;
  shipping_invoice: invoice;
  seller_sku: string;
  seo_url: string;
  shippeing_cost: number;
  sku: string;
  special_tax_percent: number;
  status: string;
  stock: number;
  tarif_number: string;
  shipping_discount: number;
  tax: number;
  total_return_amount: number;
  tvb_invoice_complete: invoice;
  updated_at: Date;
  refund: refund;
  order_item_refund: order_item_refund;
}

export interface order_item_refund {
  id: number;
  amount: number;
  amount_currency: string;
  created_at: Date;
  order_item_id: number;
  request_id: string;
  status: string;
  trans_name: string;
  type: string;
  updated_at: Date;
  note: string;
  user_id: number;
}

export interface refund {
  request_id: string;
  amount_currency: string;
  created_at: Date;
  note: string;
  user_id: number;
  refund: number;
  withdraw_from_seller: string;
  withdraw_from_tvb: string;
}

export interface deliverAddress {
  address_1: string;
  address_2: string;
  address_type: string;
  alternate_no: number;
  buyerDeliverCountryCode: string;
  buyerDeliverCountryName: string;
  city: string;
  company: string;
  country: number;
  email_id: string;
  id: number;
  landmark: string;
  mobile_no: number;
  name: string;
  phone_code: string;
  pin_code: string;
}
export interface billingAddress {
  address_1: string;
  address_2: string;
  address_type: string;
  alternate_no: number;
  buyerBillingCountryCode: string;
  buyerBillingCountryName: string;
  city: string;
  company: string;
  country: number;
  email_id: string;
  id: number;
  landmark: string;
  mobile_no: number;
  name: string;
  phone_code: string;
  pin_code: string;
}

export interface paymentDetail {
  id: number;
  order_id: number;
  txn_id: string;
  user_id: number;
  payment_type: number;
  currency_code: string;
  amount: number;
  status: string;
  payment_response: any;
  created_at: Date;
  updated_at: Date;
}

export interface sellerDetail {
  address: string;
  address_2: string;
  bank_account_number: string;
  bank_country: string;
  city: string;
  company_name: string;
  connected_stripe_id: string;
  country_id: number;
  created_at: Date;
  currency_id: number;
  dob: Date;
  email: string;
  first_name: string;
  gender: number;
  id: number;
  image_id: string;
  language_id: number;
  last_name: string;
  mobile_no: number;
  phone_code: string;
  postal_code: string;
  preferred_currency: number;
  preferred_currency_code: string;
  role_id: number;
  sellerCountryCode: string;
  sellerCountryName: string;
  shipped_from: number;
  shipping_timing: string;
  state: string;
  updated_at: Date;
  username: string;
  vat_number: string;
}

export interface invoice {
  id: number;
  invoice_type: number;
  order_item_id: number;
  pdf_invoice_url: Url;
}

export interface sellerPaymentDetail {
  error_response: any;
  transfer_amount: number;
  payout_currency: string;
  payout_amount: number;
  payment_due_date: Date;
  status: string;
  tvb_commission: number;
}

export interface orderItemShipmentTracking {
  id: number;
  order_item_id: number;
  user_type: number;
  shipment_tracking_number: string;
  tracking_url: string;
  shipment_create_time: string;
  dhl_label: any;
}

export interface orderLog {
  id: number;
  order_id: number;
  previous_status: string;
  status: string;
  notes: string;
}
