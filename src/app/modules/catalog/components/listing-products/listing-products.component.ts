import {
  AfterContentInit,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ProductService } from '@services/product.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { SegmentService } from '@services/segment.service';
import { TranslateService } from '@ngx-translate/core';
import { MobileService } from '@services/mobile.service';
import { FilterService } from '@services/common/filter.service';
import { debounceTime, distinct, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '@services/app/app.service';
import { formatCurrency } from '@angular/common';
import { MemberBio } from '@schemas/community/member-bio';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogDictionaryPipe } from '@shared/pipes/catalog-dictionary.pipe';

@Component({
  selector: 'app-listing-products',
  templateUrl: './listing-products.component.html',
  styleUrls: ['./listing-products.component.scss'],
})
export class ListingProductsComponent implements OnInit, OnDestroy {
  @Input() public instantsearchConfig: any;
  @Input() public plpConfig: any;
  @Input() public member: MemberBio;

  public ifResponsiveFiltersOpen = false;
  public appConfig = {
    currencySymbol: '$',
    currencyCode: 'USD',
  };

  public onDestroy$ = new Subject();

  // filters sort values::
  // public test:FacetSortByStringOptions;
  // FacetSortByStringOptions = 'count' | 'count:asc' | 'count:desc' | 'name' | 'name:asc' | 'name:desc' | 'isRefined';
  public isCategorySelected = false;
  public isSubCategorySelected = false;
  public dataLoaded = false;
  loggedInStatus: any;
  userWishlistData: any = [];
  platformName = '';
  selectedList = '';
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
  public ProductData: any;
  routeData: any;
  saleBadgeKey = 'sale-badge';
  public saleBadgeEnabled = false;
  constructor(
    private renderer: Renderer2,
    public authService: AuthService,
    public _productService: ProductService,
    private segmentService: SegmentService,
    private _FilterService: FilterService,
    private mobileService: MobileService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    @Inject(LOCALE_ID) private locale: string,
    private appService: AppService,
    private spinnerService: NgxSpinnerService,
    private catalogDictionaryPipe: CatalogDictionaryPipe
  ) {
    this.mobileService.isMobile$.pipe(takeUntil(this.onDestroy$)).subscribe(isMobile => {
      this.platformName = isMobile ? 'Mobile' : 'Desktop';
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'noHorizontalScroll');
    this.appSettingSaleBadge();
    this.cookieService.set('indexName', this.instantsearchConfig.indexName, { path: '/' });
    this.activatedRoute.data.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.routeData = data;
    });
    this.loggedInStatus = this.authService.loggedIn;

    if (this.loggedInStatus) {
      this._productService.getWishlist().subscribe(
        data => {
          this._productService.updateUserWishlistRecords(data);
        },
        error => {
          console.log(error);
        }
      );
    }

    this.trackUserActivity();

    this.appService.getAppConfigurationObservable().subscribe(settings => (this.appConfig = settings));
  }

  private appSettingSaleBadge(): void {
    this.appService.getAppSetting(this.saleBadgeKey).subscribe(
      (data: any) => {
        if (data.message === 'success') {
          this.saleBadgeEnabled = data.model.status == 'active' ? true : false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  private trackProductListFiltered = (filterdata: any, data: any): boolean => {
    if (!filterdata) {
      return false;
    }

    const filtersApplied = [];

    for (const key in filterdata) {
      if (filterdata[key] && filterdata[key].length) {
        const value = Array.isArray(filterdata[key]) ? filterdata[key] : filterdata[key].split('.');

        filtersApplied.push({ type: key, value });
      }
    }

    this.segmentService.ProductListFiltered(
      this.plpConfig.parentCategoryValue,
      this.plpConfig.childCategoryValue,
      filtersApplied,
      data,
      this.plpConfig
    );

    return true;
  };

  private trackUserActivity(): void {
    this.spinnerService.show();
    let hasFilterApplied = false;

    this._productService.setHitObservable.pipe(takeUntil(this.onDestroy$), debounceTime(2000)).subscribe(data => {
      if (!data) {
        throw new Error('No data returned from Algolia');
      }

      if (!hasFilterApplied) {
        this.segmentService.ProductListViewed(this.plpConfig, this.routeData, data);
      }

      if (this.plpConfig.searchParameters.query) {
        this.segmentService.track('Products Searched', { query: this.plpConfig.searchParameters.query });
      }

      this.spinnerService.hide();

      this._FilterService.selectedFilterListObservable
        .pipe(take(1))
        .subscribe(filterdata => (hasFilterApplied = this.trackProductListFiltered(filterdata, data)));
    });
  }

  showFilter() {
    this.renderer.addClass(document.body, 'noScroll');
    this.ifResponsiveFiltersOpen = true;
  }
  hideFilter() {
    this.renderer.removeClass(document.body, 'noScroll');
    this.ifResponsiveFiltersOpen = false;
  }

  categoriesTransformItems = items => {
    this.isCategorySelected = false;
    items.forEach(item => {
      if (item.isRefined) {
        this.isCategorySelected = true;
      }
    });

    return items;
  };

  // childCategoryValue
  childCategoriesTransformItems = items => {
    if (this.plpConfig.autoSelectChildCategory && this.plpConfig.childCategoryValue) {
      const categoryItem = items.find(item => item.value === this.plpConfig.childCategoryValue);

      if (categoryItem) {
        categoryItem.isRefined = true;
      }
    }

    this.isSubCategorySelected = false;
    items.forEach(item => {
      if (item.isRefined) {
        this.isSubCategorySelected = true;
      }
    });

    return items;
  };

  transformItems = items => {
    this._productService.setHit([...items]);
    this.dataLoaded = true;

    return items;
  };

  onToggleCollapse(name: string) {
    if (this.platformName === 'Mobile') {
      this.selectedList = name;
    }
  }

  collapseItem(selectedList: string): boolean {
    if ((this.platformName === 'Mobile' && this.selectedList === selectedList) || this.platformName === 'Desktop')
      return true;

    return false;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  transformCurrentRefinements = items => {
    items.forEach(i => {
      if (i.attribute == 'discount_percentage') {
        i.refinements[0].label += '%';
      }
      else if (i.attribute.includes('price')) {
        const { currencyCode, currencySymbol } = this.appConfig;
        const operators = {
          '<=': '≤',
          '>=': '≥',
        };

        i.refinements.forEach(refinement => {
          refinement.label = `${operators[refinement.operator]} ${formatCurrency(
            refinement.value,
            this.locale,
            currencySymbol,
            currencyCode
          )}`;
        });
      }
      else {
        i.refinements.forEach(j => {
          j.label = this.catalogDictionaryPipe.transform(j.label.split('-').join(' '));
        });
      }
    });

    return items;
  };
}
