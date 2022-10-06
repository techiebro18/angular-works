import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from '@schemas/product.entity';
import { AuthService } from '@services/auth.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
import { LoaderService } from 'src/app/core/services/app/loader.service';
import { finalize } from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import { LoggedUserInfoResponse } from '@schemas/auth.interface';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { UserData } from '@schemas/user.interface';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent implements OnInit {
  @Output() valueChangeS = new EventEmitter();
  @Output() socialloggedin = new EventEmitter();
  @Input() location;
  user;
  href: string;
  _registrationForm: FormGroup;
  emailErrorMessage: string;
  items: Item[] = [];
  // private itemwishlist: WishList[] = [];
  submitted = false;
  currency_id: any;
  language_id: any;
  userLoginStatus: boolean;
  userId: any;
  total: number;
  arraySize: any;
  cartItemCount = 0;
  checkoutSeo: any;
  accountSeo: any;
  pre: string;
  public errorMessage: string | null | undefined;
  applyWishlistData = { status: false, productID: '' };
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private loaderService: LoaderService,
    private router: Router,
    private userService: UserService,
    public _productService: ProductService,
    public segmentService: SegmentService
  ) {}

  ngOnInit(): void {}

  public onFbLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(fbData => {
      const { email, firstName, lastName, authToken } = fbData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
      };

      this.loaderService.triggerLoading.emit(true);
      this.authService
        .authenticateFrontFb(fbAuthData)
        .pipe(
          finalize(() => {
            this.loaderService.triggerLoading.emit(false);
          })
        )
        .subscribe(authRes => {
          if (authRes.status && authRes.status === 'fail') {
            this.errorMessage = authRes.error_message;
          }
          else {
            this.userService.setUser(authRes);
            this._productService.applyWishlistObservable.subscribe(data => {
              if (data !== undefined && data !== null) {
                if (data.status == true && data.productID != null) {
                  this._productService.addToWishList(data.productID, authRes.user.id, data.hit);
                  this._productService.applyWishlist(this.applyWishlistData);
                  this._productService.setWishlistProductID(data.productID);
                }
              }
            });
            this._productService.getWishlist().subscribe(
              data => {
                this._productService.updateUserWishlistRecords(data);
              },
              error => {
                console.log(error);
              }
            );
            this.segmentService.SignedIn(authRes.id, authRes.email, this.location);
            this.getUserData(authRes.id);
            this.socialloggedin.emit();
          }
        });
    });
  }

  public getUserData(id: number): void {
    this.loaderService.triggerLoading.emit(true);
    this.userService
      .getUserV2(id)
      .pipe(
        finalize(() => {
          this.loaderService.triggerLoading.emit(false);
        })
      )
      .subscribe(
        data => {
          if (data.message === 'User Id exists.') {
            const userData: UserData = data.user['user'][0];

            this.userService.setUser(userData);
            this.authService.setLoggedIn(true);
            this.socialloggedin.emit();
            // this.router.navigate(['/']);
          }
        },
        error => {
          this.userService.setUser(null);
          this.authService.setLoggedIn(false);
        }
      );
  }

  public onGmailLogin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleData => {
      const { email, firstName, lastName, authToken } = googleData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
      };

      this.loaderService.triggerLoading.emit(true);
      this.authService
        .authenticateFrontGmail(fbAuthData)
        .pipe(
          finalize(() => {
            this.loaderService.triggerLoading.emit(false);
          })
        )
        .subscribe(authRes => {
          if (authRes.status && authRes.status === 'fail') {
            this.errorMessage = authRes.error_message;
          }
          else {
            this.userService.setUser(authRes);
            this._productService.applyWishlistObservable.subscribe(data => {
              if (data !== undefined && data !== null) {
                if (data.status == true && data.productID != null) {
                  this._productService.addToWishList(data.productID, authRes.user.id, data.hit);
                  this._productService.applyWishlist(this.applyWishlistData);
                  this._productService.setWishlistProductID(data.productID);
                }
              }
            });
            this._productService.getWishlist().subscribe(
              data => {
                this._productService.updateUserWishlistRecords(data);
              },
              error => {
                console.log(error);
              }
            );
            this.segmentService.SignedIn(authRes.id, authRes.email, this.location);
            this.getUserData(authRes.id);
            this.socialloggedin.emit();
          }
        });
    });
  }
}
