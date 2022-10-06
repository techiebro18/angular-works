import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '@services/user.service';
import { TermsEnum } from '@shared/enums/terms.enum';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';

@Injectable()
export class SellersAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);

    if (userId) {
      const user = this.userService.getUserData().getValue();
      const proSellerTerms = user?.terms?.find(_ => _.id == TermsEnum.PRO_SELLERS_TERMS);
      const proSellerAgreements = user?.terms?.find(_ => _.id == TermsEnum.MY_AGREEMENTS);

      if (user?.role_id == UserRolesEnum.PROFESSIONAL_SELLER) {
        if (!proSellerTerms || proSellerTerms?.accepted == 0) {
          this.router.navigate(['/account/terms-and-conditions/accept-terms']);

          return false;
        }

        if (!proSellerAgreements || proSellerAgreements?.accepted == 0) {
          this.router.navigate(['/account/terms-and-conditions/my-agreements']);

          return false;
        }
      }

      return true;
    }
    else {
      this.router.navigate(['/sellers/login'], { queryParams: { returnUrl: state.url } });

      return false;
    }
  }
}
