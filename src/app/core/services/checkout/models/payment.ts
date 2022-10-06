export default class Payment {
  order_id?: number;
  provider: string;
  payment_intent_client_secret?: string;
  authorization_token?: string;
  payment_id: string;
  response: any;
}
