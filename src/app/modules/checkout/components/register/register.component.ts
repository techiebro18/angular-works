import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from '@services/user.service';
import { AuthResponseV2, UserInfoResponse } from '@schemas/auth.interface';
import { BrazeData, LoginData, RegisterData } from '@schemas/apis.interface';
import { SegmentService } from '@services/segment.service';
import { UserData } from '@schemas/user.interface';
import { ValidatorService } from '@services/validator.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-onepage-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class OnePageRegisterComponent implements OnInit {
  public registerForm = new FormGroup({});
  public submitted = false;
  public rememberMeEror = false;
  public errorMessage: unknown | undefined | null;
  public successMessage: string | undefined | null;
  public showRegister = false;
  public showGuest = false;
  public slctOption1 = true;
  public slctOption2 = true;
  public title = '';
  errorlist: unknown = '';
  @Output() loginEvent = new EventEmitter<boolean>();
  @ViewChild('target')
  target: ElementRef;
  public recaptcha_site_key = environment.RECAPTCHA_SITE_KEY;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private validatorSvc: ValidatorService,
    public segmentService: SegmentService
  ) {}

  ngOnInit(): void {
    this.setupRegisterForm();

    if (this.authService.loggedIn) {
      this.segmentService.trackOnePageUser('Checkout Step Completed', {
        step: 1,
        step_name: 'Login',
        login_method: 'Already Signed In',
      });
      this.router.navigate(['/checkout/shipping-address']);
    }
  }

  get lf(): FormGroup {
    return this.registerForm as FormGroup;
  }

  private setupRegisterForm(): void {
    let validationRecaptcha;

    if (environment.name != 'dev') validationRecaptcha = Validators.required;

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: [
        '',
        Validators.compose([Validators.pattern('[a-zA-Z0-9.]*'), Validators.required]),
        this.validatorSvc.validateUniqueUsername(),
      ],
      recaptchaReactive: ['', validationRecaptcha],
      rememberMe: ['', Validators.required],
    });

    this.registerForm.get('recaptchaReactive').valueChanges.subscribe(x => {
      this.target.nativeElement.scrollIntoView();
    });
  }

  public onProcessRegister(): void {
    this.segmentService.track('Button Clicked', { label: 'join_our_community' });
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (
      this.registerForm.controls.rememberMe.value == 'false'
      || this.registerForm.controls.rememberMe.value == false
    ) {
      this.rememberMeEror = true;

      return;
    }

    if (!this.registerForm.invalid) {
      this.rememberMeEror = false;
      const userData = { ...this.setUserData() } as RegisterData;

      this.SpinnerService.show();

      this.authService.registerV2(userData).subscribe(
        (response: AuthResponseV2) => {
          this.segmentService.SignedUp(response.user.id, response.user.email, 'Checkout Flow');
          this.performLogin();
          this.segmentService.trackOnePageUser('Checkout Step Completed', {
            step: 1,
            step_name: 'Login',
            login_method: 'Email',
          });

          if (userData.news_letter === '1') setTimeout(() => this.authService.addBrazeGroups(response.user.id), 15000);

          this.router.navigate(['/checkout/shipping-address']);
        },
        error => {
          this.SpinnerService.hide();
          this.errorlist = '';
          this.errorlist += '<p>' + error.message + '</p>';
          this.errorMessage = this.errorlist;
        }
      );
    }
  }

  setUserData(): RegisterData {
    const userData = {
      ...this.registerForm.getRawValue(),
      news_letter: '0',
    } as RegisterData;

    return userData;
  }

  performLogin(): void {
    const loginData = this.registerForm.getRawValue() as LoginData;

    this.authService.loginV2(loginData).subscribe(
      (response: AuthResponseV2) => {
        this.SpinnerService.hide();
        this.userService.setUser(response.user);
        this.authService.setLoggedIn(true);
      },
      error => {
        this.SpinnerService.hide();
        this.errorMessage = error;
      }
    );
  }

  public onFbLogin(): void {
    this.segmentService.track('Button Clicked', { label: 'signin_facebook' });
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(fbData => {
      const { email, firstName, lastName, authToken } = fbData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
      };

      this.SpinnerService.show();
      this.authService
        .authenticateFacebook(fbAuthData)
        .pipe(
          finalize(() => {
            this.SpinnerService.hide();
          })
        )
        .subscribe(authRes => {
          if (authRes.status && authRes.status === 'fail') {
            this.segmentService.trackOnePageUser('Error Occurred', {
              label: 'facebook',
              form: 'sign_in',
              category: 'checkout',
            });
            this.errorMessage = authRes.error_message;
          }
          else {
            this.userService.getAccessToken(authRes).subscribe(data => {
              if (data?.access_token) {
                authRes.access_token = data.access_token;
                this.userService.setUser(authRes);
                this.getUserData(authRes.id);
                this.segmentService.trackOnePageUser('Checkout Step Completed', {
                  step: 1,
                  step_name: 'Login',
                  login_method: 'Facebook',
                });
                this.router.navigate(['/checkout/shipping-address']);
              }
            });
          }
        });
    });
  }

  public onGmailLogin(): void {
    this.segmentService.track('Button Clicked', { label: 'signin_google' });
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleData => {
      const { email, firstName, lastName, authToken } = googleData;
      const fbAuthData = {
        email,
        fname: firstName,
        lname: lastName,
        access_token: authToken,
      };

      this.SpinnerService.show();
      this.authService
        .authenticateGmail(fbAuthData)
        .pipe(
          finalize(() => {
            this.SpinnerService.hide();
          })
        )
        .subscribe(authRes => {
          if (authRes.status && authRes.status === 'fail') {
            this.segmentService.trackOnePageUser('Error Occurred', {
              label: 'google',
              form: 'sign_in',
              category: 'checkout',
            });
            this.errorMessage = authRes.error_message;
          }
          else {
            this.userService.getAccessToken(authRes).subscribe(data => {
              if (data?.access_token) {
                authRes.access_token = data.access_token;
                this.userService.setUser(authRes);
                this.getUserData(authRes.id);
                this.segmentService.trackOnePageUser('Checkout Step Completed', {
                  step: 1,
                  step_name: 'Login',
                  login_method: 'Google',
                });
                this.router.navigate(['/checkout/shipping-address']);
              }
            });
          }
        });
    });
  }

  public getUserData(id: number): void {
    this.SpinnerService.show();

    this.userService
      .getUserV2(id)
      .pipe(
        finalize(() => {
          this.SpinnerService.hide();
        })
      )
      .subscribe(
        (data: UserInfoResponse) => {
          if (data.message === 'User Id exists.') {
            const userData: UserData = data.user['user'][0];

            this.userService.setUser(userData);
            this.authService.setLoggedIn(true);
          }
        },
        error => {
          this.userService.setUser(null);
          this.authService.setLoggedIn(false);
        }
      );
  }
  public loginEventClick(value): void {
    this.segmentService.track('Link Clicked', { label: 'log_in' });
    this.loginEvent.emit(value);
  }

  public showRegisteration(value: string): void {
    if (value == 'register') {
      this.title = 'Checkout now before someone else buys what is in your bag.';
      this.showGuest = false;
      this.showRegister = true;
      this.slctOption1 = false;
      this.slctOption2 = true;
    }

    if (value == 'guest') {
      this.title = 'Checkout as guest and become a member later.';
      this.showRegister = false;
      this.showGuest = true;
      this.slctOption1 = true;
      this.slctOption2 = false;
    }
  }
}
