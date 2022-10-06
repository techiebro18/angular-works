import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { PriceDrop } from '@schemas/account/price-drop.interface';
import { ApiResponseModel } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PriceDropService {
  constructor(private httpClient: HttpClient) {}

  public checkProductPriceDrop(productId: number): Observable<ApiResponseModel<any>> {
    return this.httpClient.get<ApiResponseModel<any>>(`${environment.API_V2_URL}price_drop/${productId}`);
  }

  public getPriceDropList(): Observable<ApiResponseModel<any>> {
    return this.httpClient.get<ApiResponseModel<any>>(`${environment.API_V2_URL}price_drop`);
  }

  public subscribeProductPriceDrop(subscripionData: any): Observable<ApiResponseModel<any>> {
    return this.httpClient.post<ApiResponseModel<any>>(`${environment.API_V2_URL}price_drop`, subscripionData);
  }

  public unsubscribeProductPriceDrop(product_id: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.API_V2_URL}price_drop/${product_id}`);
  }
}
