import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  public getAllDesigners(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/brands/active`);
  }

  public get(id: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/brands/${id}`);
  }
}
