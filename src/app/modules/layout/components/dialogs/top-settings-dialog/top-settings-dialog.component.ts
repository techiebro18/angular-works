import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { AppConfiguration, AppResponse } from '@schemas/app.interface';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { UserInfoResponse } from '@schemas/auth.interface';
import { AuthService } from '@services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-settings-dialog',
  templateUrl: './top-settings-dialog.component.html',
  styleUrls: ['./top-settings-dialog.component.scss'],
})
export class TopSettingsDialogComponent implements OnInit {
  public countrySelectionData: Array<any> = [];
  public languageSelectionData: Array<any> = [];
  public currencySelectionData: Array<any> = [];

  public selectedCountry = 'United States';
  public selectedLanguage = 'English';
  public selectedCurrency = 'USD';

  public currencyId = 1;
  public languageId = 1;
  public countryId = 1;

  public configurationId: any = '';

  public configFormGroup: FormGroup = {} as FormGroup;
  public enableToSave = true;
  public currencies: string[] = ['EUR', 'USD', 'GBP', 'DKK', 'SEK'];

  constructor(
    public dialogRef: MatDialogRef<TopSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appService: AppService,
    public authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private universalService: UniversalService,
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // set selection options
    this.countrySelectionData = this.appService.countries;
    this.languageSelectionData = this.appService.languages;
    this.currencySelectionData = this.appService.currencies;

    const currentAppConfiguaration: AppConfiguration = this.appService.getAppConfigurationValue();

    if (currentAppConfiguaration != null) {
      this.selectedCurrency = currentAppConfiguaration.currencyCode;
      this.selectedLanguage = currentAppConfiguaration.languageName;
      this.selectedCountry = currentAppConfiguaration.countryName;
      this.currencyId = currentAppConfiguaration.currencyID;
      this.languageId = currentAppConfiguaration.languageID;
      this.countryId = currentAppConfiguaration.countryID;
    }

    this.configFormGroup = this.formBuilder.group({
      currency_id: [this.currencyId, [Validators.required]],
      language_id: [this.languageId, [Validators.required]],
      country_id: [this.countryId, [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      const keepCurrency = params['keepCurrency'];

      if (this.currencies.filter(x => x == keepCurrency)?.length > 0) this.enableToSave = false;
    });
  }

  onSubmit(): void {
    if (this.enableToSave) {
      const currentAppConfiguaration = this.appService.getAppConfigurationValue();
      const formData: FormData = this.setConfig(currentAppConfiguaration);

      this.updateConfigInfo(formData, currentAppConfiguaration);
    }
    else this.closeDialog();
  }

  setConfig(currentAppConfiguaration: AppConfiguration): FormData {
    if (currentAppConfiguaration == null) {
      this.configurationId = '';
    }
    else {
      this.configurationId = currentAppConfiguaration.configuration || '';
    }

    const formData = new FormData();

    for (const key in this.configFormGroup.value) {
      formData.append(key, this.configFormGroup.value[key]);
    }

    formData.append('configuration', this.configurationId);
    formData.append('returnurl', this.universalService.getApplicationPathname(true));

    if (localStorage.getItem('cart') != null) {
      const update = [];
      const cart = JSON.parse(localStorage.getItem('cart') as string);

      for (let i = 0; i < cart.length; i++) {
        const item = JSON.parse(cart[i]);

        update.push(item.id);
      }

      formData.append('view_card_data', JSON.stringify(update));
    }

    return formData;
  }

  updateConfigInfo(formData: FormData, currentAppConfiguaration: AppConfiguration) {
    const appConfig = {
      currencyID: this.configFormGroup.value.currency_id,
      currencyCode:
        this.currencySelectionData.find(x => x.id === this.configFormGroup.value.currency_id)?.name || 'EUR',
      currencySymbol:
        this.currencySelectionData.find(x => x.id === this.configFormGroup.value.currency_id)?.symbol || '€',
      languageID: this.configFormGroup.value.language_id,
      languageName:
        this.languageSelectionData.find(x => x.id === this.configFormGroup.value.language_id)?.name || 'English(US)',
      languageShortName:
        this.languageSelectionData.find(x => x.id === this.configFormGroup.value.language_id)?.shortName || 'en',
      countryID: this.configFormGroup.value.country_id || 1,
      countryName:
        this.countrySelectionData.find(x => x.id === this.configFormGroup.value.country_id)?.name || 'United States',
    } as AppConfiguration;

    this.appService.setAppConfiguration(appConfig);

    /**
     *  UPDATE USER INFOS
     *
     */

    const user = this.userService.getUserData().getValue();

    if (user && user.username) {
      const userDataToUpdate = {
        ...user,
        fname: user.first_name,
        countryId: user.country_id,
        lname: user.last_name,
        currency_id: appConfig.currencyID,
      };

      this.userService.updateUserInfo(user.id, userDataToUpdate).subscribe(() => {
        this.userService.getUserV2(user.id).subscribe((responseData: UserInfoResponse) => {
          if (responseData.message === 'User Id exists.') {
            const userData: UserData = responseData.user['user'][0];

            this.userService.setUser(userData);
          }
        });
      });
    }

    if (this.universalService.isBrowser) {
      const subdomain = this.appService.getCurrentSubDomain(null);

      // in case of the language has changed, a redirect is necessary because of the subdomain rule
      if (this.appService.getLangIdOfSubDomain(subdomain) !== this.configFormGroup.get('language_id').value) {
        this.spinnerService.show();
        this.appService.getTranslatedUrl(formData).subscribe((data: AppResponse) => {
          const subDomain = appConfig.languageShortName;
          let redirectUrl = '';
          let translatedUrl = data.config?.translatedUrl;

          if (!translatedUrl) {
            translatedUrl = this.universalService.getApplicationPathname(true);
          }

          if (subDomain === 'en') {
            redirectUrl = this.universalService.getApplicationProtocol() + environment.demainUrl + translatedUrl;
          }
          else {
            redirectUrl
              = this.universalService.getApplicationProtocol() + subDomain + '.' + environment.demainUrl + translatedUrl;
          }

          window.location.href = redirectUrl;
        });
      }
    }

    this.closeDialog();
  }

  /**
   * Update settings popup and form , when ever settings changes
   */
  updateconfigDetails(fullConfigObject: AppConfiguration): void {
    this.selectedCurrency = fullConfigObject.currencyCode;
    this.selectedLanguage = fullConfigObject.languageName;
    this.selectedCountry = fullConfigObject.countryName;
    this.currencyId = fullConfigObject.currencyID;
    this.languageId = fullConfigObject.languageID;
    this.countryId = fullConfigObject.countryID;

    this.configFormGroup.patchValue({
      currency_id: this.currencyId,
      language_id: this.languageId,
      country_id: this.countryId,
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
