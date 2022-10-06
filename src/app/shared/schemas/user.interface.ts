export interface DeliveryAddress {
  id: number;
  address_1: string;
  address_2: string;
  address_type: string;
  addresses: string;
  alternate_no: string;
  billing_address: string;
  city: string;
  company: string;
  country: string;
  country_id: number;
  country_name: string;
  default_address: string;
  email_id: string;
  error_message: string;
  first_name: string;
  is_default: boolean;
  landmark: string;
  last_name: string;
  message: string;
  mobile_no: string;
  phone_code: string;
  pin_code: string;
  salutation: string;
  state: string;
  status: string;
  user_id: number;
  user_name: string;
  fname: string;
  lname: string;
}

export interface UserNotification {
  user_notification: any;
  user: UserData[];
}

// Response of login MobileAPI
export interface UserData {
  errors?: any;
  status: string; // success | fail
  api_key: string;
  email?: string;
  id: number;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  role_id?: number;
  error_message?: string;
  // response from authenticateGmail
  access_token?: string;
  connected_stripe_id?: any;
  // additional fields from response of loggeduserInfo
  slpassword?: string;
  phone_code?: string;
  mobile_no?: string;
  currencyName?: string;
  countryName?: string;
  languageName?: string;
  language_id?: number;
  currency_id?: number;
  dob?: Date;
  gender?: number;
  country_id?: number;
  city_id?: string;
  state_id?: string;
  address?: string;
  image_id?: string;
  message?: string;
  image_url?: any;
  extension?: any;
  error?: {
    error_message?: string;
  };
  address_2?: string;
  news_letter?: string;
  loyality_programme?: string;
  remember_token?: string;
  preferred_currency?: number;
  vat_number?: string;
  company_name?: string;
  postal_code?: string;
  login_type?: string;
  shipping_timing?: any;
  pin_code?: string;
  city?: string;
  state?: string;
  company?: string;
  catalog_url?: string;
  updated_at?: string;
  created_at?: string;
  enable_sell?: string;
  terms?: UserTerm[];
}

export interface UserTerm {
  id: number;
  accepted: 0 | 1;
}

export interface UserDataDetail {
  tos: any;
  bank_account_number: any;
  bank_country: any;
  shipped_from: any;
  status: string; // success | fail
  api_key: string;
  email?: string;
  id: number;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  role_id?: number;
  error_message?: string;
  // response from authenticateGmail
  access_token?: string;
  connected_stripe_id?: any;
  // additional fields from response of loggeduserInfo
  slpassword?: string;
  phone_code?: string;
  mobile_no?: string;
  currencyName?: string;
  countryName?: string;
  languageName?: string;
  language_id?: number;
  currency_id?: number;
  dob?: Date;
  gender?: number;
  country_id?: number;
  city_id?: string;
  state_id?: string;
  address?: string;
  image_id?: string;
  message?: string;
  image_url?: any;
  extension?: any;
  error?: {
    error_message?: string;
  };
  address_2?: string;
  news_letter?: string;
  loyality_programme?: string;
  remember_token?: string;
  preferred_currency?: number;
  vat_number?: string;
  company_name?: string;
  postal_code?: string;
  login_type?: string;
  shipping_timing?: any;
  pin_code?: string;
  city?: string;
  state?: string;
  company?: string;
  catalog_url?: string;
  updated_at?: string;
  created_at?: string;
}

// response for API v2
export interface UserInfo {
  user: {
    id: number;
    role_id: number;
    connected_stripe_id: string;
    username: string;
    email: string;
    slpassword: string;
    phone_code: string;
    mobile_no: string;
    first_name: string;
    last_name: string;
    dob: string;
    gender: number;
    address: string;
    address_2: string;
    country_id: number;
    city_id?: number;
    state_id?: string;
    news_letter: number;
    image_id?: null;
    language_id?: number;
    currency_id?: number;
    status: string;
    loyality_programme: 0;
    api_key: string;
    access_token: string;
    social_auth_id?: number;
    preferred_currency: 0;
    vat_number?: number;
    company_name: string;
    postal_code: string;
    login_type: number;
    shipping_timing: string;
    pin_code: string;
    city: string;
    state: string;
    company: string;
    catalog_type: string;
    catalog_url: string;
    shipped_from: string;
    bank_country: string;
    bank_account_number: string;
    enable_sell: number;
    soft_registered: number;
    updated_at: Date;
    created_at: Date;
    country: string;
    get_commission_logic: string;
  };
}
