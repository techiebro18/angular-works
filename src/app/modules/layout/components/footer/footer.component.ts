import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '@services/app/app.service';
import { AppConfiguration } from '@schemas/app.interface';
import { environment } from '@environments/environment';
import { UniversalService } from '@services/universal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BecameProSellerComponent } from '../dialogs/became-pro-seller/became-pro-seller.component';
import { DialogService } from '@services/app/dialog.service';
import { NewsletterData } from '@schemas/apis.interface';
import { UserService } from '@services/user.service';
import { CurrencyCodeEnum, CurrencyIdEnum, CurrencySymbolEnum } from '@shared/enums/currency.enum';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface FooterItemListModel {
  routerLink: string;
  translationKey: string;
}

interface LanguageModel {
  id: number;
  name: string;
  code: string;
}

interface SocialMediaIconModel {
  name: string;
  filePath: string;
  externalLink: string;
}

@Component({
  selector: 'tvb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  private appConfig: AppConfiguration;
  newsletterForm: FormGroup;
  currentDate: number = new Date().getFullYear();
  columnOneItemList: FooterItemListModel[] = [];
  columnTwoItemList: FooterItemListModel[] = [];
  socialMediaIconList: SocialMediaIconModel[] = [];
  languageList: LanguageModel[] = [];
  currentLanguage: LanguageModel = undefined;
  showNewsletterSuccessMessage = false;
  showNewsletterErrorMessage = false;
  uniqueUserId: string = null;
  urlSafe: SafeResourceUrl;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private universalService: UniversalService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private userService: UserService,
    private cookieService: CookieService,
    public sanitizer: DomSanitizer
  ) {}

  get email() {
    return this.newsletterForm.get('email');
  }

  ngOnInit(): void {
    this.columnOneItemList = [
      { routerLink: '/how-it-works', translationKey: 'footer.company.how_it_works' },
      { routerLink: '/careers', translationKey: 'footer.company.careers' },
    ];

    this.columnTwoItemList = [
      { routerLink: '/customer-care', translationKey: 'footer.help.community' },
      { routerLink: '/delivery', translationKey: 'footer.help.delivery' },
      { routerLink: '/faq', translationKey: 'footer.help.faq' },
      { routerLink: '/account/account-details', translationKey: 'footer.help.my_account' },
      { routerLink: '/privacy-policy', translationKey: 'footer.help.privacy' },
      { routerLink: '/returns', translationKey: 'footer.help.returns' },
      { routerLink: '/terms-and-conditions', translationKey: 'footer.help.terms' },
    ];

    this.languageList = [
      { id: 1, name: 'English(US)', code: 'en' },
      { id: 126, name: 'English(UK)', code: 'uk' },
      { id: 22, name: 'Danish', code: 'dk' },
      { id: 23, name: 'German', code: 'de' },
      { id: 111, name: 'Swedish', code: 'se' },
      { id: 136, name: 'French', code: 'fr' },
      { id: 137, name: 'Spanish', code: 'es' },
      { id: 138, name: 'Italian', code: 'it' },
    ];

    this.socialMediaIconList = [
      {
        name: 'Instagram',
        filePath: 'assets/images/icons/instagram.svg',
        externalLink: 'https://www.instagram.com/the_vintage_bar/',
      },
      {
        name: 'TikTok',
        filePath: 'assets/images/icons/tiktok.svg',
        externalLink: 'https://www.tiktok.com/@thevintagebar',
      },
      {
        name: 'Pinterest',
        filePath: 'assets/images/icons/pinterest.svg',
        externalLink: 'https://www.pinterest.dk/thevintagebar/',
      },
    ];

    this.loadLanguage();

    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    //Set User Id to track in RTB House
    this.setRtbHouseUserId();
  }

  submitNewsletterForm(): void {
    this.showNewsletterSuccessMessage = false;
    this.showNewsletterErrorMessage = false;

    if (this.newsletterForm.invalid) {
      this.showNewsletterErrorMessage = true;

      return;
    }

    this.spinner.show();

    const newsletterData = this.newsletterForm.getRawValue() as NewsletterData;

    this.userService.softRegister(newsletterData).subscribe(
      () => {
        this.newsletterForm.reset();
        this.showNewsletterSuccessMessage = true;
        this.showNewsletterErrorMessage = false;
        this.spinner.hide();
      },
      () => {
        this.userService.newsletterSubscribe(newsletterData).subscribe(
          () => {
            this.newsletterForm.reset();
            this.showNewsletterSuccessMessage = true;
            this.showNewsletterErrorMessage = false;
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    );
  }

  loadLanguage() {
    this.appService.getAppConfigurationBehavior().subscribe(data => {
      const languageId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.LANGUAGE_ID) ?? data?.languageID?.toString();

      if (languageId != null) {
        this.currentLanguage = this.languageList.find(_ => _.id === parseInt(languageId));
      }
      else {
        // set language based on current subdomain
        const subdomain = this.appService.getCurrentSubDomain(null);

        this.currentLanguage = this.languageList.find(_ => _.id === this.appService.getLangIdOfSubDomain(subdomain));
      }
    });
  }

  loadLanguageListFooter() {
    this.languageList = [
      { id: 1, name: 'English(US)', code: 'en' },
      { id: 126, name: 'English(UK)', code: 'uk' },
      { id: 22, name: 'Danish', code: 'dk' },
      { id: 23, name: 'German', code: 'de' },
      { id: 111, name: 'Swedish', code: 'se' },
      { id: 136, name: 'French', code: 'fr' },
      { id: 137, name: 'Spanish', code: 'es' },
      { id: 138, name: 'Italian', code: 'it' },
    ];
  }

  setLanguage(selectedLangId: number) {
    if (selectedLangId === this.currentLanguage.id) return;

    this.appConfig = this.appService.getAppConfigurationValue();

    const formData = new FormData();

    formData.append('returnurl', this.universalService.getApplicationPathname(true));
    formData.append('language_id', selectedLangId?.toString());

    const appConfig = {
      currencyID: this.appConfig?.currencyID || CurrencyIdEnum.EUR,
      currencyCode: this.appConfig?.currencyCode || CurrencyCodeEnum.EUR,
      languageID: selectedLangId,
      languageName: this.languageList.find(x => x.id === selectedLangId).name,
      languageShortName: this.languageList.find(x => x.id === selectedLangId).code,
      countryID: this.appConfig?.countryID,
      countryName: this.appConfig?.countryName,
    } as AppConfiguration;

    this.appService.setAppConfiguration(appConfig);

    if (this.universalService.isBrowser) {
      const subdomain = this.appService.getCurrentSubDomain(null);

      if (this.appService.getLangIdOfSubDomain(subdomain) != selectedLangId) {
        this.spinner.show();
        this.appService.getTranslatedUrl(formData).subscribe(data => {
          // since language changed, then redirect to the correct subdomain
          // (the redirect should keep the current path params)
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
  }

  openModalBecomeProSeller() {
    this.dialogService.open(BecameProSellerComponent, { isDefaultDialog: true }).afterClosed().subscribe();
  }

  setRtbHouseUserId() {
    const userId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);

    this.uniqueUserId = userId
      ? userId
      : this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.ANONYMOUS_ID);

    if (environment.name != 'prod') {
      this.uniqueUserId = null;
    }

    const url = 'https://creativecdn.com/tags?id=pr_hNK4xgbrg872o4rrCaCQ_uid_' + this.uniqueUserId;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
