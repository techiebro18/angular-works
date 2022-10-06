import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/categories/parent`);
  }

  public getChildrenCategories(parentId: number): Observable<any> {
    return this.http.get(
      `${environment.ADMIN_API_URL}/categories/childCategory/${parentId}?isClickable=yes`
    );
  }

  public getAllCategories(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/categories`);
  }
}
