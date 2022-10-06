import { LocalStorageService } from './local-storage.service';
import { UniversalService } from './universal.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { UserData } from '@schemas/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { OrderInformation } from './order-detail';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  private user$: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private universalService: UniversalService
  ) {}

  public getOrderItemDetail(id: number, appConfig): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/getOrderDetail/` + id, appConfig);
  }
  public getOrderDetail(id: number): Observable<OrderInformation> {
    return this.http.get<OrderInformation>(`${environment.API_V2_URL}order/getOrderDetailForUser/` + id);
  }
  public getCurrecnyFormat(currecnyCode, currencySymbol): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/getCurrecnyFormat/` + currecnyCode + '/' + currencySymbol);
  }
  public getRefundAmout(data): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}orderItem/getRefundAmout`, data);
  }
  public saveReturn(data): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}orderItem/saveReturn`, data);
  }
  public order_cancel(data): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}orderItem/cancelUserOrderItem`, data);
  }
  public private_seller_item_resell(data): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/private-seller-item-resell`, data);
  }
  public item_resell(data): Observable<any> {
    return this.http.post(`${environment.USER_API_URL}/item-resell`, data);
  }
}
