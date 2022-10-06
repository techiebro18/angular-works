import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AZDesignersService {
  constructor(private http: HttpClient) {}
  getAZDesigners(languageID: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/azdesigners/${languageID}`);
  }
}
