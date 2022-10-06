import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/app/loader.service';
import { finalize } from 'rxjs/operators';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from '@services/user.service';
import { AuthResponseV2, LoggedUserInfoResponse } from '@schemas/auth.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public registerForm = new FormGroup({});
  public submitted = false;
  public errorMessage: string | undefined | null;
  public successMessage: string | undefined | null;
  public incorrectEmail = false;
  emailErrorMessage: string;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.setupRegisterForm();

    // redirect to product-add if already logged in
    if (this.authService.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  get lf(): FormGroup {
    return this.registerForm as FormGroup;
  }

  private setupRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fname: ['', Validators.required],
      news_letter: [true],
    });
  }

  public onProcessRegister(): void {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.registerForm.invalid) {
      const userData = {
        ...this.registerForm.getRawValue(),
        first_name: this.registerForm.getRawValue().fname,
        news_letter: this.registerForm.getRawValue().news_letter
          ? '1'
          : '0',
      };

      this.loaderService.triggerLoading.emit(true);
      this.authService.isUserExists(userData.email).subscribe(
        data => {
          // user exists already, show error msg
          this.incorrectEmail = true;
          this.emailErrorMessage = 'This email is already register';
          this.loaderService.triggerLoading.emit(false);

          return false;
        },
        error => {
          if (error.message == 'The given data was invalid.') {
            // invalid email, show error msg
            this.incorrectEmail = true;
            this.emailErrorMessage = 'Please enter a valid email';
          }
          else {
            this.authService
              .registerV2(userData)
              .pipe(
                finalize(() => {
                  this.loaderService.triggerLoading.emit(false);
                })
              )
              .subscribe(
                (response: AuthResponseV2) => {
                  this.successMessage = 'You have registered successfully.';
                  this.router.navigate(['/new-in']);
                },
                error => {
                  if (error.error_message) {
                    this.errorMessage = error.error_message;
                  }
                }
              );
          }
        }
      );
    }
  }
}
