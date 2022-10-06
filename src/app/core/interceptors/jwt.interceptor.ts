import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { environment } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '@services/app/app.service';
import { UserService } from '@services/user.service';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { TermsEnum } from '@shared/enums/terms.enum';
import { throws } from 'assert';
import { request } from 'http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
    private appService: AppService,
    private userService: UserService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with apiKey if available
    //const localApiKey = this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.API_KEY);
    //const localApiKey = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.API_KEY);
    //const apiKey = localApiKeyCookie || localApiKey;
    //const accessToken = this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    // const accessTokenKeyCloak = this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN_KEYCLOAK);
    const apiKey = this.localStorageService.getItem(APP_CONSTANTS.COOKIE_KEYS.API_KEY);
    const accessToken = this.localStorageService.getItem(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN);
    /**
     * Catalog SVC interceptor
     */

    if (request.url.includes(environment.API_CATALOG_SVC)) {
      request = request.clone({
        // setHeaders: {
        //   Authorization: `Bearer ${accessTokenKeyCloak}`
        // }
      });

      return next.handle(request);
    }

    const header = {};

    let isBearerToken = false;

    if (request.url.includes(environment.API_V2_URL) || request.url.includes(environment.OFFER_API_URL))
      isBearerToken = true;

    // Included Docker Match
    // Temporary solution to support old APIs and  APIv2
    if (isBearerToken) {
      // apiv2 is authinticated using Bearer accessToken
      // apiv2 requires currency and language in header for allrequests
      const currentAppConfiguaration = this.appService.getAppConfigurationValue();
      const subdomain = this.appService.getCurrentSubDomain(null);
      const langByDomain = this.appService.getLangOfSubDomain(subdomain);

      header['x-config-language'] = this.appService.mapLanguageShortName(langByDomain.languageShortName);

      if (currentAppConfiguaration != null) {
        header['x-config-currency'] = currentAppConfiguaration.currencyCode;
      }

      if (accessToken != null && accessToken.length > 0) {
        header['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    else if (apiKey != null && apiKey.length > 0 && !request.url.includes('catalog')) {
      // old APIs are authinticated using apiKey
      header['Authorization'] = `${apiKey}`;
    }

    request = request.clone({
      setHeaders: header,
    });

    return next.handle(request);
  }
}
