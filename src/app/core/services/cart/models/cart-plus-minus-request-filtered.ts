export default interface CartPlusMinusRequestFiltered {
  device_id: string;
  cart_id: number;
  product_id: number;
  language: string;
  currency: string;
  position: number;
}
