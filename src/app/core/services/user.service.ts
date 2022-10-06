import { APIv2SellerWrapper } from '@schemas/seller.interface';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SegmentService } from './segment.service';
import { UniversalService } from './universal.service';
import { environment } from '@environments/environment';

import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { DeliveryAddress, UserData } from '@schemas/user.interface';
import { LoggedUserInfoResponse, UserInfoResponse } from '@schemas/auth.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private segmentService: SegmentService,
    private universalService: UniversalService,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * gets UserData for given user_id
   * @param user_id
   * @returns UserInfoResponse
   */
  public getUserV2(user_id: number): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${environment.API_V2_URL}auth/getUserById`, {
      user_id,
    });
  }
  public restoreSession(userId: number): Observable<LoggedUserInfoResponse> {
    return this.http.get<LoggedUserInfoResponse>(`${environment.MOBILE_API_URL}/loggeduserInfo/${userId}`);
  }

  /**
   * Stores user data in localStorage if in broswe, and emit to user subject always
   * @param userData
   */
  public setUser(userData: UserData | null): void {
    if (this.universalService.isBrowser) {
      if (userData != null) {
        // TODO: check if cokieService works on server side, then remove it from isBrowser check
        this.storeKeys(userData);
        this.segmentService.identify(userData);

        // Make sure apiKey and access_token are always stored
        this.getMissingToken(userData);
      }
      else {
        // user = null on logout
        this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN);
        this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_DATA);
        this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.API_KEY);
        this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_ID);
        this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CONFIG_ID);
        this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CLIENT_WEBSITE_TOKEN);
        this.localStorageService.clear();
        /* We use cookies for launch the functionality of consent segment manager so it should not be deleted  */
      }
    }

    this.user$.next(userData);
  }

  /**
   * This is a work-around solution to ensure there is always both access_token and api_key available for logged in users
   * @param userData
   */
  public getMissingToken(userData: UserData) {
    // if both tokens available ,, nth to do
    if (
      userData.api_key != null &&
      userData.api_key.length > 0 &&
      userData.access_token != null &&
      userData.access_token.length > 0
    )
      return;

    // if both tokens are missing,, nth to do
    if (
      (userData.api_key == null || userData.api_key.length == 0) &&
      (userData.access_token == null || userData.access_token.length == 0)
    )
      return;

    // if we have apiKey ,, get access token
    if (userData.api_key != null && userData.api_key.length > 0) {
      this.http.post<any>(`${environment.ADMIN_API_URL}/getAccessToken`, {}).subscribe(data => {
        if (data?.access_token) {
          userData.access_token = data.access_token;
          this.setUser(userData);
        }
      });
    }
    else {
      // we have access token, get apiKey
      this.http.post<any>(`${environment.API_V2_URL}auth/getAccessToken`, {}).subscribe(data => {
        if (data?.api_key && data?.api_key !== '') {
          userData.api_key = data.api_key;
          this.setUser(userData);
        }
      });
    }
  }

  public getUserData(): BehaviorSubject<UserData | null> {
    return this.user$;
  }

  public updateGetPaid_V2(id: number, userData: UpdateGetPaidRequest): Observable<any> {
    return this.http.put(`${environment.API_V2_URL}account/get-paid`, userData);
  }

  public updateSellerOnboardingData(userData: any): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}user/update-user-account`, userData);
  }

  public getCurrentUserVerificationInformation(): Observable<any> {
    return this.http.get(`${environment.PRIVATE_SELLER_ONBOARDING_API_URL}/get-onboarding-user-data`);
  }

  public verifyPrivateSeller(userData: any): Observable<any> {
    return this.http.post(`${environment.PRIVATE_SELLER_ONBOARDING_API_URL}/verify-user`, userData);
  }

  public updateUserDetails(id: number, userData: any): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/user/updatePrivateUserinfo`, userData);
  }

  public getAddressList(): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/address_list`);
  }

  public removeAddress(id: number): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/remove_delivery_address_by_id/` + id);
  }

  public setDefaultAddress(id: number): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/add_default_delivery_address/` + id);
  }

  public getDeliveryAddress(id: number): Observable<DeliveryAddress[]> {
    return this.http.get<DeliveryAddress[]>(`${environment.USER_API_URL}/getDeliveryAddressByid/` + id);
  }

  public updateAddress(id: number, addressData): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/updateAddressById/` + id, addressData);
  }

  public getallCountryPhoneCode(): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/getallCountryPhoneCode`);
  }

  public verifyAddress(addressData): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}delivery-address/verify`, addressData);
  }

  public addDeliveryAddress(addressData): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/addDeliveryAddressPrivateSeller`, addressData);
  }

  public addBillingAddress(userId, addressData): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/add_billing_address/` + userId, addressData);
  }

  public newsletterSubscribe(newsletterData): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}auth/sendgridAddContactNewsletter`, newsletterData);
  }

  public softRegister(data): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}auth/soft_register`, data);
  }

  public forgotPassword(userdata): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}password-recovery/getRecoveryCode`, userdata);
  }
  public changePassword(userdata): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}password-recovery/changePassword`, userdata);
  }

  public updateUserInfo(id: number, userData: any): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/updateuserinfo/${id}`, userData);
  }

  public getUserDeliveryAddress(userId: number): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/get_delivery_address_by_user_id/` + userId);
  }

  public getAccessToken(userData: UserData): Observable<any> {
    this.storeKeys(userData);

    return this.http.post(`${environment.ADMIN_API_URL}/getAccessToken`, {});
  }

  public getAccessTokenV2(userData: UserData): Observable<any> {
    this.storeKeys(userData);

    return this.http.post(`${environment.API_V2_URL}auth/getAccessToken`, {});
  }

  public getSeller(user_id: number): Observable<APIv2SellerWrapper> {
    return this.http.get<APIv2SellerWrapper>(`${environment.API_V2_URL}user/${user_id}`);
  }

  private storeKeys(userData: UserData): void {
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.USER_DATA, JSON.stringify(userData), {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.USER_ID, userData.id + '', {
      path: '/',
      domain: environment.cookieDomain,
    });

    localStorage.setItem(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN, userData.access_token);
    localStorage.setItem(APP_CONSTANTS.COOKIE_KEYS.API_KEY, userData.api_key);
  }

  public async refreshUser(userId: number) {
    const freshUser = (await firstValueFrom(this.getUserV2(userId))).user.user[0];

    this.setUser(freshUser);
  }
}

export interface UpdateGetPaidRequest {
  id?: number;
  role_id?: number;
  connected_stripe_id?: string;
  username?: string;
  email?: string;
  slpassword?: null;
  phone_code?: string;
  mobile_no?: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: string;
  address?: string;
  address_2?: string;
  country_id?: number;
  city_id?: null;
  state_id?: null;
  news_letter?: string;
  image_id?: string;
  language_id?: number;
  currency_id?: number;
  status?: string;
  loyality_programme?: string;
  api_key?: string;
  access_token?: string;
  social_auth_id?: null;
  preferred_currency?: number;
  vat_number?: string;
  company_name?: string;
  postal_code?: string;
  login_type?: string;
  shipping_timing?: string;
  pin_code?: null;
  city?: string;
  state?: string;
  company?: null;
  catalog_type?: string;
  catalog_url?: string;
  shipped_from?: number;
  bank_country?: number;
  bank_account_number?: string;
  soft_registered?: number;
  enable_sell?: string;
  updated_at?: Date;
  created_at?: Date;
  cover_image?: string;
  member_description?: string;
  product_count?: number;
  fname?: string;
  lname?: string;
  date_of_birth?: Date;
}
