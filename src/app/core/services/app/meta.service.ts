import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '@services/local-storage.service';
import { UniversalService } from '@services/universal.service';
import { environment } from 'src/environments/environment';
import { NgxSeoMetaTag, NgxSeoMetaTagAttr, SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { SegmentService } from '@services/segment.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    private _http: HttpClient,
    private universalService: UniversalService,
    private readonly seoSocialShareService: SeoSocialShareService,
    private transferState: TransferState,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private segmentService: SegmentService,
    private appService: AppService,
    @Inject(DOCUMENT) private doc: any
  ) {
    const metaTag: NgxSeoMetaTag = {
      attr: NgxSeoMetaTagAttr.name,
      attrValue: 'robots',
      value: environment.production
        ? 'index, follow'
        : 'noindex, nofollow',
    };

    this.seoSocialShareService.setMetaTag(metaTag);
  }

  public currentAppConfiguaration;

  public setPageNoIndex() {
    const metaTag: NgxSeoMetaTag = {
      attr: NgxSeoMetaTagAttr.name,
      attrValue: 'robots',
      value: 'noindex, follow',
    };

    this.seoSocialShareService.setMetaTag(metaTag);
  }

  public setPageIndex() {
    const metaTag: NgxSeoMetaTag = {
      attr: NgxSeoMetaTagAttr.name,
      attrValue: 'robots',
      value: 'index, follow',
    };

    this.seoSocialShareService.setMetaTag(metaTag);
  }

  public getStaticPageMeta(page: string, description = '', title = '') {
    if (page == 'home') {
      this.getMetaData(page).subscribe(data => {
        if (data.list) {
          const seoData: SeoSocialShareData = {
            title: data.list?.meta_title,
            description: data.list?.meta_description,
            url: environment.baseRemoteUrl,
          };

          this.seoSocialShareService.setData(seoData);
          this.seoSocialShareService.setCanonicalUrl(environment.baseRemoteUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('x-default', 'https://' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('en', 'https://' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('en', 'https://' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('en', 'https://' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('en', 'https://' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('en-GB', 'https://uk.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('en-GB', 'https://uk.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('de', 'https://de.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('de', 'https://de.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('de', 'https://de.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('de', 'https://de.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('da', 'https://de.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('sv', 'https://se.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('fr', 'https://fr.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('fr', 'https://fr.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('fr', 'https://fr.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('es', 'https://es.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('it', 'https://it.' + environment.demainUrl);
          this.seoSocialShareService.setLanguageAlternativeUrl('da', 'https://dk.' + environment.demainUrl);
        }

        this.segmentService.pageView({ name: 'home', page_category: 'Homepage' });
      });
    }
    else if (page == 'cart') {
      this.translate.get('Shopping Bag').subscribe((langText: string) => {
        const seoData: SeoSocialShareData = {
          title: langText + ' | The Vintage Bar',
          description: '',
          url: environment.baseRemoteUrl + 'cart/view-cart',
        };

        this.seoSocialShareService.setData(seoData);
        this.segmentService.pageView({ name: 'cart', page_category: 'Shopping Bag' });
      });
    }
    else if (page == 'checkout') {
      this.translate.get('CHECKOUT').subscribe((langText: string) => {
        const seoData: SeoSocialShareData = {
          title: `${langText} | The Vintage Bar`,
          description: '',
          url: `${environment.baseRemoteUrl}checkout`,
        };

        this.seoSocialShareService.setData(seoData);
        this.segmentService.pageView({ name: 'checkout', page_category: 'Checkout' });
      });
    }
    else if (page == 'forgot-password') {
      this.translate.get('Forgot Password').subscribe((langText: string) => {
        const seoData: SeoSocialShareData = {
          title: `${langText} | The Vintage Bar`,
          description: '',
          url: `${environment.baseRemoteUrl}forgot-password`,
        };

        this.seoSocialShareService.setData(seoData);
        this.segmentService.pageView();
      });
    }
    else {
      this.translate.get(title
        ? title
        : page).subscribe((langText: string) => {
        if (description) {
          this.translate.get(description).subscribe((langDesc: string) => {
            const seoData: SeoSocialShareData = {
              title: `${langText} | The Vintage Bar`,
              description: langDesc,
              url: `${environment.baseRemoteUrl}${page}`,
            };

            this.seoSocialShareService.setData(seoData);
            this.segmentService.pageView();
          });
        }
        else {
          const seoData: SeoSocialShareData = {
            title: `${langText} | The Vintage Bar`,
            description: '',
            url: `${environment.baseRemoteUrl}${page}`,
          };

          this.seoSocialShareService.setData(seoData);
          this.segmentService.pageView();
        }
      });
    }
  }

  public getPDPMeta(title, page) {
    title = title.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    const seoData: SeoSocialShareData = {
      title: `${title} | The Vintage Bar`,
      description: '',
      url: `${environment.baseRemoteUrl}${page}`,
    };

    this.seoSocialShareService.setData(seoData);
    this.segmentService.pageView({ name: 'PDP', page_category: 'Product Detail Page' });
  }

  public getListingPageMeta(page: string, category?: string, childCategory?: string) {
    const canonicalUrl = this.universalService.getApplicationUrl(true) + this.universalService.getApplicationPathname();

    this.getMetaData(page, category, childCategory).subscribe(data => {
      if (data.list) {
        const seoData: SeoSocialShareData = {
          title: data.list.meta_title,
          description: data.list.meta_description,
          url: canonicalUrl,
        };

        this.seoSocialShareService.setData(seoData);
        this.seoSocialShareService.setCanonicalUrl(canonicalUrl);

        if (category != undefined && childCategory != undefined)
          this.generateHrefLangsLinks(page, data.list.hrefLangs, category, childCategory);
        else if (category != undefined) {
          this.generateHrefLangsLinks(page, data.list.hrefLangs, category);
        }
        else {
          this.generateHrefLangsLinks(page, data.list.hrefLangs);
        }
      }

      switch (page) {
      case 'sale':
        this.segmentService.pageView({ name: 'PLP', page_category: 'Sale' });
        break;
      case 'discover':
        this.segmentService.pageView({ name: 'PLP', page_category: 'Discover' });
        break;
      case 'the-archive':
        this.segmentService.pageView({ name: 'Archive', page_category: 'Archive' });
        break;
      default:
        this.segmentService.pageView({ name: 'PLP', page_category: 'Product Listing Page' });
        break;
      }
    });
  }

  private getMetaData(page: string, category?: string, childCategory?: string) {
    // TODO: Does the MetaData depends on selected language ??
    let apiKey = page;

    if (category != undefined) {
      apiKey += '-' + category;
    }

    if (childCategory != undefined) {
      apiKey += '-' + childCategory;
    }

    const REQUESTED_API_KEY = makeStateKey<any>('metaData-' + apiKey);

    if (this.transferState.hasKey(REQUESTED_API_KEY)) {
      // response already fetched on server side, use it
      const resp = this.transferState.get(REQUESTED_API_KEY, null);

      // remove response from transferState
      this.transferState.remove(REQUESTED_API_KEY);

      return of(resp);
    }
    else {
      // response is not in the transferState, fetch it
      if (category != undefined && childCategory != undefined) {
        return this._http
          .get<any>(environment.API_V2_URL + 'pages/meta/' + page + '/' + category + '/' + childCategory)
          .pipe(
            tap(resp => {
              // if fetched in server side, store the response in the transferState
              if (!this.universalService.isBrowser) {
                this.transferState.set(REQUESTED_API_KEY, resp);
              }
            })
          );
      }
      else if (category != undefined) {
        return this._http.get<any>(environment.API_V2_URL + 'pages/meta/' + page + '/' + category).pipe(
          tap(resp => {
            // if fetched in server side, store the response in the transferState
            if (!this.universalService.isBrowser) {
              this.transferState.set(REQUESTED_API_KEY, resp);
            }
          })
        );
      }
      else {
        return this._http.get<any>(environment.API_V2_URL + 'pages/meta/' + page).pipe(
          tap(resp => {
            // if fetched in server side, store the response in the transferState
            if (!this.universalService.isBrowser) {
              this.transferState.set(REQUESTED_API_KEY, resp);
            }
          })
        );
      }
    }
  }

  private setLanguageAlternativeUrl(hrefLangs: Object, lang: string, page?: string) {
    switch (lang) {
    case 'en':
    default:
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'x-default',
        `https://${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'en',
        `https://${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'en-GB',
        `https://uk.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    case 'de':
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'de',
        `https://de.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    case 'sv':
    case 'se':
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'sv',
        `https://se.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    case 'fr':
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'fr',
        `https://fr.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    case 'es':
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'es',
        `https://es.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    case 'it':
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'it',
        `https://it.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    case 'da':
    case 'dk':
      this.seoSocialShareService.setLanguageAlternativeUrl(
        'da',
        `https://dk.${environment.demainUrl}${page}${hrefLangs[lang]}`
      );
      break;
    }
  }

  private setHrefLanguage(page: string, hrefLangs: Object, lang: string, category?: string, childCategory?: string) {
    const shortLang = this.getLanguageShortName(lang);

    switch (page) {
    case 'shop':
    case 'designer':
      this.translate.getTranslation(shortLang).subscribe(data => {
        const translation = this.getTranslation(page, data[`${page.toUpperCase()}`]).toLowerCase();

        this.setLanguageAlternativeUrl(hrefLangs, lang, `/${translation}/`);
      });
      break;
    case 'child-category':
      this.getMetaData('shop', category).subscribe(data => {
        if (data.list) this.setLanguageAlternativeUrl(hrefLangs, lang, `/${data.list.hrefLangs[lang]}/`);
      });
      break;
    case 'discover':
      this.translate.getTranslation(shortLang).subscribe(data => {
        const translation = this.getTranslation(category, data[`${category.toUpperCase()}`]).toLowerCase();

        this.setLanguageAlternativeUrl(hrefLangs, lang, `/${translation}/`);
      });
      break;
    case 'style-motherpage':
      this.setLanguageAlternativeUrl(hrefLangs, lang, '/');
      break;
    default:
      this.translate.getTranslation(shortLang).subscribe(data => {
        const translation = this.getTranslation(page, data[`${page.toUpperCase()}`]).toLowerCase();

        if (page === hrefLangs['en']) this.setLanguageAlternativeUrl(hrefLangs, lang, '/');
        else this.setLanguageAlternativeUrl(hrefLangs, lang, `/${translation}/`);
      });
      break;
    }
  }

  private generateHrefLangsLinks(page: string, hrefLangs: Object, category?: string, childCategory?: string) {
    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();

    for (const lang in hrefLangs) this.setHrefLanguage(page, hrefLangs, lang, category, childCategory);
  }

  private getLanguageShortName(lang: string): string {
    switch (lang) {
    case 'da':
      return 'dk';
    case 'sv':
      return 'se';
    default:
      return lang;
    }
  }

  private getTranslation(original: string, translated?: string): string {
    return translated ?? original;
  }
}
