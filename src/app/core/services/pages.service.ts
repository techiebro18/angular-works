import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, tap } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { UniversalService } from './universal.service';
import { AppService } from '@services/app/app.service';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { HomepageSection } from '@shared/models/homepage-section.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class PagesService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private universalService: UniversalService,
    private appService: AppService
  ) {}

  public getHome(): Observable<any> {
    //const currentAppConfiguaration = this.appService.getAppConfigurationValue();
    //const forLanguageId = this.appService.mapLanguageShortName(currentAppConfiguaration.languageShortName);
    const subdomain = this.appService.getCurrentSubDomain(null);
    const langByDomain = this.appService.getLangOfSubDomain(subdomain);
    const forLanguageId = langByDomain.languageID;
    const HOME_PAGES_KEY = makeStateKey<any>('homeContent-' + forLanguageId);

    if (this.transferState.hasKey(HOME_PAGES_KEY)) {
      // response already fetched on server side, use it
      const homePagesResp = this.transferState.get(HOME_PAGES_KEY, null);

      // remove response from transferState
      this.transferState.remove(HOME_PAGES_KEY);

      return of(homePagesResp);
    }
    else {
      // response is not in the transferState, fetch it
      return this.http.get(`${environment.API_V2_URL}pages/home`).pipe(
        map((response: any) => response.list),
        tap(resp => {
          // if fetched in server side, store the response in the transferState
          if (!this.universalService.isBrowser) {
            this.transferState.set(HOME_PAGES_KEY, resp);
          }
        })
      );
    }
  }

  getHomePageSections(sectionName = '', languageCode = 'en'): Observable<ApiResponseModel<HomepageSection[]>> {
    return this.http.get<ApiResponseModel<HomepageSection[]>>(
      environment.API_V2_URL + 'pages/home/sections/' + sectionName + '/' + languageCode
    );
  }
}
