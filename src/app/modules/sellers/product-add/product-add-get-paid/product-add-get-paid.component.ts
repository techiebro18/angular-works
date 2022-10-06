import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@schemas/user.interface';
import { ProductApprovalService } from '@services/product-approval.service';
import { UserService } from '@services/user.service';
import { ProductService } from '@services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@services/app/meta.service';
import { ProductAddStepsEnum } from '../product-add.component';
import { StepsService } from '@services/app/steps.service';
import { SegmentProductUploadStatusEnum, SegmentProductUploadStepNameEnum } from '@shared/enums/segment.enum';
import { SegmentService } from '@services/segment.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ScreenDetectorService } from '@services/app/screen-detector.service';
import { TranslateService } from '@ngx-translate/core';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-add-get-paid',
  templateUrl: './product-add-get-paid.component.html',
  styleUrls: ['./product-add-get-paid.component.scss'],
})
export class ProductAddGetPaidComponent implements OnInit, OnDestroy {
  private productId: string = undefined;
  public getPaidForm: FormGroup | undefined;
  public submitted = false;
  public countries: any[] = [];
  public currencies: any[] = [];
  public countryPhoneCodes: any[] = [];
  public user: UserData | any;
  public maxDate = new Date();
  public errorMessage: string;
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private updateGetPaidUserSub$: Subscription;
  private updateUserSub$: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private productApprovalService: ProductApprovalService,
    private userService: UserService,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private metaService: MetaService,
    private stepsService: StepsService,
    private segmentService: SegmentService,
    private screenDetectorService: ScreenDetectorService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isMobile$ = this.screenDetectorService.isMobile;
    this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.GET_PAID);
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.GET_PAID);
    this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.GET_PAID);
    this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.INFO);
    this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.INFO);
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.INFO);
    this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.PICTURES);
    this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.PICTURES);
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.PICTURES);
    this.stepsService.unmarkIndexAsAvailable(ProductAddStepsEnum.SUMMARY);
    this.stepsService.markIndexAsDisabled(ProductAddStepsEnum.SUMMARY);
    this.stepsService.broadcastModelChanges();
    this.segmentService.track(SegmentProductUploadStatusEnum.STARTED, {
      step: 3,
      step_name: SegmentProductUploadStepNameEnum.STEP_3,
    });
    this.setupForm();
    this.loadData();

    this.productId = this.route.snapshot.paramMap.get('id');
    this.stepsService.setStashItem('productApprovalId', this.productId);
  }

  public ngOnDestroy(): void {
    this.updateGetPaidUserSub$?.unsubscribe();
    this.updateUserSub$?.unsubscribe();
  }

  public loadData(): void {
    this.userService
      .getallCountryPhoneCode()
      .subscribe(countryPhoneCodes => (this.countryPhoneCodes = countryPhoneCodes));
    this.productService.getCurrencies().subscribe(currencies => (this.currencies = currencies));
    this.productApprovalService.getCountries('EU').subscribe(countries => (this.countries = countries));
    this.userService.getUserData().subscribe((user: UserData | null) => {
      this.user = user;
      this.getPaidForm.patchValue({
        shipped_from: this.user.shipped_from,
        email: this.user.email,
        fname: this.user.first_name,
        lname: this.user.last_name,
        mobile_no: this.user.mobile_no,
        address: this.user.address,
        city: this.user.city,
        state: this.user.state,
        pinCode: this.user.pin_code,
        country_id: this.user.country_id,
        postal_code: this.user.postal_code,
        date_of_birth: this.user.dob,
        phone_code: this.user.phone_code,
        bank_country: this.user.bank_country,
        bank_account_number: this.user.bank_account_number,
      });

      this.user.connected_stripe_id
        ? this.getPaidForm.get('bank_account_number').disable()
        : this.getPaidForm.get('bank_account_number').enable();
    });
  }

  public setupForm(): void {
    this.getPaidForm = this.formBuilder.group({
      shipped_from: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{6,}$')]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required],
      country_id: ['', Validators.required],
      state: [''],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone_code: ['', Validators.required],
      bank_country: [''],
      bank_account_number: [''],
    });
  }

  public submitForm(): void {
    this.submitted = true;
    this.hideErrorMessage();

    if (this.getPaidForm && !this.getPaidForm.invalid) {
      this.spinnerService.show();

      const dataForm = this.getPaidForm.getRawValue();
      const requestPayload = {
        ...dataForm,
        bank_country: !dataForm.bank_country
          ? 0
          : dataForm.bank_country,
      };

      this.updateUserSub$ = this.userService
        .updateSellerOnboardingData(requestPayload)
        .pipe(concatMap(() => this.userService.getUserV2(this.user.id)))
        .subscribe(
          response => {
            if (response.message === 'User Id exists.') {
              const responseUser: UserData = response.user.user[0];

              this.userService.setUser(responseUser);
              this.spinnerService.hide();
              this.prepareStepsForNextStep();
              this.notifySegmentCompletedStep();
              this.router.navigate([`/sellers/product-add/summary/${this.productId}`]);
            }
            else {
              this.showErrorMessage(
                'The user you are trying to update does not exist or its data is corrupted. Please contact the support team or try again later.'
              );
            }
          },
          error => {
            this.spinnerService.hide();
            this.showErrorMessage(error.message);
          }
        );
    }
  }

  private notifySegmentCompletedStep(): void {
    this.segmentService.track(SegmentProductUploadStatusEnum.STEP_COMPLETED, {
      step_name: SegmentProductUploadStepNameEnum.STEP_3,
      step: 3,
    });
  }

  private prepareStepsForNextStep(): void {
    this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.GET_PAID);
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.GET_PAID);
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.SUMMARY);
    this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.SUMMARY);
    this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.SUMMARY);
    this.stepsService.broadcastModelChanges();
  }

  private hideErrorMessage(): void {
    if (this.errorMessage) {
      this.errorMessage = null;
    }
  }

  private showErrorMessage(message?: string): void {
    let translatedMessage;

    if (!message) {
      translatedMessage = this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');
    }

    this.errorMessage = message
      ? message
      : translatedMessage;
  }

  public isReadyForNextStep(): boolean {
    return this.getPaidForm.valid;
  }

  public keyPressAlphanumeric(event) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9\s]/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();

      return false;
    }
  }
}
