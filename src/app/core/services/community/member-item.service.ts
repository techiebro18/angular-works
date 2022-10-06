import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { SoldItem } from '../../../shared/schemas/community/sold-item';

@Injectable({
  providedIn: 'root',
})
export class MemberItemService {
  constructor(private http: HttpClient) {}

  public getSoldItems(user_id: number): Observable<Array<SoldItem>> {
    return this.http.get<Array<SoldItem>>(
      `${environment.API_V2_URL}community/getSoldItem?sellerId=${user_id}`
    );
  }
}
