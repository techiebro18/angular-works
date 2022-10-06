import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaService } from '@services/app/meta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApprovalService } from '@services/product-approval.service';
import { ProductService } from '@services/product.service';
import { StripeBankAccount } from '@shared/models/stripe-bank-account.interface';
import { StripeService } from '@services/stripe.service';
import { EMPTY, concatMap, firstValueFrom } from 'rxjs';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import { specialCharValidator } from '@shared/utils/special-char-validation';
import { CountryMapping } from '@shared/models/country-mapping.interface';
import { Currency } from '@schemas/app.interface';
import { DialogService } from '@services/app/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { UserInfoResponse } from '@schemas/auth.interface';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-get-paid',
  templateUrl: './get-paid.component.html',
  styleUrls: ['./get-paid.component.scss'],
})
@AutoUnsubscribe()
export class GetPaidComponent implements OnInit, OnDestroy {
  public firstFormGroup: FormGroup = {} as FormGroup;
  public bankAccountsFormGroup: FormGroup = {} as FormGroup;
  public countries: CountryMapping[] = [];
  public currencies: Currency[] = [];
  public user: any;
  public submitted = false;
  public errorMessage: string | null | undefined;
  public showFormOne = true;
  public showFormTwo = false;
  public countryPhoneCodes: any;
  public trashModel = false;
  public maxDate = new Date();
  public selectedPhoneCode = 0;
  public bankError = false;
  public bankAccounts: StripeBankAccount[] = [];
  public shouldShowNoBankAccountWarning = false;

  constructor(
    private formBuilder: FormBuilder,
    private productApprovalService: ProductApprovalService,
    private userService: UserService,
    private stripeService: StripeService,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private metaService: MetaService,
    private snackbar: MatSnackBar,
    private dialogService: DialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('account/get-paid', '', 'Get Paid');
    this.createForms();
    this.loadData();
  }

  ngOnDestroy(): void {}

  loadData(): void {
    this.productService.getCurrencies().subscribe(response => (this.currencies = response));

    this.productApprovalService
      .getCountriesApiV2('EU')
      .subscribe(response => (this.countries = response.countryMappinglist));

    const loggedUserId = this.userService.getUserData().getValue().id;

    this.userService.getUserV2(loggedUserId).subscribe((data: UserInfoResponse) => {
      this.user = data.user.user[0];
      this.selectedPhoneCode = this.user.phone_code;
      this.firstFormGroup.patchValue({
        shipped_from: this.user.shipped_from,
        email: this.user.email,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        mobile_no: this.user.mobile_no,
        address: this.user.address,
        city: this.user.city,
        state: this.user.state,
        pin_code: this.user.pin_code,
        country_id: this.user.country_id,
        postal_code: this.user.postal_code,
        date_of_birth: this.user.dob,
        phone_code: this.user.phone_code,
      });
      this.loadStripeBankAccounts(this.user);
    });
  }

  private loadStripeBankAccounts(user: UserData, showSpinner = true) {
    if (showSpinner) this.spinner.show();

    this.stripeService.listStripeBankAccounts(user.id).subscribe((responseData: ListStripBankAccountsResponse) => {
      this.bankAccounts = responseData?.data?.reverse() || [];
      this.spinner.hide();

      if (this.bankAccounts.length > 0) {
        this.userService.getCurrentUserVerificationInformation().subscribe(response => {
          if (response['verification_required']) {
            this.router.navigate(['/sellers/product-add/verify-account'], {
              queryParams: { returnUrl: '/account/get-paid' },
            });
          }

          this.spinner.hide();
        });
      }
    });
  }

  get bankAccountFormInputs(): FormArray {
    return this.bankAccountsFormGroup.controls['bankAccountsFormArray'] as FormArray;
  }

  createForms(): void {
    this.userService.getallCountryPhoneCode().subscribe(countryPhoneCodes => {
      this.countryPhoneCodes = countryPhoneCodes;
    });

    this.firstFormGroup = this.formBuilder.group({
      shipped_from: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{6,}$')]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required],
      country_id: ['', Validators.required],
      state: [''],
      city: ['', [Validators.required, specialCharValidator()]],
      postal_code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_code: ['', Validators.required],
    });

    this.bankAccountsFormGroup = this.formBuilder.group({
      bankAccountsFormArray: this.formBuilder.array([]),
    });
  }

  async submitData(): Promise<void> {
    if (this.bankAccounts.length === 0) {
      this.shouldShowNoBankAccountWarning = true;

      return null;
    }

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (this.firstFormGroup && !this.firstFormGroup.invalid) {
      this.spinner.show();
      const formData = this.firstFormGroup.getRawValue();
      const userSnapshot: UserData = this.userService.getUserData().getValue();
      const userInfoResponse: UserInfoResponse = await firstValueFrom(this.userService.getUserV2(userSnapshot.id));
      const user: UserData = userInfoResponse?.user?.user[0] || userSnapshot;
      const userData = { ...user, ...formData };

      // If the user does not already have a Stripe account, a new one will be automatically created in the back-end.
      this.userService.updateGetPaid_V2(user.id, userData).subscribe({
        next: (response: UpdateGetPaidV2Response) => {
          this.handleUpdateGetPaidV2SuccessResponse(response);
        },
        error: (response: any) => {
          this.spinner.hide();
          this.errorMessage = response.message;
          this.bankError = response.param === 'bank_account[account_number]';

          if (!this.bankError) {
            this.snackbar.open(this.errorMessage, 'x', { duration: 5000 });
          }
        },
      });
    }
  }

  private handleUpdateGetPaidV2SuccessResponse(response: UpdateGetPaidV2Response) {
    this.shouldShowNoBankAccountWarning = false;
    this.snackbar.dismiss();
    const reqType = parseInt(this.route.snapshot.paramMap.get('req_type'));
    const orderId = parseInt(this.route.snapshot.paramMap.get('order_id'));

    if (reqType !== undefined && reqType !== null && !Number.isNaN(orderId)) {
      this.router.navigate(['account/order-detail/' + orderId]);
    }
    else {
      const userData: UserData = response.data;

      this.userService.setUser(userData);
      this.snackbar.open(response.message, 'x', { duration: 5000 });
    }

    this.spinner.hide();
  }

  toggleFormOne(view: string = null): void {
    this.showFormOne = view !== 'hide';
  }

  toggleFormTwo(view: string = null): void {
    this.showFormTwo = view !== 'hide';
  }

  keyPressAlphanumeric(event): boolean {
    const inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9\s]/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();

      return false;
    }
  }

  async saveNewBankAccount(bankAccountForm: any, formIndex: number): Promise<void> {
    const bank_country_id = bankAccountForm.get('bank_country_id').value;
    const iban = bankAccountForm.get('bank_account_number').value;

    this.spinner.show('spinner_bank_account_input_' + formIndex);

    if (this.bankAccounts.length === 0) {
      const formData = this.firstFormGroup.getRawValue();
      const userSnapshot: UserData = this.userService.getUserData().getValue();
      const userInfoResponse: UserInfoResponse = await firstValueFrom(this.userService.getUserV2(userSnapshot.id));
      const user: UserData = userInfoResponse?.user?.user[0] || userSnapshot;
      const userData = { ...user, ...formData };

      this.userService
        .updateGetPaid_V2(user.id, userData)
        .pipe(
          catchError(error => {
            this.spinner.hide();
            this.errorMessage = error.message;
            this.bankError = error.param === 'bank_account[account_number]';

            if (!this.bankError) {
              this.snackbar.open(this.errorMessage, 'x', { duration: 5000 });
            }

            return EMPTY;
          }),
          concatMap(updateGetPaidV2Response => {
            this.handleUpdateGetPaidV2SuccessResponse(updateGetPaidV2Response);

            return this.stripeService.addStripeBankAccount(this.user.id, iban, bank_country_id);
          })
        )
        .subscribe({
          next: response => {
            this.handleAddStripeBankAccountResponseSuccess(response, formIndex);
          },
          error: response => {
            this.handleAddStripeBankAccountResponseError(response, formIndex);
          },
        });
    }
    else {
      this.stripeService.addStripeBankAccount(this.user.id, iban, bank_country_id).subscribe({
        next: (response: AddStripeBankAccountResponse) => {
          this.handleAddStripeBankAccountResponseSuccess(response, formIndex);
        },
        error: response => {
          this.handleAddStripeBankAccountResponseError(response, formIndex);
        },
      });
    }
  }

  private handleAddStripeBankAccountResponseError(response, formIndex: number) {
    this.snackbar.open(response.message, 'x', { duration: 5000 });
    this.spinner.hide('spinner_bank_account_input_' + formIndex);
  }

  private handleAddStripeBankAccountResponseSuccess(response, formIndex: number) {
    this.snackbar.open(response.message, 'x', { duration: 5000 });
    this.shouldShowNoBankAccountWarning = false;
    this.loadData();
    this.bankAccountFormInputs.removeAt(formIndex);
    this.spinner.hide('spinner_bank_account_input_' + formIndex);
  }

  setStripeDefaultBankAccount(bankAccount: StripeBankAccount, formIndex: number): void {
    if (this.shouldDisableStripeActionButtons(bankAccount)) return null;

    this.dialogService.openTvbDialog({
      title: 'Confirmation',
      messages: [
        `Are you sure you want to set the Bank Account ${bankAccount.metadata.iban}
        as Default for currency ${bankAccount.currency}?`,
      ],
      showActionButtons: true,
    });

    this.dialogService.confirmedTvbDialog().subscribe(confirmed => {
      if (confirmed) {
        this.spinner.show('spinner_bank_account_' + formIndex);
        this.stripeService
          .setStripeDefaultBankAccount(bankAccount.id)
          .subscribe((response: ApiResponseModel<string>) => {
            this.loadStripeBankAccounts(this.user, false);
            this.spinner.hide('spinner_bank_account_' + formIndex);
            this.snackbar.open(response.message, 'x', { duration: 5000 });
          });
      }
    });
  }

  deleteStripeBankAccount(bankAccount: StripeBankAccount, formIndex: number): void {
    if (this.shouldDisableStripeActionButtons(bankAccount)) return null;

    this.dialogService.openTvbDialog({
      title: 'Confirmation',
      messages: [`Are you sure you want to DELETE the Bank Account ${bankAccount.metadata.iban}?`],
      showActionButtons: true,
    });

    this.dialogService.confirmedTvbDialog().subscribe(confirmed => {
      if (confirmed) {
        this.spinner.show('spinner_bank_account_' + formIndex);
        this.stripeService.deleteStripeBankAccount(bankAccount.id).subscribe({
          next: (response: ApiResponseModel<string>) => {
            this.loadStripeBankAccounts(this.user, false);
            this.spinner.hide('spinner_bank_account_' + formIndex);
            this.snackbar.open(response.message, 'x', { duration: 5000 });
          },
          error: (response: ApiResponseModel<string>) => {
            this.spinner.hide('spinner_bank_account_' + formIndex);
            this.snackbar.open(response.message, 'x', { duration: 60000 });
          },
        });
      }
    });
  }

  addNewBankAccountFormSection(): void {
    this.bankAccountFormInputs.push(
      this.formBuilder.group({
        bank_country_id: ['', Validators.required],
        bank_account_number: ['', Validators.required],
      })
    );
  }

  deleteNewBankAccountFormSection(formIndex: number): void {
    this.bankAccountFormInputs.removeAt(formIndex);
  }

  getAsValidFormGroup(bankAccountForm: AbstractControl): FormGroup {
    return bankAccountForm as FormGroup;
  }

  getCountryLabel(country_id: number): string {
    return this.countries.find((c: CountryMapping) => c.country.id == country_id).country.sortname;
  }

  shouldDisableStripeActionButtons(bankAccount: StripeBankAccount): boolean {
    return this.bankAccounts.length == 1 ? true : bankAccount.default_for_currency;
  }
}

interface ListStripBankAccountsResponse {
  count: number;
  data: StripeBankAccount[];
}

interface UpdateGetPaidV2Response {
  status: string;
  message: string;
  verification_required: boolean;
  data: UserData;
}

interface AddStripeBankAccountResponse {
  data: {
    stripe_bank_account_id: string;
  };
  message: string;
}
