/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { transaction } from '../../modules/default/account/account-settings/my-financials/transactions/transaction-detail/transaction';
@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  constructor(private _http: HttpClient) {}
  transactionList(userId: number, formData: FormData): Observable<unknown> {
    return this._http.post(
      environment.API_V2_URL + 'financials/transactionList/' + userId,
      formData
    );
  }
  payoutList(userId: number, formData: FormData): Observable<unknown> {
    return this._http.post(environment.API_V2_URL + 'financials/payoutList/' + userId, formData);
  }
  transactionDetail(id: number): Observable<transaction> {
    return this._http.get<transaction>(
      environment.API_V2_URL + 'financials/transaction-detail/' + id
    );
  }
  public getPayoutDetail(userId: number, id: string, formData: FormData): Observable<unknown> {
    return this._http.post(
      environment.API_V2_URL + 'financials/payoutDetails/' + userId + '/' + id,
      formData
    );
  }
}
