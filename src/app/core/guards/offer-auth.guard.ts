import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '@services/user.service';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';

@Injectable()
export class OfferAuthGuard implements CanActivate {
  private permittedRoles = [UserRolesEnum.TVB_ADMIN, UserRolesEnum.USER, UserRolesEnum.PROFESSIONAL_SELLER];

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
      const user = this.userService.getUserData().value;

      if (!this.permittedRoles.includes(user.role_id)) {
        return this.blockAccessAndRedirectToHome();
      }

      return true;
    }
    else {
      return this.blockAccessAndRedirectToHome();
    }
  }

  private blockAccessAndRedirectToHome(): boolean {
    this.router.navigate(['/']);

    return false;
  }
}
