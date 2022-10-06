/**
 * This interface can be used for Shipping Address and Billing Address
 */
export interface Address {
  firstName: string;
  lastName: string;
  addressName: string;
  companyName?: string;
  mobileNumber?: string;
  zipCode: number;
  city: string;
  country: string;
  state: string;
}

export interface AddressInfo {
  fname: string;
  lname: string;
  address_1: string;
  address_2: string;
  city: string;
  country: number;
  state: string;
  pin_code: string;
  is_default: boolean;
  phonecode: string;
  mobile_no: string;
  email_id: string;
  company: string;
}
