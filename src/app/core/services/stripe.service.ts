import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

  listStripeBankAccounts(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.API_V2_URL}account/stripe/bank-account/${userId}`);
  }

  addStripeBankAccount(user_id: number, iban: string, bank_country_id: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('user_id', user_id)
      .set('iban', iban)
      .set('bank_country_id', bank_country_id);

    return this.http.post(`${environment.API_V2_URL}account/stripe/bank-account`, params);
  }

  setStripeDefaultBankAccount(stripe_bank_account_id: string): Observable<any> {
    return this.http.patch(`${environment.API_V2_URL}account/stripe/bank-account/${stripe_bank_account_id}`, {});
  }

  deleteStripeBankAccount(stripe_bank_account_id: string): Observable<any> {
    return this.http.delete(`${environment.API_V2_URL}account/stripe/bank-account/${stripe_bank_account_id}`);
  }
}
