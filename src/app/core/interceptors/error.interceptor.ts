import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '@services/app/loader.service';
import { UniversalService } from '@services/universal.service';
import { AuthService } from '@services/auth.service';
import { AppService } from '@services/app/app.service';
import { SharedService } from '@services/common/shared.service';
import { LocalStorageService } from '@services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { environment } from '@environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    public authService: AuthService,
    private _appService: AppService,
    private _sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
    private universalService: UniversalService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          const currentUrl = this.universalService.getApplicationPathname();
          const apiUrl = err.url;
          const execludedAPIs = ['/api/auth/login', 'api/v1/loggeduserInfo'];
          const isExeculude = execludedAPIs.filter(url => apiUrl.includes(url)).length > 0;

          if (err.status === 401 && !isExeculude) {
            if (currentUrl.includes('/sellers')) {
              this.clearSessionData();
              this.router.navigate(['/sellers/login']);
            }
            else {
              // redirect to home page
              this.router.navigate(['/']);
            }
          }

          /* if user is logged out at server side but login at client side  */
          if (err.status === 403 && this.authService.loggedIn) {
            this.clearSessionData();
            this.router.navigate(['/']);
          }
        }

        this.loaderService.triggerLoading.emit(false);

        if (this.universalService.isBrowser) {
          return throwError(err.error); // => this fails on Angular Universal XX
        }
        else {
          return throwError(err);
        }
      })
    );
  }

  private clearSessionData(): void {
    this._appService.disableSettingsPopup(false);
    this.authService.afterLogout();
    this.localStorageService.clear();

    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.API_KEY, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_ID, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.USER_DATA, '/', environment.cookieDomain);
    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN, '/', environment.cookieDomain);

    this.cookieService.delete(APP_CONSTANTS.COOKIE_KEYS.CLIENT_WEBSITE_TOKEN);
  }
}
