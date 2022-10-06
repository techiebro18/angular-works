import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { ProductService } from '@services/product.service';
import * as algoliasearch from 'algoliasearch/lite';
import { AppService } from '@services/app/app.service';
import { LoaderService } from '@services/app/loader.service';
import { AppConfiguration } from '@schemas/app.interface';
import { MetaService } from '@services/app/meta.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'tvb-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss'],
})
export class MyWishlistComponent implements OnInit {
  currentAppConfiguaration: AppConfiguration;
  currentLanguage: string;
  public instantsearchConfig = {
    indexName: environment.INSTANT_SEARCH_INDEX_NAME,
    searchClient: algoliasearch(environment.INSTANT_SEARCH_APP_ID, environment.INSTANT_SEARCH_SEARCH_API_KEY),
  };
  public sortByItems = [
    { value: environment.INSTANT_SEARCH_INDEX_NAME_PERSONAL, label: 'Sort by Recommended' },
    { value: environment.INSTANT_SEARCH_INDEX_NAME, label: 'Sort by New In' },
    {
      value: environment.INSTANT_SEARCH_INDEX_NAME_PRICE_DESC,
      label: 'Sort by Price: High to Low',
    },
    { value: environment.INSTANT_SEARCH_INDEX_NAME_PRICE_ASC, label: 'Sort by Price: Low to High' },
    { value: environment.INSTANT_SEARCH_INDEX_NAME_MOST_WANTED, label: 'Sort by Most Wanted' },
  ];
  searchParameters = { hitsPerPage: 60, distinct: true, enablePersonalization: true, filters: '' };
  filterParams: any;
  enableList = false;
  public dataLoaded = false;

  constructor(
    public appService: AppService,
    private _productService: ProductService,
    private metaService: MetaService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.metaService.getStaticPageMeta('account/wishlist', '', 'My Wishlist');
    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();
    this.currentLanguage = this.getCurrentLanguageShortName();
    this.getWishlist();

    this._productService.updateWishlist.subscribe(data => {
      this.getWishlist();
    });
  }

  public getWishlist(): void {
    this.spinnerService.show();
    this._productService.getWishlist().subscribe(
      data => {
        this.spinnerService.hide();
        this._productService.updateUserWishlistRecords(data);
        this.filterParams = data.list
          .map(function (val) {
            return 'objectID: ' + val.product_id;
          })
          .join(' OR ');

        if (data.list.length) {
          this.searchParameters.filters = this.filterParams;
          this.enableList = true;
        }
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  transformItems = items => {
    this._productService.setHit([...items]);
    this.dataLoaded = true;

    return items;
  };

  getCurrentLanguageShortName(): string {
    let languageSuffix = '';
    const subdomain = this.appService.getCurrentSubDomain(null);

    languageSuffix = subdomain == '' || subdomain == 'uk' ? 'en' : subdomain;

    if (languageSuffix == 'se') {
      languageSuffix = 'sv';
    }
    else if (languageSuffix == 'dk') {
      languageSuffix = 'da';
    }

    return languageSuffix;
  }

  ngOnDestroy(): void {
    this._productService.setUpdateWishlist(null);
  }
}
