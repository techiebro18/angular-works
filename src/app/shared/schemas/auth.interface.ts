import { UserData, UserNotification } from './user.interface';

export interface AuthResponseV2 {
  cart: any;
  access_token: string;
  token_type: string;
  expires_in: number;
  user: UserData;
}
export interface AuthResponse {
  error_message: string;
  email: string;
  password: string;
  api_key: string;
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  status: string;
  role_id: number;
  error: {
    error_message: string;
  };
}
export interface Registration {
  status: string;
  error_message: any;
  email: string;
  error: {
    error_message: string;
  };
  userid: any;
  api_key: string;
}
export interface ResetPassword {
  status: string;
  error_message: any;
  newpassword: 'string';
  confirmpassword: 'string';
  userid: 'number';
  error: {
    error_message: 'string';
  };
}
export interface ForgotPassword {
  error_message: string;
  email: 'string';
  error: {
    error_message: 'string';
  };
}
export interface ChangePassword {
  status: string;
  password: 'string';
  userId: 'number';
  apiKey: 'string';
  error: {
    error_message: 'string';
  };
}
export interface ResetPasswordVerifykey {
  token_id: any;
  error_message: any;
  status: string;
  keyDetails: 'string';
  error: {
    error_message: 'string';
  };
}

export interface LoggedUserInfoResponse {
  code: number; // 1 | 0
  status: string; // "success" | "error"
  data?: UserData;
  message?: string; // "Invalid user id"
}

export interface ShippingDropPointdata {
  selectedShippingCompanyDetails: any;
  deliveryAddId: number;
  error_message: string;
  status: string;
}

export interface UserInfoResponse {
  user?: UserNotification;
  message?: string;
}
