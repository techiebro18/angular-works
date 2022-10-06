import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductService } from '@services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductActiveStatusEnum, ProductApprovalStatusEnum } from '@shared/constants/product-approval-statuses';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccountService } from '@services/account.service';
import { SellerSoldItemsResponseModel, SoldItem } from '@shared/models/seller-sold-items-response.model';
import { SoldItemTravelLineComponent } from './sold-item-travel-line/sold-item-travel-line.component';
import { ScreenDetectorService } from '@services/app/screen-detector.service';
import { MyItemsPagination } from '../my-items-pagination.interface';

interface SoldItemRow extends SoldItem {
  isTravelLineExpanded?: boolean;
}

@Component({
  selector: 'tvb-sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.scss'],
})
export class SoldItemsComponent implements OnInit, OnDestroy {
  @ViewChildren(SoldItemTravelLineComponent) travelLines: QueryList<SoldItemTravelLineComponent>;
  private subscriptions$: Subscription[] = [];
  items: SoldItemRow[] = [];
  itemsCache: SoldItemRow[] = [];
  quickSearchTerm = '';
  paginationConfig: MyItemsPagination;
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  statuses = ['processing', 'pending', 'ready_for_shipping'];

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private screenSizeDetector: ScreenDetectorService
  ) {
    this.paginationConfig = {
      currentPage: 0,
      itemsPerPage: 10,
      totalItems: 0,
    };
  }

  ngOnInit() {
    this.isMobile$ = this.screenSizeDetector.isMobile;
    this.loadItems();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions$) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

  loadItems(): void {
    this.spinner.show();

    this.subscriptions$.push(
      this.accountService
        .getSoldItems(this.getProductSearchFilter())
        .subscribe((response: SellerSoldItemsResponseModel) => {
          this.items = response.orderlist;
          this.paginationConfig.totalItems = response.totalrow;
          this.itemsCache = this.items;
          this.spinner.hide();
          this.itemsOpenByStatus();
        })
    );
  }

  onQuickSearchItems(): void {
    of(this.quickSearchTerm)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        if (this.quickSearchTerm || this.quickSearchTerm !== '') {
          this.items = this.items.filter(_ => {
            return (
              _.product_name.toLowerCase().includes(this.quickSearchTerm)
              || _.order_item_id.toString().includes(this.quickSearchTerm)
            );
          });
        }
        else {
          this.items = this.itemsCache;
        }
      });
  }

  getPriceOnSite(item: SoldItemRow): number {
    return item[`regular_price_${item.base_currency}`];
  }

  getForYouPrice(item: SoldItemRow): number {
    return item[`cost_of_good_${item.base_currency}`];
  }

  getDiscountPrice(item: SoldItemRow): number {
    return item[`discounted_price_${item.base_currency}`];
  }

  private getProductSearchFilter() {
    return {
      approval_status: ProductApprovalStatusEnum.SOLD,
      draft: false,
      fromStock: 1,
      pageNumber: this.paginationConfig.currentPage,
      itemsPerPage: this.paginationConfig.itemsPerPage,
      status: ProductActiveStatusEnum.ACTIVE,
      pageSize: 10,
    };
  }

  expandItem(item: SoldItemRow): void {
    item.isTravelLineExpanded = !item.isTravelLineExpanded;

    this.travelLines.forEach(viewChild => {
      if (viewChild.soldItemId == item.order_item_id) {
        viewChild.loadPayoutDetails(item.order_item_id);
      }
    });
  }

  onPageChange(nextPage: number): void {
    this.paginationConfig.currentPage = nextPage;
    this.loadItems();
  }

  itemsOpenByStatus(): void {
    this.items.forEach(item => {
      if (this.statuses.includes(item.order_item_status)) {
        this.expandItem(item);
      }
    });
  }
}
