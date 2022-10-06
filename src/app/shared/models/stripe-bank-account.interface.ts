export interface StripeBankAccount {
  id: string;
  object: string;
  account: string;
  account_holder_name: string;
  account_holder_type: string;
  account_type?: any;
  available_payout_methods: string[];
  bank_name: string;
  country: string;
  currency: string;
  default_for_currency: boolean;
  fingerprint: string;
  last4: string;
  metadata: any;
  routing_number: string;
  status: string;
}
