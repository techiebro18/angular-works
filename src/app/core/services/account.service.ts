import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { LocalStorageService } from './local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { Currency, Language } from '@schemas/app.interface';
import { SellerSoldItemsResponseModel } from '@shared/models/seller-sold-items-response.model';
import { AcceptTermsModel } from '@shared/models/accept-terms.interface';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
  ) {}

  getItems(statusFilter = 0): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('statusFilter', statusFilter.toString())
        .set('sortColumn', 'id')
        .set('pageSize', '100'),
    };

    return this.http.get(`${environment.ADMIN_API_URL}/product-approval`, options).pipe(
      map((response: any) => {
        return response.productlist;
      })
    );
  }

  public getSoldItems(params: any = {}): Observable<SellerSoldItemsResponseModel> {
    params = {
      sortColumn: 'created_at',
      sortOrder: 'desc',
      pageSize: '10',
      ...params,
    };

    let queryParams = new HttpParams();

    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    });

    const options = {
      params: queryParams,
    };

    return this.http.get<SellerSoldItemsResponseModel>(`${environment.API_V2_URL}orderItem/getSellerSoldItem`, options);
  }

  deleteItem(id: any): Observable<any> {
    // TODO: It is better to send the userId as a parameter instead of getting it from localStorage
    // To Keep the method clean and testable
    //const userData = JSON.parse(this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_DATA));
    const userId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);

    return this.http.delete(`${environment.ADMIN_API_URL}/product-approval/delete/${id}/soft/${userId}`);
  }

  getlanguageList(): Observable<Language[]> {
    return this.http.get<Language[]>(environment.API_URL + '/getLanguages');
  }

  getCurrencyList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(environment.API_URL + '/getCurrencies');
  }

  getCountries(region = ''): Observable<any> {
    let searchParams;

    if (region) {
      searchParams = { region };
    }

    return this.http.get(`${environment.ADMIN_API_URL}/countriesmapping`, { params: searchParams });
  }

  getCountriesReal(searchParams: any = {}): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}countries`, { params: searchParams });
  }

  acceptTerms(request: AcceptTermsModel): Observable<boolean> {
    return this.http.post<boolean>(`${environment.API_V2_URL}account/accept-terms`, request);
  }

  getAcceptTerms(user_id, term_id): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}account/accept-terms/${user_id}/${term_id}`);
  }
}
