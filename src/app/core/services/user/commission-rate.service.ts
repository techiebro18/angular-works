import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { CommissionRatesModel } from '@shared/models/commission-rates.interface';

@Injectable({
  providedIn: 'root',
})
export class CommissionRateService {
  constructor(private httpClient: HttpClient) {}

  public getCommissionRate(user_id: number): Observable<ApiResponseModel<CommissionRatesModel>> {
    return this.httpClient.get<ApiResponseModel<CommissionRatesModel>>(
      `${environment.API_V2_URL}commission-rate/get/${user_id}`
    );
  }
}
