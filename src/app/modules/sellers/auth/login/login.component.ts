import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { UserData } from '@schemas/user.interface';
import { SegmentService } from '@services/segment.service';
import { SegmentProductUploadStatusEnum } from '@shared/enums/segment.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '@services/app/app.service';
import { AppConfiguration } from '@schemas/app.interface';
import { UniversalService } from '@services/universal.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({});
  public submitted = false;
  public errorMessage: string | null | undefined;
  public hide = true;
  public returnUrl = '';
  @Output() forgotPassEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private userService: UserService,
    public segmentService: SegmentService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private appService: AppService,
    private universalService: UniversalService
  ) {}

  ngOnInit(): void {
    this.segmentService.track(SegmentProductUploadStatusEnum.STARTED, {
      step: 0,
      step_name: 'Login',
    });
    this.setupLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    // redirect to product-add if already logged in
    if (this.authService.loggedIn) {
      this.router.navigate(['sellers/product-add/general']);
    }
  }

  get lf(): FormGroup {
    return this.loginForm as FormGroup;
  }

  private setupLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onProcessLogin(): void {
    this.submitted = true;

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (!this.loginForm.invalid) {
      const userData = this.loginForm.getRawValue();

      this.spinnerService.show();
      this.authService
        .login(userData)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe((response: UserData) => {
          if (response.status && response.status === 'fail') {
            this.errorMessage = response.error_message;
          }
          else {
            this.segmentService.SignedIn(response.id, response.email, 'Seller Flow');
            this.segmentService.track(SegmentProductUploadStatusEnum.COMPLETED, {
              step: 0,
              step_name: 'Login',
              login_method: 'Email',
            });
            this.userService.setUser(response);
            this.getUserData(response.id);
          }
        });
    }
  }

  public onFbLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(fbData => {
      const { email, firstName, lastName, authToken } = fbData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
      };

      this.spinnerService.show();
      this.authService
        .authenticateFacebook(fbAuthData)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(authRes => {
          if (authRes.status && authRes.status === 'fail') {
            this.errorMessage = authRes.error_message;
          }
          else {
            this.userService.getAccessToken(authRes).subscribe(data => {
              if (data?.access_token) {
                authRes.access_token = data.access_token;
                this.userService.setUser(authRes);
                this.getUserData(authRes.id);
                this.segmentService.track(SegmentProductUploadStatusEnum.COMPLETED, {
                  step: 0,
                  step_name: 'Login',
                  login_method: 'Facebook',
                });
              }
            });
          }
        });
    });
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

      this.spinnerService.show();
      this.authService
        .authenticateGmail(fbAuthData)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(authRes => {
          if (authRes.status && authRes.status === 'fail') {
            this.errorMessage = authRes.error_message;
          }
          else {
            this.userService.getAccessToken(authRes).subscribe(data => {
              if (data?.access_token) {
                authRes.access_token = data.access_token;
                this.userService.setUser(authRes);
                this.getUserData(authRes.id);
                this.segmentService.track(SegmentProductUploadStatusEnum.COMPLETED, {
                  step: 0,
                  step_name: 'Login',
                  login_method: 'Gmail',
                });
              }
            });
          }
        });
    });
  }

  public getUserData(id: number): void {
    this.spinnerService.show();
    this.userService
      .getUserV2(id)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe(
        data => {
          if (data.message === 'User Id exists.') {
            this.userService.setUser(data.user['user'][0]);
            this.authService.setLoggedIn(true);
            this.updateAppConfig(data.user['user'][0]);

            if (this.returnUrl.length) this.router.navigateByUrl(this.returnUrl);
            else this.router.navigate(['sellers/product-add/general']);
          }
        },
        error => {
          this.userService.setUser(null);
          this.authService.setLoggedIn(false);
        }
      );
  }

  public forgotPass(value): void {
    this.forgotPassEvent.emit(value);
  }

  private updateAppConfig(user: UserData) {
    const oldAppConfig: AppConfiguration = this.appService.getAppConfigurationValue();
    const appConfig = {
      ...oldAppConfig,
      currencyID: user.currency_id || 11,
      currencyCode: this.appService.currencies.find(x => x.id === user.currency_id)?.name || 'EUR',
      currencySymbol: this.appService.currencies.find(x => x.id === user.currency_id)?.symbol || '€',
      countryID: user.country_id || 1,
      countryName: this.appService.countries.find(x => x.id === user.country_id)?.name || 'United States',
    } as AppConfiguration;

    this.appService.setAppConfiguration(appConfig);
  }

  getEyeIcon(): string {
    return this.hide
      ? '/assets/images/icons/eye-closed.svg'
      : '/assets/images/icons/eye.svg';
  }
}
