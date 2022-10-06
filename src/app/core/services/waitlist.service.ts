import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  constructor(private http: HttpClient) {}
  public getUserWaitlist(): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}waitlist/getForUser`);
  }
  public getWaitlistProducts(id: any): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}waitlist/products/` + id);
  }
  public deleteWaitlist(formData: any): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}waitlist/delete`, formData);
  }
}
