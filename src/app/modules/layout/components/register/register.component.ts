import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { BrazeData, RegisterData } from '@schemas/apis.interface';
import { AuthResponseV2 } from '@schemas/auth.interface';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { GuestService } from '@services/user/guest.service';
import { ValidatorService } from '@services/validator.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public recaptcha_site_key = environment.RECAPTCHA_SITE_KEY;

  public emailForm: FormGroup;
  public incorrectEmail = false;
  public emailSubmitted = false;

  public registrationForm: FormGroup;
  public incorrectCredentials = false;
  emailErrorMessage: string;
  public isFirstSection = true;
  applyWishlistData = { status: false, productID: '', hit: '' };
  public submitted = false;
  @Input() prdImage;
  @Input() location;
  @Input() isWishlistReg;
  @Output() registered = new EventEmitter();
  isWishlist: boolean;
  @Output() onShowLogin = new EventEmitter();
  @ViewChild('target')
  target: ElementRef;
  isGuestUser = false;
  guestMessage: string;
  userId: number;
  validationRecaptcha: any;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public _productService: ProductService,
    private spinner: NgxSpinnerService,
    private segmentService: SegmentService,
    private validatorSvc: ValidatorService,
    private guestService: GuestService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    if (environment.name != 'dev') this.validationRecaptcha = Validators.required;

    this.registrationForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: [
        '',
        Validators.compose([Validators.pattern('[a-zA-Z0-9.]*'), Validators.required]),
        this.validatorSvc.validatExistsUsername(),
      ],
      recaptchaReactive: ['', this.validationRecaptcha],
      news_letter: [true],
    });
    this.isWishlist = this.isWishlistReg;

    this.registrationForm.get('recaptchaReactive').valueChanges.subscribe(x => {
      this.target.nativeElement.scrollIntoView();
    });
  }

  get email() {
    return this.emailForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get validationCode() {
    return this.registrationForm.get('validationCode');
  }
  updateNewsLetterValue() {
    // console.log("updateNewsLetterValue"+ this.registrationForm.get('news_letter').value);
  }

  shownext() {
    this.incorrectEmail = false;
    this.emailSubmitted = true;

    // stop here if form is invalid
    if (this.emailForm.invalid) {
      return;
    }

    this.spinner.show();
    this.authService.isUserExists(this.email.value).subscribe(
      data => {
        // user exists already, show error msg
        this.incorrectEmail = true;
        this.emailErrorMessage = 'This email is already register';
        this.spinner.hide();
      },
      error => {
        if (error.message == 'The given data was invalid.') {
          // invalid email, show error msg
          this.incorrectEmail = true;
          this.emailErrorMessage = 'Please enter a valid email';
        }
        else {
          // no user with given email,, continue
          this.authService.isGuestUser(this.email.value).subscribe(guestUser => {
            if (guestUser && guestUser.is_guest_user) {
              this.guestUserForm();
              this.isGuestUser = true;
              this.userId = guestUser.user.id;
              this.guestService.getValidationCode(this.email.value).subscribe(response => {
                this.guestMessage = response.message;
                this.incorrectEmail = false;
                this.isFirstSection = false;
                this.emailErrorMessage = '';
                this.spinner.hide();
              });
            }
            else {
              this.incorrectEmail = false;
              this.isFirstSection = false;
              this.emailErrorMessage = '';
              this.spinner.hide();
            }
          });
        }
      }
    );
  }

  guestUserForm() {
    this.registrationForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: [
        '',
        Validators.compose([Validators.pattern('[a-zA-Z0-9.]*'), Validators.required]),
        this.validatorSvc.validatExistsUsername(),
      ],
      recaptchaReactive: ['', this.validationRecaptcha],
      news_letter: [true],
      validationCode: ['', Validators.required],
    });
  }

  registerSubmit() {
    // stop here if form is invalid
    if (this.registrationForm.invalid || this.emailForm.invalid) {
      // console.log('One of forms is invalid');
      return;
    }

    const registerData = {
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      news_letter: this.registrationForm.get('news_letter')
        ? '1'
        : '0',
    } as RegisterData;

    if (!this.isGuestUser) this.registerUser(registerData);
    else this.registerGuestUser(registerData);
  }

  registerGuestUser(registerData: RegisterData) {
    this.spinner.show();
    registerData.validation_code = this.validationCode.value;

    this.guestService.update(registerData).subscribe((data: AuthResponseV2) => {
      this.authService.setLoggedIn(true);
      this.registered.emit();
      this.segmentService.identifyOnePageUser(registerData);
      this.segmentService.SignedUp(data.user.id, data.user.email, this.location);
      this.spinner.hide();
    });
  }

  registerUser(registerData: RegisterData) {
    this.spinner.show();

    this.authService.registerV2(registerData).subscribe(
      (response: AuthResponseV2) => {
        this.spinner.hide();
        // successfully Register .. close popup
        this._productService.applyWishlistObservable.subscribe(data => {
          if (data !== undefined && data !== null) {
            if (data.status == true && data.productID != null) {
              this._productService.addToWishList(data.productID, response.user.id, data.hit);
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
        this.registered.emit();
        this.segmentService.identifyOnePageUser(registerData);
        this.segmentService.SignedUp(response.user.id, response.user.email, this.location);

        if (registerData.news_letter === '1')
          setTimeout(() => this.authService.addBrazeGroups(response.user.id), 15000);
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  showLogin() {
    this.onShowLogin.emit();
  }

  onSocialLoggedIn() {
    this.registered.emit();
  }
}
