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
import { LoggedUserInfoResponse } from '@schemas/auth.interface';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent implements OnInit {
  public forgetPassForm = new FormGroup({});
  public changePassForm = new FormGroup({});
  public submitted = false;
  public errorMessage: string | null | undefined;
  public successMessage: string | null | undefined;
  public codeSent = false;
  @Output() forgotPassEvent = new EventEmitter<boolean>();
  passChanged = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private loaderService: LoaderService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setupForgetPassForm();
    this.setupChangePassForm();

    // redirect to product-add if already logged in
    if (this.authService.loggedIn) {
      this.router.navigate(['sellers/product-add/general']);
    }
  }

  private setupForgetPassForm(): void {
    this.forgetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  private setupChangePassForm(): void {
    this.changePassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  public onChangePass(): void {
    this.submitted = true;

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (!this.changePassForm.invalid) {
      const userData = this.changePassForm.getRawValue();

      this.loaderService.triggerLoading.emit(true);
      this.userService
        .changePassword(userData)
        .pipe(
          finalize(() => {
            this.loaderService.triggerLoading.emit(false);
          })
        )
        .subscribe(
          (response: UserData) => {
            if (response.errors) {
              this.errorMessage = response.message;
            }
            else {
              this.successMessage = response.message;
              this.passChanged = true;
              this.changePassForm.reset();
            }
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
  }
  public onSentCode(): void {
    this.submitted = true;

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (!this.forgetPassForm.invalid) {
      const userData = this.forgetPassForm.getRawValue();

      this.loaderService.triggerLoading.emit(true);
      this.userService
        .forgotPassword(userData)
        .pipe(
          finalize(() => {
            this.loaderService.triggerLoading.emit(false);
          })
        )
        .subscribe(
          (response: UserData) => {
            if (response.errors) {
              this.errorMessage = response.message;
            }
            else {
              this.codeSent = true;
            }
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
  }
  public forgotPass(value): void {
    this.forgotPassEvent.emit(value);
  }
}
