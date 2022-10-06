import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '@schemas/apis.interface';
import { AuthResponseV2 } from '@schemas/auth.interface';
import { UserData } from '@schemas/user.interface';
import { AuthService } from '@services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { environment } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '@services/common/shared.service';
import { AppConfiguration, AppResponse } from '@schemas/app.interface';
import { AppService } from '@services/app/app.service';
import { UniversalService } from '@services/universal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loggedin = new EventEmitter();
  @Input() isWishlist;
  @Input() prdImg;
  @Input() location;
  hide = true;
  form: FormGroup;
  incorrectCredentials = false;
  loginErrorMessage: string;
  baseUrl = environment.baseUrl;
  submitted = false;
  applyWishlistData = { status: false, productID: '', hit: '' };
  private subscriptions$: Subscription[] = [];

  constructor(
    public productService: ProductService,
    public segmentService: SegmentService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private sharedService: SharedService,
    private appService: AppService,
    private universalService: UniversalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      subscription?.unsubscribe();
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public loginSubmit() {
    this.incorrectCredentials = false;
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.spinner.show();
    const loginData = this.form.getRawValue() as LoginData;

    this.subscriptions$.push(
      this.authService.loginV2(loginData).subscribe(
        (response: AuthResponseV2) => {
          this.subscriptions$.push(
            this.productService.applyWishlistObservable.subscribe(data => {
              if (data !== undefined && data !== null) {
                if (data.status == true && data.productID != null) {
                  this.productService.addToWishList(data.productID, response.user.id, data.hit);
                  this.productService.applyWishlist(this.applyWishlistData);
                  this.productService.setWishlistProductID(data.productID);
                }
              }

              this.subscriptions$.push(
                this.productService.getWishlist().subscribe(data => {
                  this.productService.updateUserWishlistRecords(data);
                })
              );
            })
          );

          this.spinner.hide();
          this.updateAppConfig(response.user);
          this.segmentService.SignedIn(response.user.id, response.user.email, this.location);
          this.loggedin.emit();
        },
        error => {
          if (error.message) {
            this.loginErrorMessage = error.message;
          }
          else {
            this.loginErrorMessage = 'Invalid credentials';
          }

          this.incorrectCredentials = true;
          this.spinner.hide();
        }
      )
    );
  }

  private updateAppConfig(user: UserData) {
    const appConfig = {
      currencyID: user.currency_id || 11,
      currencyCode: this.appService.currencies.find(x => x.id === user.currency_id)?.name || 'EUR',
      currencySymbol: this.appService.currencies.find(x => x.id === user.currency_id)?.symbol || '€',
      languageID: user.language_id | 1,
      languageShortName: this.appService.languages.find(x => x.id === user.language_id)?.shortName || 'en',
      languageName: this.appService.languages.find(x => x.id === user.language_id)?.name || 'English(US)',
      countryID: user.country_id || 1,
      countryName: this.appService.countries.find(x => x.id === user.country_id)?.name || 'United States',
    } as AppConfiguration;

    this.appService.setAppConfiguration(appConfig);

    const subdomain = this.appService.getCurrentSubDomain(null);

    if (this.appService.getLangIdOfSubDomain(subdomain) !== user.language_id) {
      this.spinner.show();

      const subDomain = appConfig.languageShortName;
      let redirectUrl = '';
      let translatedUrl = null;

      if (!translatedUrl) {
        translatedUrl = this.universalService.getApplicationPathname(true);
      }

      if (subDomain === 'en') {
        redirectUrl = this.universalService.getApplicationProtocol() + environment.demainUrl + translatedUrl;
      }
      else {
        redirectUrl
          = this.universalService.getApplicationProtocol() + subDomain + '.' + environment.demainUrl + translatedUrl;
      }

      window.location.href = redirectUrl;
    }
  }

  public closeDialog() {
    this.loggedin.emit();
  }

  /*updateCart(data) {
    var cartCookieItems = this.cookieService.get('items') != '' ? JSON.parse(this.cookieService.get('items')) : {};
    data.forEach((el) => {
      cartCookieItems[el.product_id] = { product_id: el.product_id };
    });
    this.cookieService.set('items', JSON.stringify(cartCookieItems), { path: '/', domain: environment.cookieDomain });
    var count = Object.keys(cartCookieItems).length;
    if (count) {
      // this._sharedService.updateCartCount(count);
    }
  }*/
}
