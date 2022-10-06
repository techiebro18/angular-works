import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/app/loader.service';
import { UserService } from '@services/user.service';
import { UserData } from '@schemas/user.interface';
import { AuthResponseV2 } from '@schemas/auth.interface';
import { LoginData } from '@schemas/apis.interface';
import { LoggedUserInfoResponse } from '@schemas/auth.interface';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';

@Component({
  selector: 'app-onepage-login',
  templateUrl: './onepage-login.component.html',
  styleUrls: ['./onepage-login.component.scss'],
})
export class OnePageLoginComponent implements OnInit {
  public loginForm = new FormGroup({});
  public submitted = false;
  baseRemoteUrl = '';
  public errorMessage: string | null | undefined;
  @Output() forgotPassEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private loaderService: LoaderService,
    private router: Router,
    private userService: UserService,
    public segmentService: SegmentService,
    public universalService: UniversalService
  ) {}

  ngOnInit(): void {
    this.setupLoginForm();
    this.baseRemoteUrl = this.universalService.getApplicationUrl();

    if (this.authService.loggedIn) {
      this.segmentService.trackOnePageUser('Checkout Step Completed', {
        step: 1,
        step_name: 'Login',
        login_method: 'Already Signed In',
      });
      this.router.navigate(['/checkout/shipping-address']);
      console.log('already logged in');
    }
  }

  get lf(): FormGroup {
    return this.loginForm as FormGroup;
  }

  private setupLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }

  public onProcessLogin(): void {
    this.submitted = true;

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (!this.loginForm.invalid) {
      const userData = this.loginForm.getRawValue();

      this.loaderService.triggerLoading.emit(true);
      this.authService
        .loginV2(userData)
        .pipe(
          finalize(() => {
            this.loaderService.triggerLoading.emit(false);
          })
        )
        .subscribe(
          (response: AuthResponseV2) => {
            if (!response) {
              this.errorMessage = 'Login Failed';
            }
            else {
              this.segmentService.SignedIn(response.user.id, response.user.email, 'Checkout Flow');
              this.userService.setUser(response.user);
              this.getUserData(response.user.id);
              this.segmentService.identifyOnePageUser(userData);
              this.segmentService.trackOnePageUser('Checkout Step Completed', {
                step: 1,
                step_name: 'Login',
                login_method: 'Email',
              });
              this.router.navigate(['/checkout/shipping-address']);
            }
          },
          error => {
            if (error.message) {
              this.errorMessage = error.message;
            }
            else {
              this.errorMessage = 'Invalid credentials';
            }
          }
        );
    }
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
          }
        },
        error => {
          this.userService.setUser(null);
          this.authService.setLoggedIn(false);
        }
      );
  }

  public forgotPass() {
    this.segmentService.forgotPasswordClick();
    const url = this.baseRemoteUrl + '/forgot-password';

    window.open(url, '_blank');
  }
}
