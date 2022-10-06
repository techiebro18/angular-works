import { Component, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';
import { environment } from '@environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserInfoResponse } from '@schemas/auth.interface';
import { AppService } from '@services/app/app.service';
import { AppConfiguration, Currency } from '@schemas/app.interface';
import { UserData } from '@schemas/user.interface';
import { LocalStorageService } from '@services/local-storage.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { UniversalService } from '@services/universal.service';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { MenuService } from '@services/common/menu.service';
import { UrlService } from '@services/url.service';
import { filter } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '@services/account.service';
import { firstValueFrom } from 'rxjs';
import { LanguageEnum } from '@shared/enums/language.enum';
import { CatalogCategoryLevelEnum } from '@shared/enums/catalog-category-level.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'angular-website';

  public previousUrl = '';
  public currentUrl = '';
  private availableCurrencies: Currency[];
  private previousSubdomain: string | 'de' | 'dk' | 'se' | 'uk' | 'fr' | 'es' | 'it';
  private currentSubdomain: string | 'de' | 'dk' | 'se' | 'uk' | 'fr' | 'es' | 'it';

  constructor(
    public translate: TranslateService,
    public localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService,
    private accountService: AccountService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private universalService: UniversalService,
    private cookieService: CookieService,
    private urlService: UrlService,
    @Inject(DOCUMENT) private doc: any,
    private menuService: MenuService,
    private renderer2: Renderer2
  ) {
    // TODO:Ayham  load language from the user's settings
    translate.addLangs(['en', 'de', 'dk', 'se', 'uk', 'fr', 'es', 'it']);
    translate.setDefaultLang('en');
  }

  async ngOnInit(): Promise<void> {
    this.availableCurrencies = await firstValueFrom(this.accountService.getCurrencyList());
    this.setupConfigurationSettings();

    if (this.universalService.isBrowser && environment.production) {
      this.setOptimizely();
    }

    if (this.universalService.isBrowser) {
      this.setSegment();
      this.loadSegmentJS();
      this.setTiktok();
      this.setAwin();
      this.restoreSession();
      window.analytics.ready(() => {
        const anonymousId = window.analytics.user().anonymousId();

        this.cookieService.set('anonymousId', anonymousId, { path: '/' });
      });
    }
    else {
      // on server rendering, user is always not authinticated
      this.userService.setUser(null);
      this.authService.setLoggedIn(false);
    }

    if (this.universalService.isBrowser && environment.production) {
      this.setSleekNote();
    }

    if (this.universalService.isBrowser) {
      this.getUserDataFromLocalStorage();
    }

    if (this.universalService.isBrowser && !environment.production) {
      document
        .querySelector('meta[name="google-site-verification"]')
        .setAttribute('content', '9m3WaAsUzCoyEKZseXHbeeAIUGA7GWuQP3absS6M8xM');
    }

    this.previousUrl = this.currentUrl;
    this.urlService.setPreviousUrl(this.previousUrl);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
    });

    this.appService.getAppConfigurationBehavior().subscribe((freshAppConfig: AppConfiguration) => {
      this.appService
        .loadCatalogCategories$(freshAppConfig.languageShortName as LanguageEnum, CatalogCategoryLevelEnum.PARENT)
        .subscribe(val => this.appService.updateCatalogParentCategories$(val));
    });
  }

  private getUserDataFromLocalStorage(): void {
    const lsUserGuid = this.localStorageService.getItem('user_guid');
    const coUserGuid = this.cookieService.get('user_guid');

    if (!lsUserGuid && coUserGuid) {
      this.localStorageService.setItem('user_guid', coUserGuid);
    }
    else if (!lsUserGuid && !coUserGuid) {
      const guid = this.newGuid();

      this.localStorageService.setItem('user_guid', guid);

      this.cookieService.set('user_guid', guid, {
        path: '/',
        domain: environment.cookieDomain,
      });
    }
  }

  public newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;

      return v.toString(16);
    });
  }

  /**
   * To check localStorage data on app load,
   * if exists , calls get loggeduserInfo API to update the saved data
   * Should be called only in a browser for universal to work
   */
  public restoreSession(): void {
    // On first app load : check if there is logged in user in storage
    const localAccessToken = this.localStorageService.getItem(APP_CONSTANTS.COOKIE_KEYS.ACCESS_TOKEN);
    const localApiKeyCookie = this.localStorageService.getItem(APP_CONSTANTS.COOKIE_KEYS.API_KEY);
    const localUserIdCookie = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);
    const localUserData
      = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_DATA) != ''
        ? JSON.parse(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_DATA))
        : '';

    const userId = +localUserIdCookie;
    const apiKey = localApiKeyCookie;

    if (localApiKeyCookie && localUserIdCookie) {
      if (!localUserData) this.setUserFromCookie(apiKey, userId, localAccessToken);
      else this.setUserWithoutDataFromCookie(apiKey, userId, localUserData);

      this.authService.setLoggedIn(true);
      this.getSessionFromAPI(userId);
    }
    else {
      this.userService.setUser(null);
      this.authService.setLoggedIn(false);
    }
  }

  getSessionFromAPI(userId: number) {
    this.spinnerService.show();

    this.userService.getUserV2(userId).subscribe({
      next: (userDataResponse: UserInfoResponse) => {
        const user: UserData = userDataResponse.user.user[0];

        this.userService.setUser(user);
        this.authService.refresh(user.access_token).subscribe({
          next: () => {
            this.authService.setLoggedIn(true);
          },
          error: () => {
            this.authService.setLoggedIn(false);
          },
        });
        this.spinnerService.hide();
      },
      error: () => {
        this.userService.setUser(null);
        this.authService.setLoggedIn(false);
        this.spinnerService.hide();
      },
    });
  }

  setUserWithoutDataFromCookie(apiKey: string, userId: number, localUserData: any) {
    localUserData.api_key = apiKey;
    localUserData.id = userId;

    this.userService.setUser(localUserData);
  }

  setUserFromCookie(apiKey: string, userId: number, localAcessToken: string) {
    const tempLocalUserData: UserData = {
      status: 'success',
      api_key: apiKey,
      id: userId,
      access_token: localAcessToken,
    };

    this.userService.setUser(tempLocalUserData);
  }

  public setupConfigurationSettings(): void {
    const currentAppConfiguaration = this.appService.getAppConfigurationValue();

    this.currentSubdomain = this.appService.getCurrentSubDomain(null);

    if (currentAppConfiguaration == null) {
      // load for first time, no localStorage configuration
      // check if the cookies has a configurationId, then get these configuration ,
      // otherwise,  Get default configuration from API, and set it in appConfiguration
      this.getDefaultConfiguration();
    }
    else {
      // Already have local configuration , check if language needs to be changed based on the subdomain
      // if yes, update the language only in AppConfig
      const subdomain = this.appService.getCurrentSubDomain(null);

      this.setupCurrencyConfig(this.appService.getLangIdOfSubDomain(subdomain), currentAppConfiguaration.languageID);
    }
  }

  getDefaultConfiguration() {
    this.setFallBackDefaultConfig();
  }

  private setSegment(): void {
    const s = this.doc.createElement('script');

    s.type = 'text/javascript';
    s.innerHTML
      = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}();';
    const footer = this.doc.getElementsByTagName('footer')[0];

    footer.appendChild(s);
  }

  public setSleekNote() {
    const s = this.doc.createElement('script');

    s.type = 'text/javascript';
    s.id = 'sleeknoteScript';
    s.innerHTML
      = '(function () {var sleeknoteScriptTag = document.createElement("script"); sleeknoteScriptTag.type = "text/javascript"; sleeknoteScriptTag.charset = "utf-8"; sleeknoteScriptTag.src = ("//sleeknotecustomerscripts.sleeknote.com/43267.js"); var s = document.getElementById("sleeknoteScript");s.parentNode.insertBefore(sleeknoteScriptTag, s); })();';
    const head = this.doc.getElementsByTagName('head')[0];

    head.appendChild(s);
  }

  public setTiktok() {
    const s = this.doc.createElement('script');

    s.type = 'text/javascript';
    s.id = 'tiktok';
    s.innerHTML
      = '!function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load("'
      + environment.TIKTOK_ID
      + '"); ttq.page(); }(window, document, "ttq")';
    const head = this.doc.getElementsByTagName('head')[0];

    head.appendChild(s);
  }

  public setOptimizely() {
    const s = this.doc.createElement('script');

    s.type = 'text/javascript';
    s.src = 'https://cdn.optimizely.com/js/19269392122.js';
    const head = this.doc.getElementsByTagName('head')[0];

    head.appendChild(s);
  }

  public setAwin() {
    const subDomain = this.appService.getCurrentSubDomain(null);

    if (subDomain === 'dk' || subDomain === 'se' || subDomain === 'de') {
      const script = this.doc.createElement('script');

      script.type = 'text/javascript';
      script.defer = 'defer';
      script.id = 'dwinScript';

      if (subDomain === 'dk') script.src = `https://www.dwin1.com/${environment.AWIN_MERCHANT_ID.DK}.js`;

      if (subDomain === 'se') script.src = `https://www.dwin1.com/${environment.AWIN_MERCHANT_ID.SE}.js`;

      if (subDomain === 'de') script.src = `https://www.dwin1.com/${environment.AWIN_MERCHANT_ID.DE}.js`;

      this.renderer2.appendChild(this.doc.body, script);
    }
  }

  private setFallBackDefaultConfig() {
    const subdomain = this.appService.getCurrentSubDomain(null);
    const langOfSubDomain = this.appService.getLangOfSubDomain(subdomain);
    const appConfig = {
      currencyID: 11,
      currencyCode: 'EUR',
      currencySymbol: '€',
      languageID: langOfSubDomain.languageID,
      languageName: langOfSubDomain.languageName,
      languageShortName: langOfSubDomain.languageShortName,
      countryID: 1,
      countryName: 'United States',
      countrycode: 'US',
      configuration: 1,
    } as AppConfiguration;

    this.appService.setAppConfiguration(appConfig);
    this.requestMenuList(appConfig.languageID);
  }

  private checkAndSetConfig(appConfig: AppConfiguration): void {
    const subdomain = this.appService.getCurrentSubDomain(null);
    const langOfSubDomain = this.appService.getLangOfSubDomain(subdomain);

    if (langOfSubDomain.languageID !== appConfig.languageID) {
      // update local configuration to correct language
      appConfig.languageID = langOfSubDomain.languageID;
      appConfig.languageName = langOfSubDomain.languageName;
      appConfig.languageShortName = langOfSubDomain.languageShortName;
    }

    this.appService.setAppConfiguration(appConfig);
    this.requestMenuList(appConfig.languageID);
  }

  /**
   * The main and only function to request the menu lists for nav, sidenav and footer.
   * @param languageId
   */
  public requestMenuList(languageId): void {
    this.menuService.getMenu(languageId).subscribe((data: any) => {
      // console.log(data);
    });
    this.menuService.getMenuFooter(languageId).subscribe((data: any) => {
      // console.log(data);
    });
  }

  private loadSegmentJS() {
    window.consentManagerConfig = function (exports) {
      const inEU = exports.inEU;

      return {
        container: '#consent-manager',
        writeKey: environment.JS_SEGMENT_KEY,
        //shouldRequireConsent: inEU,
        implyConsentOnInteraction: true,
        bannerContent:
          'We use cookies on thevintagebar.com to provide you with a personalized experience. If you select \'OK\' or access any content on our website, you agree to the use of cookies. If you like to customise your settings, ',
        bannerSubContent: ' select here.   ',
        preferencesDialogTitle: 'Website Data Collection Preferences',
        preferencesDialogContent:
          'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.',
        cancelDialogTitle: 'Are you sure you want to cancel?',
        cancelDialogContent:
          'Your preferences have not been saved. By continuing to use our website, you\'re agreeing to our Website Data Collection Policy',
        closeBehavior: categories => {
          categories;
        },
      };
    };
    const s = this.doc.createElement('script');

    s.type = 'text/javascript';
    s.src = 'https://www.unpkg.com/@segment/consent-manager@4.2.3/standalone/consent-manager.js';
    const head = this.doc.getElementsByTagName('footer')[0];

    head.appendChild(s);
  }

  private setupCurrencyConfig(currentLanguagueId, previousLanguageId): void {
    const currentSubDomain = !this.currentSubdomain || this.currentSubdomain === '' ? 'en' : this.currentSubdomain;

    if (this.activatedRoute.snapshot.queryParams['pdp'] && this.activatedRoute.snapshot.queryParams['keepCurrency']) {
      const currencyCodeFromUrl: string = this.activatedRoute.snapshot.queryParams['keepCurrency'];

      this.setCurrencyIntoAppConfig(currencyCodeFromUrl);
    }
    else if (!this.authService.loggedIn && currentLanguagueId !== previousLanguageId) {
      const currency = this.getCurrencyAccordingToSubdomain(currentSubDomain);
      const language = this.getLanguageAccordingToSubdomain(currentSubDomain);
      const country = this.getCountryAccordingToSubdomain(currentSubDomain);

      this.setCurrencyIntoAppConfig(currency.code, language, country);
    }

    this.appService.useLanguage(currentSubDomain);
    this.requestMenuList(currentLanguagueId);
  }

  getLanguageAccordingToSubdomain(currentSubdomain: string) {
    return this.appService.languages.find(x => x.shortName === currentSubdomain);
  }

  getCountryAccordingToSubdomain(currentSubdomain: string) {
    return this.appService.countries.find(x => x.shortName === currentSubdomain);
  }

  private getCurrencyAccordingToSubdomain(subdomain: string): Currency {
    let currency: Currency = this.availableCurrencies.find(_ => _.code === 'EUR');

    if (subdomain === 'uk') {
      currency = this.availableCurrencies.find(_ => _.code === 'GBP');
    }
    else if (subdomain === 'dk') {
      currency = this.availableCurrencies.find(_ => _.code === 'DKK');
    }
    else if (subdomain === 'se') {
      currency = this.availableCurrencies.find(_ => _.code === 'SEK');
    }

    return currency;
  }

  public setCurrencyIntoAppConfig(currencyCode = 'EUR', language?, country?): void {
    const currency: Currency = this.availableCurrencies.find(_ => _.code === currencyCode);
    const oldAppConfig: AppConfiguration = this.appService.getAppConfigurationValue();
    let newAppConfig: AppConfiguration;

    if (language && country) {
      newAppConfig = {
        ...oldAppConfig,
        currencyID: currency.id,
        currencyCode: currency.code,
        currencySymbol: currency.symbol,
        languageID: language.id,
        languageName: language.name,
        languageShortName: language.shortName,
        countryID: country.id,
        countryName: country.name,
      };
    }
    else {
      newAppConfig = {
        ...oldAppConfig,
        currencyID: currency.id,
        currencyCode: currency.code,
        currencySymbol: currency.symbol,
      };
    }

    this.appService.setAppConfiguration(newAppConfig);
  }
}
