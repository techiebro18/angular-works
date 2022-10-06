import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppConfiguration, AppResponse, AppSetting } from '@schemas/app.interface';
import { LocalStorageService } from '@services/local-storage.service';
import { UniversalService } from '@services/universal.service';
import { Apiv2ResponseModel } from '@shared/models/apiv2-response.model';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { add } from 'src/app/state/actions/app.actions';
import { environment } from 'src/environments/environment';
import { LanguageEnum } from '@shared/enums/language.enum';
import { CatalogCategoryLevelEnum } from '@shared/enums/catalog-category-level.enum';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // control the settings popup status (enabled/disabled)
  private isdisbleSettingsPopup$ = new BehaviorSubject(false);
  public isSettingsPopupDisabled$ = this.isdisbleSettingsPopup$.asObservable();

  // app configuration for language country currency as in local storage
  private appConfiguration$ = new BehaviorSubject<AppConfiguration | null>(null);
  private flashBannerEnable$ = new BehaviorSubject<boolean>(false);

  // holds the current subdomain
  private currentSubDomain: string | null = null;

  public catalogParentCategories$ = new BehaviorSubject<CatalogCategory[]>([]);
  public catalogChildCategories$ = new BehaviorSubject<CatalogCategory[]>([]);

  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private universalService: UniversalService,
    private cookieService: CookieService,
    private store: Store<any>
  ) {}

  public currencies = APP_CONSTANTS.CURRENCIES;
  public countries = APP_CONSTANTS.COUNTRIES;
  public languages = APP_CONSTANTS.ALL_LANGUAGES;

  public getFlashBannerStatus(): BehaviorSubject<boolean> {
    return this.flashBannerEnable$;
  }

  public setFlashBannerStatus(status: boolean): void {
    this.flashBannerEnable$.next(status);
  }

  public getTranslatedUrl(translateInfo: any): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(environment.API_URL + '/translate-url', translateInfo);
  }

  public countryInfo(configInfo: any): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(environment.API_URL + '/countryInfo', configInfo);
  }

  public languageInfo(configInfo: any): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(environment.API_URL + '/languageInfo', configInfo);
  }

  public currencyInfo(configInfo: any): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(environment.API_URL + '/currencyInfo', configInfo);
  }

  public disableSettingsPopup(isDisble: boolean): void {
    this.isdisbleSettingsPopup$.next(isDisble);
  }

  // Function to change the used translation language
  public useLanguage(language: string): void {
    this.translateService.use(language);
  }

  public getAppConfigurationBehavior(): BehaviorSubject<AppConfiguration | null> {
    return this.appConfiguration$;
  }

  // appConfig to subscribe for changes
  public getAppConfigurationObservable(): Observable<AppConfiguration | null> {
    // needed to intialize the subject on first call
    if (this.universalService.isBrowser) {
      this.getAppConfigurationValue();
    }

    return this.appConfiguration$.asObservable();
  }

  // appConfig to read current values
  public getAppConfigurationValue(): AppConfiguration | null {
    // rest from subject if already set
    if (this.appConfiguration$.getValue() != null) {
      return this.appConfiguration$.getValue();
    }
    else if (this.universalService.isBrowser && this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.CURRENCY_ID)) {
      // read from storage if exists
      // console.log(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.CURRENCY_ID));
      this.setAppConfiguration(this.cookiesConfigurationToObject());

      return this.appConfiguration$.getValue();
    }
    else {
      // no configuration at all
      return null;
    }
  }

  // Used to change app configuration in localstorage and subject
  public setAppConfiguration(appConfig: AppConfiguration): void {
    // set in storage
    if (this.universalService.isBrowser) {
      localStorage.setItem('config', JSON.stringify(appConfig));
      this.store.dispatch(
        add({
          products: JSON.parse(this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.PRODUCTS)),
          settings: appConfig,
        })
      );
    }

    this.setCookies(appConfig);
    // update translation language
    this.useLanguage(appConfig.languageShortName);
    // next subject
    this.appConfiguration$.next(appConfig);
  }

  setCookies(appConfig: AppConfiguration) {
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CONFIG_ID, appConfig.configuration + '', {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CURRENCY_ID, appConfig.currencyID?.toString(), {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CURRENCY_CODE, appConfig.currencyCode, {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.LANGUAGE_ID, appConfig.languageID?.toString(), {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.LANGUAGE_SHORT_NAME, appConfig.languageShortName, {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.COUNTRY_ID, appConfig.countryID?.toString(), {
      path: '/',
      domain: environment.cookieDomain,
    });
    this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.COUNTRY_NAME, appConfig.countryName, {
      path: '/',
      domain: environment.cookieDomain,
    });
  }

  // Utility method to create config object from localStorage string
  public stringConfigurationToObject(appConfig: string): AppConfiguration {
    return JSON.parse(appConfig) as AppConfiguration;
  }

  public cookiesConfigurationToObject(): AppConfiguration {
    const currencyId = parseInt(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.CURRENCY_ID));
    const appConfig = {
      currencyCode: this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.CURRENCY_CODE),
      currencyID: currencyId,
      currencySymbol: this.currencies.find(x => x.id === currencyId)?.symbol,
      countryID: parseInt(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.COUNTRY_ID)),
      countryName: this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.COUNTRY_NAME),
      languageID: parseInt(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.LANGUAGE_ID)),
      languageShortName: this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.LANGUAGE_SHORT_NAME),
      languageName: this.getLangOfSubDomain(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.LANGUAGE_SHORT_NAME))
        .languageName,
    } as AppConfiguration;

    return appConfig;
  }

  /**
   * Method to get the current subDomain
   * for US it returs '' which means there is no subdomain
   *
   */
  private getSubdomain(domain: string | null = null): string {
    // consider www.thevint.. , www.se.thevin .. se.thevin .. thevinta
    if (domain == null) {
      // use window host name
      domain = this.universalService.getApplicationHost();
    }

    // checking the subdomain
    if (!domain || domain.indexOf('.') < 0) {
      this.currentSubDomain = '';

      return '';
    }
    else {
      const splittArr = domain.split('.');
      let firstDotSeparation = splittArr[0];

      // ignore www if exists
      if (firstDotSeparation === 'www' && splittArr.length > 1) {
        firstDotSeparation = splittArr[1];
      }

      const countriesInitials = ['uk', 'se', 'dk', 'de', 'fr', 'es', 'it'];

      if (countriesInitials.includes(firstDotSeparation)) {
        this.currentSubDomain = firstDotSeparation;

        return firstDotSeparation;
      }
      else {
        this.currentSubDomain = '';

        return '';
      }
    }
  }

  public getCurrentSubDomain(domain: string | null = null): string {
    if (this.currentSubDomain === null) {
      this.getSubdomain(domain);

      return this.currentSubDomain;
    }
    else {
      return this.currentSubDomain;
    }
  }

  public getLangIdOfSubDomain(subDomain: string): number {
    switch (subDomain) {
      case 'uk':
        return 126;
      case 'se':
        return 111;
      case 'dk':
        return 22;
      case 'de':
        return 23;
      case 'fr':
        return 136;
      case 'es':
        return 137;
      case 'it':
        return 138;
      default:
        return 1; // english
    }
  }

  public getLangOfSubDomain(subDomain: string): {
    languageID: number;
    languageName: string;
    languageShortName: string;
  } {
    switch (subDomain) {
      case 'uk':
        return {
          languageID: 126,
          languageName: 'English (UK)',
          languageShortName: 'uk',
        };
      case 'se':
        return {
          languageID: 111,
          languageName: 'Swedish',
          languageShortName: 'se',
        };
      case 'dk':
        return {
          languageID: 22,
          languageName: 'Danish',
          languageShortName: 'dk',
        };
      case 'de':
        return {
          languageID: 23,
          languageName: 'German',
          languageShortName: 'de',
        };
      case 'fr':
        return {
          languageID: 136,
          languageName: 'French',
          languageShortName: 'fr',
        };
      case 'es':
        return {
          languageID: 137,
          languageName: 'Spanish',
          languageShortName: 'es',
        };
      case 'it':
        return {
          languageID: 138,
          languageName: 'Italian',
          languageShortName: 'it',
        };
      default:
        return {
          languageID: 1,
          languageName: 'English (US)',
          languageShortName: 'en',
        };
    }
  }

  // TODO:AYHAM this should be getting from database using API for better scalapility
  public updateSelectedLanguage(subDomain: string): void {
    let languageID: number, languageName: string, languageShortName: string;

    switch (subDomain) {
      case 'uk':
        languageID = 126;
        languageName = 'English';
        languageShortName = 'uk';
        break;
      case 'se':
        languageID = 111;
        languageName = 'Swedish';
        languageShortName = 'se';
        break;
      case 'dk':
        languageID = 22;
        languageName = 'Danish';
        languageShortName = 'dk';
        break;
      case 'de':
        languageID = 23;
        languageName = 'German';
        languageShortName = 'de';
        break;
      case 'fr':
        languageID = 136;
        languageName = 'French';
        languageShortName = 'fr';
        break;
      case 'es':
        languageID = 137;
        languageName = 'Spanish';
        languageShortName = 'es';
        break;
      case 'it':
        languageID = 138;
        languageName = 'Italian';
        languageShortName = 'it';
        break;
      default:
        languageID = 1;
        languageName = 'English';
        languageShortName = 'en';
        break;
    }

    const appConfig = this.getAppConfigurationValue();

    if (appConfig != null) {
      this.setAppConfiguration(appConfig);
    }
    else {
      // TODO:Ayham
      // throw error, this method should not be called when there is no localStorage data
    }
  }

  public mapLanguageShortName(languageShortName: string): string {
    let languageSuffix = '';

    // backend uses en for English-us and Englisg-uk
    if (languageShortName === '' || languageShortName === 'uk') {
      languageSuffix = 'en';
    }
    else {
      languageSuffix = languageShortName;
    }

    // backend has swedish language as 'sv' instead of 'se' !!
    // backend has Danish language as 'da' instead of 'dk' !!
    if (languageSuffix === 'se') {
      languageSuffix = 'sv';
    }
    else if (languageSuffix === 'dk') {
      languageSuffix = 'da';
    }

    return languageSuffix;
  }

  public getAppSetting(key: string): Observable<Apiv2ResponseModel<AppSetting>> {
    return this.httpClient.get<Apiv2ResponseModel<AppSetting>>(environment.API_V2_URL + 'app-setting/findByKey/' + key);
  }

  public updateCatalogParentCategories$(value): void {
    this.catalogParentCategories$.next(value);
  }

  public updateCatalogChildCategories$(value): void {
    this.catalogChildCategories$.next(value);
  }

  public loadCatalogCategories$(
    language: LanguageEnum = LanguageEnum.ENGLISH_USA,
    level: CatalogCategoryLevelEnum = CatalogCategoryLevelEnum.PARENT
  ): Observable<CatalogCategory[]> {
    const languageCode: string = language === LanguageEnum.DANISH ? 'da' : (language as string);
    const levelResourceName = level === CatalogCategoryLevelEnum.PARENT ? 'parent' : 'child';

    return this.httpClient.get<CatalogCategory[]>(
      environment.API_URL + '/public/' + levelResourceName + '-categories-urls?lang=' + languageCode
    );
  }
}

export interface CatalogCategory {
  name: string;
  url: string;
}
