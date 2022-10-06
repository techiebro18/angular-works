import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { Menu } from '@schemas/app.interface';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { UniversalService } from '@services/universal.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // MenuList Subject for nav and side nav menu
  public menuList$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  public menuListMobile$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  // MenuListFooter for foter component
  public menuListFooter$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  constructor(
    private _http: HttpClient,
    private transferState: TransferState,
    private universalService: UniversalService
  ) {}

  getMenu(language_id: any): Observable<Menu[]> {
    const REQUESTED_API_KEY = makeStateKey<any>('menuItems-' + language_id);

    if (this.transferState.hasKey(REQUESTED_API_KEY)) {
      // response already fetched on server side, use it
      const resp = this.transferState.get(REQUESTED_API_KEY, null);

      // remove response from transferState
      this.transferState.remove(REQUESTED_API_KEY);
      // Store the menu list response to be resued
      this.menuList$.next(resp);
      this.setupMobileMenu(resp);

      return of(resp);
    }
    else {
      return this._http.get<Menu[]>(environment.API_URL + '/getMenu/' + language_id).pipe(
        tap(menuResp => {
          // Store the menu list response to be resued
          this.menuList$.next(menuResp);
          this.setupMobileMenu(menuResp);

          // if fetched in server side, store the response in the transferState
          if (!this.universalService.isBrowser) {
            this.transferState.set(REQUESTED_API_KEY, menuResp);
          }
        })
      );
    }
  }

  setupMobileMenu(menuResp: Menu[]) {
    let items = menuResp;
    const onSaleItem = items[items.length - 1];

    items = items.filter(x => x.seo_url !== 'sale');
    items.unshift(onSaleItem);
    this.menuListMobile$.next(items);
  }

  getMenuFooter(language_id: any): Observable<Menu[]> {
    const REQUESTED_API_KEY = makeStateKey<any>('menuFooter-' + language_id);

    if (this.transferState.hasKey(REQUESTED_API_KEY)) {
      // response already fetched on server side, use it
      const resp = this.transferState.get(REQUESTED_API_KEY, null);

      // Store the menu list response to be resued
      this.menuListFooter$.next(resp);
      // remove response from transferState
      this.transferState.remove(REQUESTED_API_KEY);

      return of(resp);
    }
    else {
      // response is not in the transferState, fetch it
      return this._http.get<Menu[]>(environment.API_URL + '/getMenuFooter/' + language_id).pipe(
        tap(resp => {
          this.menuListFooter$.next(resp);

          // if fetched in server side, store the response in the transferState
          if (!this.universalService.isBrowser) {
            this.transferState.set(REQUESTED_API_KEY, resp);
          }
        })
      );
    }
  }

  getMenuForHrefLang(seourl: any): Observable<Menu[]> {
    return this._http.post<Menu[]>(environment.API_URL + '/getMenuForHrefLang', seourl);
  }

  getStyleForHrefLang(language_id: any, styleId: number): Observable<Menu[]> {
    return this._http.get<Menu[]>(
      environment.API_URL + '/getStyleForHrefLang/' + language_id + '/' + styleId
    );
  }

  searchForStyle(searchString: string, productConfig) {
    return this._http.post<any[]>(
      environment.API_URL + '/searchForStyle/' + searchString,
      productConfig
    );
  }

  searchForDesigner(searchString: string, productConfig) {
    return this._http.post<any[]>(
      environment.API_URL + '/searchForBrands/' + searchString,
      productConfig
    );
  }

  getArchiveMenuSection(): Observable<any> {
    return this._http.get(environment.API_V2_URL + 'navigation/archive');
  }
}
