import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ItemPayoutResponseModel } from '@shared/models/item-payout-response.model';

@Injectable({
  providedIn: 'root',
})
export class ItemDetailService {
  constructor(private http: HttpClient) {}

  public getPayoutDetails(orderItemId: number): Observable<ItemPayoutResponseModel> {
    return this.http.get<ItemPayoutResponseModel>(
      `${environment.API_V2_URL}orderItem/sellerSoldOrderItem/${orderItemId}`
    );
  }

  /**
   * Cancels an OrderItem. Optionally, removes the product from TVB. <br/>
   *
   * @param {number} orderItemId ID of the OrderItem.
   * @param {boolean} shouldRemoveProduct
   */
  public cancelItem(soldItemInfo: FormData): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}orderItem/sellerItemCancel`, soldItemInfo);
  }

  public getOrderItem(orderItemId: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/orderItem/getSellerItem/${orderItemId}`);
  }
}
