import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData, RegisterData } from '@schemas/apis.interface';
import { AuthResponseV2 } from '@schemas/auth.interface';
import { AppService } from '@services/app/app.service';
import { AuthService } from '@services/auth.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { ValidatorService } from '@services/validator.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/app/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({});
  public submitted = false;
  public errorMessage: string | undefined | null;
  public successMessage: string | undefined | null;
  public errorlist: any = '';
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    public segmentService: SegmentService,
    public _appService: AppService,
    private validatorSvc: ValidatorService
  ) {}

  ngOnInit(): void {
    this.setupRegisterForm();

    // redirect to product-add if already logged in
    if (this.authService.loggedIn) {
      this.router.navigate(['sellers/product-add/general']);
    }
  }

  get lf(): FormGroup {
    return this.registerForm as FormGroup;
  }

  get username() {
    return this.registerForm.get('username');
  }

  private setupRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: [
        '',
        Validators.compose([Validators.pattern('[a-zA-Z0-9.]*'), Validators.required]),
        this.validatorSvc.validatExistsUsername(),
      ],
    });
  }

  public onProcessRegister(): void {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.registerForm.invalid) {
      const userData = { ...this.setUserData() } as RegisterData;

      this.loaderService.triggerLoading.emit(true);

      this.authService.registerV2(userData).subscribe(
        (response: AuthResponseV2) => {
          if (userData.news_letter === '1') setTimeout(() => this.authService.addBrazeGroups(response.user.id), 15000);

          this.performLogin();
        },
        error => {
          this.errorlist = '';
          const items = Object.values(error['errors']);

          items.forEach(element => {
            console.log(element);
            this.errorlist += '<p>' + element + '</p>';
          });
          this.loaderService.triggerLoading.emit(false);
          this.errorMessage = this.errorlist;
        }
      );
    }
  }

  setUserData(): RegisterData {
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();
    const userData = {
      ...this.registerForm.getRawValue(),
      news_letter: '0',
      currency_id: currentAppConfiguaration.currencyID,
    } as RegisterData;

    return userData;
  }

  performLogin() {
    const loginData = this.registerForm.getRawValue() as LoginData;

    this.authService.loginV2(loginData).subscribe(
      (response: AuthResponseV2) => {
        this.loaderService.triggerLoading.emit(false);
        this.segmentService.SignedIn(response.user.id, response.user.email, 'Seller Flow');
        this.userService.setUser(response.user);
        this.authService.setLoggedIn(true);
        this.router.navigate(['sellers/product-add/general']);
      },
      error => {
        this.loaderService.triggerLoading.emit(false);
        this.errorMessage = error;
      }
    );
  }

  public onFbLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(fbData => {
      const currentAppConfiguaration = this._appService.getAppConfigurationValue();
      const { email, firstName, lastName, authToken } = fbData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
        currency_id: currentAppConfiguaration.currencyID,
      };

      this.loaderService.triggerLoading.emit(true);
      this.authService
        .authenticateFacebook(fbAuthData)
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
            this.getUserData(authRes);
          }
        });
    });
  }

  public onGmailLogin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleData => {
      const currentAppConfiguaration = this._appService.getAppConfigurationValue();
      const { email, firstName, lastName, authToken } = googleData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
        currency_id: currentAppConfiguaration.currencyID,
      };

      this.loaderService.triggerLoading.emit(true);
      this.authService
        .authenticateGmail(fbAuthData)
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
            this.getUserData(authRes);
          }
        });
    });
  }

  public getUserData(authRes: any): void {
    this.userService.setUser(authRes);
    this.authService.setLoggedIn(true);
    this.router.navigate(['sellers/product-add/general']);
  }

  getEyeIcon(): string {
    return this.hide
      ? '/assets/images/icons/eye-closed.svg'
      : '/assets/images/icons/eye.svg';
  }
}
