export interface ApiConfiguration {
  Configuration?: number;
  code: string;
  country_id: number;
  created_at: string;
  currency: string;
  currency_id: number;
  deleted: string;
  id: number;
  is_default: string;
  languageShortName: string;
  language_id: number;
  languagesName: string;
  name: string;
  openToOffers: boolean;
  sortname: string;
  status: string;
  symbol: string;
  tax_percent: number;
  updated_at: string;
}

export interface ConfiglLog {
  config: {
    id: number;
    api_key: string;
    created_at: Date;
    ipaddress: string;
    login_status: string;
    open_to_offers: boolean;
    returnurl: string;
    updated_at: Date;
    view_card_data: string;
    config_data: {
      CountryMapping: any;
      Currency: any;
      Language: any;
      Country: any;
    };
  };
  error_message: string;
  status: string;
}

export interface ApiConfigResponse {
  config: ApiConfiguration;
  error_message: string;
  status: string;
}
export interface SenderAdd {
  address_1: string;
  zip: string;
  city: string;
  country_code: string;
}

export interface DeliveryAdd {
  address_1: string;
  zip: string;
  city: string;
  country_code: string;
}

export interface Attributes {
  carrier_id: number;
  send_date: string;
  sender_address: SenderAdd;
  delivery_address: DeliveryAdd;
}

export interface Data {
  type: string;
  attributes: Attributes;
}

export interface ShippingData {
  shipping_data: Data;
}

export interface LoginData {
  email: string;
  password: string;
  device_id?: string;
}
export interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  news_letter: string;
  device_id?: string;
  validation_code?: string;
}

export interface BrazeData {
  user_id: number;
}

export interface GuestLoginData {
  email: string;
  device_id?: string;
  reg_type: string;
}

export interface NewsletterData {
  email: string;
}
