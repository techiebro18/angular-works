export interface AuthResponseKeyCloak {
  'access_token': string;
  'expires_in': number;
  'not-before-policy': number;
  'refresh_expires_in': number;
  'scope': string;
  'token_type': string;
}

export interface AuthRequestKeyCloak {
  client_id: string;
  grant_type: string;
  client_secret: string;
}
