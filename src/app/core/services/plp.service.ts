import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { environment } from '@environments/environment';
import { Plp } from '@schemas/plp.interface';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { UniversalService } from './universal.service';
import { PlpRouteInfo } from 'src/app/modules/catalog/pages/listing-view/plp-definitions';

@Injectable({
  providedIn: 'root',
})
export class PlpService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private universalService: UniversalService
  ) {}

  public getTopBottomDesc(descData: PlpRouteInfo): Observable<Plp> {
    const idOfRoute = this.generateIdForRouteConfig(descData);
    const REQUESTED_API_KEY = makeStateKey<any>('plpTopBottom-' + idOfRoute);

    if (this.transferState.hasKey(REQUESTED_API_KEY)) {
      // response already fetched on server side, use it
      const resp = this.transferState.get(REQUESTED_API_KEY, null);

      // remove response from transferState
      this.transferState.remove(REQUESTED_API_KEY);

      return of(resp);
    }
    else {
      // response is not in the transferState, fetch it
      return this.http.post<Plp>(`${environment.API_V2_URL}topBottomData`, descData).pipe(
        tap(resp => {
          // if fetched in server side, store the response in the transferState
          if (!this.universalService.isBrowser) {
            this.transferState.set(REQUESTED_API_KEY, resp);
          }
        })
      );
    }
  }

  private generateIdForRouteConfig(plpRouteInfo: PlpRouteInfo) {
    let id
      = plpRouteInfo.staticData.plpFor
      + '-'
      + plpRouteInfo.staticData.plpLanguage
      + '-'
      + plpRouteInfo.currencyInfo.plpCurrency;

    if (plpRouteInfo.routeParams.designer_seo_url) {
      id += '-' + plpRouteInfo.routeParams.designer_seo_url;
    }

    if (plpRouteInfo.routeParams.styles_seo_url) {
      id += '-' + plpRouteInfo.routeParams.styles_seo_url;
    }

    if (plpRouteInfo.routeParams.parent_category_seo_url) {
      id += '-' + plpRouteInfo.routeParams.parent_category_seo_url;
    }

    if (plpRouteInfo.routeParams.child_category_seo_url) {
      id += '-' + plpRouteInfo.routeParams.child_category_seo_url;
    }

    return id;
  }

  // holds the last open URL (created by instantSearch) inside PLP page
  public lastOpenedUrl = new Subject();
  // used as a check to prevent instantSearch from updating the URL on distroying previous PLP component
  public isWriteToURL = new BehaviorSubject<boolean>(false);
}
