import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AppConfiguration } from '@schemas/app.interface';
import { UserInfoResponse } from '@schemas/auth.interface';
import { UserData } from '@schemas/user.interface';
import { AccountService } from '@services/account.service';
import { OfferService } from '@services/account/offer.service';
import { AppService } from '@services/app/app.service';
import { LoaderService } from '@services/app/loader.service';
import { MetaService } from '@services/app/meta.service';
import { UserService } from '@services/user.service';
import { ValidatorService } from '@services/validator.service';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { EMPTY, Observable, Subscription, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UniversalService } from '@services/universal.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  private updateFormSub$: Subscription = undefined;
  public accountFormGroup: FormGroup = {} as FormGroup;
  public countries: any = null;
  public currencies: any = null;
  public languages: any = null;
  public user: any;
  public errorMessage: string | null | undefined;
  public imageErrorMessage: string | null | undefined;
  public maxDate = new Date();
  public trashModel = false;
  public popUpHeading = '';
  public displayButton = true;
  public genders = [];
  public openToOffersOptions = [];
  public configurationId: any = '';
  public profileImage: { file: any; id?: string } = { file: null };
  public coverImage: { file: any; id?: string } = { file: null };
  public maxUploadFileSize: { fileSize: number } | null;
  private currentAppConfig: AppConfiguration;
  public baseUrl: string = environment.baseRemoteUrl;

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService,
    private userService: UserService,
    private accountService: AccountService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private validatorSvc: ValidatorService,
    private metaService: MetaService,
    public offerService: OfferService,
    private snackBarService: MatSnackBar,
    private translateService: TranslateService,
    private universalService: UniversalService
  ) {
    this.genders = [
      { id: '1', name: 'Male' },
      { id: '2', name: 'Female' },
    ];
    this.openToOffersOptions = [
      { label: 'YES', value: true },
      { label: 'NO', value: false },
    ];
    this.maxUploadFileSize = { fileSize: 10 };
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.loadData();
    this.metaService.getStaticPageMeta('account/account-details', '', 'My Details');
    this.offerService.setOfferGlobalStatus((await this.offerService.isGlobalOfferParamEnabled().toPromise()).data);
    this.currentAppConfig = this.appService.getAppConfigurationValue();
  }

  ngOnDestroy(): void {
    this.updateFormSub$?.unsubscribe();
  }

  public loadData(): void {
    this.accountService.getCurrencyList().subscribe(currencies => {
      this.currencies = currencies.filter(_ => ['EUR', 'USD', 'GBP', 'DKK', 'SEK'].includes(_.code));
    });

    this.accountService.getlanguageList().subscribe(languages => {
      this.languages = languages;
    });

    this.accountService.getCountriesReal().subscribe(({ countrylist }) => {
      this.countries = countrylist;
    });

    this.userService
      .getUserData()
      .pipe(
        switchMap((user: UserData | null) => {
          if (!user) {
            // prevents null exception
            return EMPTY;
          }

          this.user = user;

          this.accountFormGroup.patchValue({
            email: this.user.email,
            username: this.user.username,
            fname: this.user.first_name,
            lname: this.user.last_name,
            address: this.user.address,
            country_id: this.user.country_id,
            currency_id: this.user.currency_id,
            language_id: this.user.language_id,
            dob: this.user.dob,
            gender: this.user.gender,
            member_description: this.user.member_description,
          });

          return this.offerService.isUserOpenToOffers(user.id);
        })
      )
      .subscribe((isOpenToOfferResponse: ApiResponseModel<boolean>) =>
        this.accountFormGroup.patchValue({ openToOffers: isOpenToOfferResponse.data })
      );
  }

  public initForm(): void {
    this.accountFormGroup = this.formBuilder.group(
      {
        profile_image: [null],
        cover_image: [null],
        fname: ['', Validators.required],
        username: [
          '',
          Validators.compose([Validators.pattern('[a-zA-Z0-9.-]*'), Validators.required]),
          this.validatorSvc.validateUniqueUsername(),
        ],
        lname: ['', Validators.required],
        dob: ['', Validators.required],
        address: ['', Validators.required],
        country_id: ['', Validators.required],
        currency_id: [''],
        language_id: [''],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        openToOffers: [false, Validators.required],
        member_description: ['', Validators.maxLength(150)],
      },
      {
        validator: this.validatorSvc.validateNoWhitespace('username'),
      }
    );
  }

  public setAppConfig(): void {
    const chosenCurrency = this.currencies.find(curr => curr.id === this.accountFormGroup.get('currency_id').value);
    const language = this.appService.languages.find(x => x.id === this.accountFormGroup.get('language_id').value);
    const country = this.appService.countries.find(x => x.id === this.accountFormGroup.get('country_id').value);

    this.appService.setAppConfiguration({
      ...this.currentAppConfig,
      currencyID: chosenCurrency?.id,
      currencySymbol: chosenCurrency?.symbol,
      currencyCode: chosenCurrency?.code,
      languageID: language?.id,
      languageName: language?.name,
      languageShortName: language?.shortName,
      countryID: country?.id,
      countryName: country?.name,
    });

    const subdomain = this.appService.getCurrentSubDomain(null);

    if (this.appService.getLangIdOfSubDomain(subdomain) !== language?.id) {
      const subDomain = language?.shortName;
      let redirectUrl = '';
      let translatedUrl = null;

      if (!translatedUrl) {
        translatedUrl = this.universalService.getApplicationPathname(true);
      }

      if (subDomain === 'en') {
        redirectUrl = this.universalService.getApplicationProtocol() + environment.demainUrl + translatedUrl;
      }
      else {
        redirectUrl =
          this.universalService.getApplicationProtocol() + subDomain + '.' + environment.demainUrl + translatedUrl;
      }

      window.location.href = redirectUrl;
    }
  }

  public onSubmit(): void {
    if (this.accountFormGroup && !this.accountFormGroup.invalid) {
      this.spinnerService.show();

      const formValues = this.accountFormGroup.getRawValue();
      const formData = new FormData();

      for (const key in formValues) {
        if ((key == 'profile_image' || key == 'cover_image') && formValues[key] == null) {
          continue;
        }

        formData.append(key, formValues[key]);
      }

      formData.set('date_of_birth', this.datePipe.transform(formValues.dob, 'yyyy-MM-dd'));
      formData.append('city', this.user.city);
      formData.append('mobile_no', this.user.mobile_no);
      formData.append('phone_code', this.user.phone_code);
      formData.append('postal_code', this.user.postal_code);
      formData.append('shipped_from', this.user.shipped_from);
      formData.append('configuration', this.currentAppConfig?.configuration?.toString() || '');

      const user = this.userService.getUserData().getValue() as UserData;

      let updateForm$: Observable<any> = of({});

      if (this.offerService.getOfferGlobalStatus().getValue()) {
        updateForm$ = this.offerService.updateOpenToOffersParam(user.id, formValues.openToOffers);
      }

      updateForm$
        .pipe(
          concatMap(() => this.userService.updateSellerOnboardingData(formData)),
          concatMap(() => this.userService.getUserV2(user.id))
        )
        .subscribe(
          (response: UserInfoResponse) => {
            this.setAppConfig(); // Only update AppConfig if submit action was successful

            if (response.message === 'User Id exists.') {
              const responseUser: UserData = response.user['user'][0];

              this.userService.setUser(responseUser);
            }

            this.snackBarService.open('Record saved', 'x', { duration: 5000 });
            this.spinnerService.hide();
          },
          error => {
            this.snackBarService.open(error.message, 'x', { duration: 5000 });
            this.spinnerService.hide();
            this.errorMessage = error.message;
          }
        );
    }
  }

  public onImageChange(fileEvent: any | null, formControlName: string): void {
    this.imageErrorMessage = null;
    this.profileImage = { file: fileEvent };
    const data: any = {};

    data[formControlName] = fileEvent;
    this.accountFormGroup.patchValue(data);
  }

  public onCoverImageChange(fileEvent: any | null, formControlName: string): void {
    this.imageErrorMessage = null;
    this.coverImage = { file: fileEvent };
    const data: any = {};

    data[formControlName] = fileEvent;
    this.accountFormGroup.patchValue(data);
  }

  public showErrorMessage(errorType: 'update' | 'imageFileSize' | 'imageFileType', message?: string): void {
    let translatedMessage;

    if (!message) {
      if (errorType === 'imageFileSize') {
        translatedMessage = this.translateService.instant('ERRORS.FILE_SIZE_ERROR', this.maxUploadFileSize);
        this.imageErrorMessage = message ? message : translatedMessage;
      }
      else {
        translatedMessage = this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');
        this.errorMessage = message ? message : translatedMessage;
      }
    }
    else this.imageErrorMessage = message;
  }
}
