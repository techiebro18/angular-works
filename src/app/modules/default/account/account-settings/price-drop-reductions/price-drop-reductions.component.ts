import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { AppConfiguration } from '@schemas/app.interface';
import { OfferService } from '@services/account/offer.service';
import { PriceDropService } from '@services/account/price-drop.service';
import { AppService } from '@services/app/app.service';
import { MetaService } from '@services/app/meta.service';
import { ProductService } from '@services/product.service';
import * as algoliasearch from 'algoliasearch/lite';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlpCurrencyData } from 'src/app/modules/catalog/pages/listing-view/plp-definitions';

@Component({
  selector: 'app-price-drop-reductions',
  templateUrl: './price-drop-reductions.component.html',
  styleUrls: ['./price-drop-reductions.component.scss'],
})
export class PriceDropReductionsComponent implements OnInit {
  public currentAppConfiguaration: AppConfiguration;
  public currentLanguage: string;
  public currencyConfiguration$: Observable<PlpCurrencyData>;
  public itemsPerPage = 10;

  public instantsearchConfig = {
    indexName: environment.INSTANT_SEARCH_INDEX_NAME,
    searchClient: algoliasearch(
      environment.INSTANT_SEARCH_APP_ID,
      environment.INSTANT_SEARCH_SEARCH_API_KEY
    ),
  };
  public searchParameters = {
    hitsPerPage: this.itemsPerPage,
    distinct: true,
    enablePersonalization: true,
    filters: '',
    query: '',
  };
  public enableList = false;
  public dataLoaded = false;
  public makeOfferEnabled = false;

  constructor(
    private priceDropService: PriceDropService,
    private metaService: MetaService,
    private appService: AppService,
    private productService: ProductService,
    private offerService: OfferService
  ) {}

  public productsId: string;
  public sellerIds: string;
  public sellers: any;
  public offerSetting: any;
  public searchItems: string;
  offerSettingKey = 'make-an-offer';

  ngOnInit(): void {
    this.applySetup();
    this.checkOfferEnabled();
    this.loadPriceDropSubscriptions();
  }

  applySetup(): void {
    this.metaService.getStaticPageMeta('account/price-reductions', '', 'Price reductions');
    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();
    this.currentLanguage = this.getCurrentLanguageShortName();
    this.getCurrencyConfiguration();
  }

  public loadPriceDropSubscriptions(): void {
    this.priceDropService.getPriceDropList().subscribe(response => {
      if (response) {
        this.productsId = response.data
          .map(a => {
            return `objectID: ${a.product_id}`;
          })
          .join(' OR ');
        this.searchParameters.filters = this.productsId;

        this.enableList = true;
      }
    });
  }

  public isMakeOfferEnabled(hit: any): boolean {
    return (
      this.makeOfferEnabled
      && this.sellers.find(x => x.id === hit.commission_user_id && x.openToOffers)
    );
  }

  public changeItemsPerPage(): void {
    this.searchParameters.hitsPerPage = this.itemsPerPage;
  }

  public filterProducts(): void {
    this.searchParameters.query = this.searchItems;
  }

  checkOfferEnabled(): void {
    this.appService.getAppSetting(this.offerSettingKey).subscribe(
      (data: any) => {
        if (data.message === 'success') {
          this.offerSetting = data.model;
          this.makeOfferEnabled
            = data.model.status == 'active' && data.model.value > 0
              ? true
              : false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  transformItems = items => {
    this.productService.setHit([...items]);

    if (!this.dataLoaded) {
      this.sellerIds = items.map(a => `sellerIds=${a.commission_user_id}`).join('&');
      this.offerService.getSellersOpenToOffers(this.sellerIds).subscribe(response => {
        if (response.data) {
          this.sellers = response.data;
        }
      });
    }

    this.dataLoaded = true;

    return items;
  };

  getCurrentLanguageShortName(): string {
    let languageSuffix = '';
    const subdomain = this.appService.getCurrentSubDomain(null);

    languageSuffix = subdomain == '' || subdomain == 'uk'
      ? 'en'
      : subdomain;

    if (languageSuffix == 'se') {
      languageSuffix = 'sv';
    }
    else if (languageSuffix == 'dk') {
      languageSuffix = 'da';
    }

    return languageSuffix;
  }

  getCurrencyConfiguration() {
    this.currencyConfiguration$ = this.appService.getAppConfigurationObservable().pipe(
      switchMap(appConfig => {
        if (appConfig) {
          return of({
            plpCurrency: appConfig.currencyCode,
            plpCurrencySymbol: appConfig.currencySymbol,
          });
        }
        else {
          return of({
            plpCurrency: 'USD',
            plpCurrencySymbol: '$',
          });
        }
      })
    );
  }
}
