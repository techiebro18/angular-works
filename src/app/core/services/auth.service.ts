import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BrazeData, GuestLoginData, LoginData, RegisterData } from '@schemas/apis.interface';
import { AuthResponseV2 } from '@schemas/auth.interface';
import { AuthResponseKeyCloak } from '@schemas/keycloak.auth.interface';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './cart/cart.service';
import { SharedService } from './common/shared.service';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { Apiv2ResponseModel } from '@shared/models/apiv2-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInObs: Observable<boolean> = this.isLoggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private sharedService: SharedService
  ) {}

  public setLoggedIn(loggedIn: boolean): void {
    this.isLoggedIn$.next(loggedIn);
  }

  get loggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  /**
   *  Get Key Cloak Token
   * @param loginData
   * @returns
   */

  public getKeyCloakToken(): Observable<any> {
    const requestOpts = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
      }),
    };
    const payload = new HttpParams()
      .set('client_id', environment.KEY_CLOAK_PAYLOAD.client_id)
      .set('grant_type', environment.KEY_CLOAK_PAYLOAD.grant_type)
      .set('client_secret', environment.KEY_CLOAK_PAYLOAD.client_secret);

    return this.http.post<AuthResponseKeyCloak>(environment.KEY_CLOAK_URL, payload, requestOpts).pipe(
      map((response: AuthResponseKeyCloak) => {
        //this.localStorageService.setItem(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN_KEYCLOAK, response.access_token);
        this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN_KEYCLOAK, response.access_token, {
          path: '/',
          domain: environment.cookieDomain,
        });
      })
    );
  }

  /**
   * call APIv2 Login, and update status on success
   * @param loginData
   * @returns
   */
  public loginV2(loginData: LoginData): Observable<AuthResponseV2> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) loginData.device_id = device_id;

    return this.http.post<AuthResponseV2>(`${environment.API_V2_URL}auth/login`, loginData).pipe(
      map((response: AuthResponseV2) => {
        if (response.access_token && response.user) {
          // set access_token inside the user data, so user will have both apiKey and access_token
          response.user.access_token = response.access_token;
          this.setCart(response.cart);
          this.userService.setUser(response.user);
          this.setLoggedIn(true);
        }

        return response;
      })
    );
  }

  setCart(cart: any) {
    if (cart) {
      this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID, cart.device_id);
      this.cartService.getCartTotal(cart.id).subscribe(response => {
        if (response) {
          this.sharedService.updateCartCount(response.total);
          this.sharedService.updateItemCount(response.total);
          this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, response.total);
        }
      });
    }
  }
  /**
   * calls APIv2 register, and update status on success
   * @param registerData
   * @returns
   */
  public registerV2(registerData: RegisterData): Observable<AuthResponseV2> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) registerData.device_id = device_id;

    return this.http.post<AuthResponseV2>(`${environment.API_V2_URL}auth/register`, registerData).pipe(
      map((response: AuthResponseV2) => {
        if (response.access_token && response.user) {
          // set access_token inside the user data, so user will have both apiKey and access_token
          response.user.access_token = response.access_token;
          // TODO: Register API returns user.api_key as null, it should return the apiKey, similar to login
          // response.user.api_key = response.access_token;
          this.userService.setUser(response.user);
          this.setLoggedIn(true);
        }

        return response;
      })
    );
  }

  /**
   * calls APIv2 register, and update status on success
   * @param registerData
   * @returns
   */
  public guestLoginV2(registerData: GuestLoginData): Observable<AuthResponseV2> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) registerData.device_id = device_id;

    return this.http.post<AuthResponseV2>(`${environment.API_V2_URL}auth/register`, registerData).pipe(
      map((response: AuthResponseV2) => {
        if (response.access_token && response.user) {
          // set access_token inside the user data, so user will have both apiKey and access_token
          response.user.access_token = response.access_token;
          // TODO: Register API returns user.api_key as null, it should return the apiKey, similar to login
          // response.user.api_key = response.access_token;
          this.userService.setUser(response.user);
          this.setLoggedIn(true);
        }

        return response;
      })
    );
  }

  /**
   * Checks if there is a registered user with given email
   * response 200 OK : when there is a user
   * response 404 Error: when there is no user
   * @param email
   * @returns response
   */
  public isUserExists(email: string): Observable<any> {
    const body: HttpParams = new HttpParams().set('email', email);

    return this.http.post(`${environment.API_V2_URL}auth/isUserExists`, body);
  }

  /**
   * Checks if the user is a guest user
   * response 200 OK : when there is a guest user
   * response 404 Error: when there is no guest user
   * @param email
   * @returns guest_user
   */
  public isGuestUser(email: string): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}auth/is-guest-user/${email}`);
  }

  /**
   * clear status and user data after logging-out
   */
  public afterLogout(): void {
    this.userService.setUser(null);
    this.setLoggedIn(false);
    this.cookieDeleteAfterLogout();
    this.cleanLocalStorage();
  }

  // TODO: get read of any usage in the following methods
  // let us make sure what we get and what we send
  public login(userData: any): Observable<any> {
    return this.http.post(`${environment.MOBILE_API_URL}/auth`, userData);
  }

  public register(userData: any): Observable<any> {
    return this.http.post(`${environment.MOBILE_API_URL}/user_registration`, userData);
  }

  public authenticateFacebook(userData: any): Observable<any> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) userData.device_id = device_id;

    return this.http.post(`${environment.API_V2_URL}auth/sso-fb-login`, userData);
  }

  public authenticateGmail(userData: any): Observable<any> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) userData.device_id = device_id;

    return this.http.post(`${environment.API_V2_URL}auth/sso-gmail-login`, userData);
  }

  public logoutAPIV2() {
    return this.http.post(`${environment.API_V2_URL}auth/logout`, {});
  }

  public authenticateFrontFb(userData: any): Observable<any> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) userData.device_id = device_id;

    return this.http.post(`${environment.API_V2_URL}auth/sso-fb-login`, userData);
  }

  public authenticateFrontGmail(userData: any): Observable<any> {
    const device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (device_id) userData.device_id = device_id;

    return this.http.post(`${environment.API_V2_URL}auth/sso-gmail-login`, userData);
  }
  public me(access_token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + access_token }),
    };

    return this.http.get(`${environment.API_V2_URL}auth/me`, options);
    //
  }
  public refresh(access_token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + access_token }),
    };

    return this.http.post(`${environment.API_V2_URL}auth/refresh`, options);
    //
  }

  public forgotPassword(email: string): Observable<any> {
    const body: HttpParams = new HttpParams().set('email', email);

    return this.http.post(`${environment.API_V2_URL}auth/forgot-password`, body);
  }

  public isUserNameTaken(userData: object) {
    return this.http.post(`${environment.API_V2_URL}account/isUserNameTaken`, userData);
  }

  public isUserNameAvailable(username: string): Observable<Apiv2ResponseModel<boolean>> {
    return this.http.get<Apiv2ResponseModel<boolean>>(
      `${environment.API_V2_URL}account/is-username-available/${username}`
    );
  }

  public isUsernameExists(username: string) {
    return this.http.get(`${environment.API_V2_URL}auth/username-exists/${username}`);
  }

  public addBrazeGroups(user_id: number) {
    const request = {
      user_id: user_id,
    } as BrazeData;

    this.http.post(`${environment.API_V2_URL}auth/register-in-braze`, request).subscribe();
  }

  private cookieDeleteAfterLogout() {
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_DATA, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.API_KEY, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_ID, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CLIENT_WEBSITE_TOKEN, '/', environment.cookieDomain);

    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CLIENT_WEBSITE_TOKEN);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.API_KEY);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_ID);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CLIENT_WEBSITE_TOKEN);
    this.cookieService.delete('ajs_user_id');
    this.cookieService.delete('items', '/', environment.cookieDomain);
  }

  private cleanLocalStorage() {
    this.localStorageService.clear();
  }
}
