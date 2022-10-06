export default interface ShoppingCartModel {
  user_id: number;
  device_id: string;
  item_count: number;
  amount_total: number; //sum of item-sale-price			A
  amount_discount: number; //sum of discount(s) applicable		B
  amount_tax: number; //tax payable(if any)			    C
  amount_shipping: number; //shipping charge(if any)			D
  amount_payable: number; //(A + C + D) - B
  currency_id: number;
  language_id: number;
  billing_address_id: number;
  shipping_address_id: number;
  status: string; //pending,ordered,canceled
  coupon_id: string;
}
