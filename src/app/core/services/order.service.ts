import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _http: HttpClient) {}

  getOrder(orderId: number): Observable<any> {
    return this._http.get(environment.USER_API_URL + '/order_detail/' + orderId);
  }
  getOrdersList(userId: number): Observable<any> {
    return this._http.get(environment.USER_API_URL + '/orderlist/' + userId);
  }
}
