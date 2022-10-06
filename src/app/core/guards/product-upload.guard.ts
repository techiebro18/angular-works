import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { ProductApprovalService } from '@services/product-approval.service';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';

@Injectable()
export class ProductUploadGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private productApprovalService: ProductApprovalService,
    private cookieService: CookieService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = this.userService.getUserData().getValue();
    const userId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);

    if (userId) {
      const productApprovalId = route.paramMap.get('id');

      if (productApprovalId) {
        const product = await firstValueFrom(this.productApprovalService.get(productApprovalId));

        if (user.id === product.commission_user_id) {
          return true;
        }
        else {
          this.router.navigate(['/sellers/login']);

          return false;
        }
      }
      else {
        return true;
      }
    }
    else {
      this.router.navigate(['/sellers/login']);

      return false;
    }
  }
}
