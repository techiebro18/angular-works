export interface PaymentMethod {
  method: 'credit-cart' | 'paypal' | 'klarna';
  promoCode?: string;
  creditCart?: CreditCart;
}

export interface CreditCart {
  number: string;
  validityMonth: number;
  validityYear: number;
  cvc: number;
  nameOnCard: string;
}
