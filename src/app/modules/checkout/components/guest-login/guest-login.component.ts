import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '@services/user.service';
import { AuthResponseV2 } from '@schemas/auth.interface';
import { GuestLoginData, LoginData } from '@schemas/apis.interface';
import { SegmentService } from '@services/segment.service';
import { ValidatorService } from '@services/validator.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.scss'],
})
export class GuestLoginComponent implements OnInit {
  public guestLoginForm = new FormGroup({});
  public submitted = false;
  public rememberMeEror = false;
  public errorMessage: string | undefined | null;
  public successMessage: string | undefined | null;
  errorlist: any = '';
  @Output() loginEvent = new EventEmitter<boolean>();
  public recaptcha_site_key = environment.RECAPTCHA_SITE_KEY;
  @ViewChild('target')
  target: ElementRef;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private userService: UserService,
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
    return this.guestLoginForm as FormGroup;
  }

  private setupRegisterForm(): void {
    let validationRecaptcha;

    if (environment.name != 'dev') validationRecaptcha = Validators.required;

    this.guestLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recaptchaReactive: ['', validationRecaptcha],
    });
    this.guestLoginForm.get('recaptchaReactive').valueChanges.subscribe(x => {
      this.target.nativeElement.scrollIntoView();
    });
  }

  public onProcessRegister(): void {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.guestLoginForm.invalid) {
      this.rememberMeEror = false;
      const userData = { ...this.setUserData() } as GuestLoginData;

      this.SpinnerService.show();

      this.authService.guestLoginV2(userData).subscribe(
        (response: AuthResponseV2) => {
          this.segmentService.SignedUp(response.user.id, response.user.email, 'Checkout Flow');
          this.performLogin();
          this.segmentService.trackOnePageUser('Checkout Step Completed', {
            step: 1,
            step_name: 'Login',
            login_method: 'Email',
          });
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

  setUserData(): GuestLoginData {
    const userData = {
      ...this.guestLoginForm.getRawValue(),
      reg_type: 'guest',
    } as GuestLoginData;

    return userData;
  }

  performLogin() {
    const loginData = this.guestLoginForm.getRawValue() as LoginData;

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
}
