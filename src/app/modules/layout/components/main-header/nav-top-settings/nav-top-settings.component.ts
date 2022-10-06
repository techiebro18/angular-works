import { Component, Inject, OnInit } from '@angular/core';
import { AppConfiguration } from '@schemas/app.interface';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { TopSettingsDialogComponent } from '../../dialogs/top-settings-dialog/top-settings-dialog.component';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav-top-settings',
  templateUrl: './nav-top-settings.component.html',
  styleUrls: ['./nav-top-settings.component.scss'],
})
export class NavTopSettingsComponent implements OnInit {
  public selectedCountry = 'United States';
  public selectedLanguage = 'English';
  public selectedCurrency = 'USD';
  public currency_id = 1;
  public language_id = 1;
  public country_id = 1;

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private userService: UserService,
    private dialogService: DialogService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const currentAppConfiguration: AppConfiguration = this.appService.getAppConfigurationValue();

    if (currentAppConfiguration != null) {
      this.selectedCurrency = currentAppConfiguration.currencyCode;
      this.selectedLanguage = currentAppConfiguration.languageName;
      this.selectedCountry = currentAppConfiguration.countryName;
      this.currency_id = currentAppConfiguration.currencyID;
      this.language_id = currentAppConfiguration.languageID;
      this.country_id = currentAppConfiguration.countryID;
    }

    this.appService.getAppConfigurationObservable().subscribe((appConfig: AppConfiguration | null) => {
      if (appConfig != null) {
        this.updateconfigDetails(appConfig);
      }
    });
    //Set HTML lang attribute value
    this.document.documentElement.lang = this.getLanguageAttribute(currentAppConfiguration);
  }

  /**
   * Updates settings popup and form, when ever settings changes
   *
   */
  updateconfigDetails(fullConfigObject: AppConfiguration): void {
    this.selectedCurrency = fullConfigObject.currencyCode;
    this.selectedLanguage = fullConfigObject.languageName;
    this.selectedCountry = fullConfigObject.countryName;
    this.currency_id = fullConfigObject.currencyID;
    this.language_id = fullConfigObject.languageID;
    this.country_id = fullConfigObject.countryID;
  }

  public openSettingPopup(): void {
    this.dialogService.open(TopSettingsDialogComponent, {
      isDefaultDialog: true,
      isWithHeader: false,
    });
  }

  public getLanguageAttribute(currentAppConfiguration) {
    let langCode = '';

    switch (currentAppConfiguration.languageShortName) {
      case 'dk':
        langCode = 'da';
        break;
      case 'se':
        langCode = 'sv';
        break;
      case 'uk':
        langCode = 'en-GB';
        break;
      default:
        langCode = currentAppConfiguration.languageShortName;
    }


    return langCode;
  }
}
