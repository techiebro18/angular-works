import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { LocalStorageService } from '@services/local-storage.service';
import PaypalRequest from './models/paypal-request';
import Order from './models/order';
import Payment from './models/payment';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  private _orderId = new BehaviorSubject(null);
  orderId = this._orderId.asObservable();

  private _payment = new BehaviorSubject(null);
  payment = this._payment.asObservable();

  private _card = new BehaviorSubject(null);
  card = this._card.asObservable();

  private _klarnaIssue = new BehaviorSubject(null);
  klarnaIssue = this._klarnaIssue.asObservable();

  public setOrderId(orderId: number) {
    this._orderId.next(orderId);
  }

  public getOrderId(): number {
    return this._orderId.value;
  }

  public setPaymentMethod(payment: Order) {
    this._payment.next(payment);
  }

  public getPaymentMethod(): Order {
    return this._payment.value;
  }

  public setCardMethod(card: any) {
    this._card.next(card);
  }

  public getCardMethod(): any {
    return this._card.value;
  }

  public setKlarnaIssue(response: boolean) {
    this._klarnaIssue.next(response);
  }

  public getKlarnaIssue(): boolean {
    return this._klarnaIssue.value;
  }

  public addPayment(request: PaypalRequest): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}checkout/add-payment-paypal`, request);
  }

  public getOrder(orderId: number): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}order/${orderId}`);
  }

  public createOrder(order: Order, language: string, currencyCode: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ language_code: language, currency_code: currencyCode }),
    };

    return this.http.post(`${environment.API_V2_URL}checkout/createUpdateOrder`, order, options);
  }

  public createPayment(order: Order): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}payment/create`, order);
  }

  public confirmPayment(payment: Payment): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}payment/confirm`, payment);
  }

  public applyCoupon(coupon: Order): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}coupons/apply`, coupon);
  }

  public cancelCoupon(coupon: Order): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}coupons/cancel`, coupon);
  }

  public destroy(): void {
    this.setCardMethod(null);
    this.setPaymentMethod(null);
    this.setOrderId(null);
  }

  public paymentConfiguration(currency_id: number): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}payment/config/${currency_id}`);
  }

  public paymentAvailability(paymentMethod: string, selectedAddress: number): Observable<any> {
    return this.http.get(
      `${environment.API_V2_URL}payment/available/${paymentMethod}/${selectedAddress}`
    );
  }

  public checkPayment(orderId: number): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}payment/canUpsert/${orderId}`);
  }
}
