import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.scss'],
})
export class CardMemberComponent implements OnInit {
  @Input() public instantsearchConfig: any;
  @Input() public plpConfig: any;
  public ifResponsiveFiltersOpen = false;

  public onDestroy$ = new Subject();

  public isCategorySelected = false;
  public isSubCategorySelected = false;
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

  constructor(
    private renderer: Renderer2,
    public authService: AuthService,
    public _productService: ProductService,
    private translateService: TranslateService,
    private segmentService: SegmentService,
    private _FilterService: FilterService,
    private mobileService: MobileService,
    private activatedRoute: ActivatedRoute
  ) {
    // translate the sortBy labels
    this.sortByItems.map(sortBy => {
      this.translateService
        .get(sortBy.label)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((res: string) => {
          sortBy.label = res;
        });
    });

    this.mobileService.isMobile$.pipe(takeUntil(this.onDestroy$)).subscribe(isMobile => {
      this.platformName = isMobile
        ? 'Mobile'
        : 'Desktop';
    });

    this.mobileService.isMobile$.pipe(takeUntil(this.onDestroy$)).subscribe(isMobile => {
      this.platformName = isMobile
        ? 'Mobile'
        : 'Desktop';
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'noHorizontalScroll');
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
  }

  showFilter() {
    this.ifResponsiveFiltersOpen = true;
  }
  hideFilter() {
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

    return items;
  };

  onToggleCollapse(name: string) {
    if (this.platformName === 'Mobile') {
      this.selectedList = name;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
