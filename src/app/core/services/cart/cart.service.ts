import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { Currency, Language } from '@schemas/app.interface';
import { LocalStorageService } from '@services/local-storage.service';
import GetShoppingCartRequest from './models/get-shopping-cart-request';
import GetShoppingCartForUserRequest from './models/get-shopping-cart-for-user-request';
import CartPlusMinusRequest from './models/cart-plus-minus-request';
import GetShoppingCartRequestFiltered from './models/get-shopping-cart-request-filtered';
import CartPlusMinusRequestFiltered from './models/cart-plus-minus-request-filtered';
import CartClearRequest from './models/cart-clear-request';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  public getDeviceId(): Observable<any> {
    const options = {};

    return this.http.get(`${environment.API_V2_URL}cartv2/getDeviceId`, options).pipe(
      map((response: any) => {
        return response.device_id;
      })
    );
  }

  public getCartTotal(cart_id: number): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}cartv2/total/${cart_id}`);
  }

  public getCart(getCartRequest: GetShoppingCartRequestFiltered, access_token: string): Observable<any> {
    const params = new HttpParams();

    params.set('device_id', getCartRequest.device_id);
    params.set('language', getCartRequest.language);
    params.set('currency', getCartRequest.currency);

    const options = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + access_token }),
      params: params,
    };

    return this.http.post(`${environment.API_V2_URL}cartv2/getCart`, getCartRequest, options);
  }

  public cartPlus(cartPlusMinusRequest: CartPlusMinusRequestFiltered, access_token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + access_token }),
    };

    return this.http.post(`${environment.API_V2_URL}cartv2/cartPlus`, cartPlusMinusRequest, options);
  }

  public cartMinus(cartPlusMinusRequest: CartPlusMinusRequestFiltered, access_token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + access_token }),
    };

    return this.http.post(`${environment.API_V2_URL}cartv2/cartMinus`, cartPlusMinusRequest, options);
  }

  public clearCart(cartClearRequest: CartClearRequest): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}cartv2/clearCart`, cartClearRequest);
  }
}
