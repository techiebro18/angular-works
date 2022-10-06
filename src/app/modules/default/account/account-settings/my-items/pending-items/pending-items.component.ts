import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '@services/app/dialog.service';
import { ProductService } from '@services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApprovalStatusEnum } from '@shared/constants/product-approval-statuses';
import { MyItemsDeleteDialogComponent } from '../../dialogs/my-items-delete-dialog/my-items-delete-dialog.component';
import { Subscription, map, of, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductHelper } from '../product-helper';
import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';
import { MyItemsPagination } from '../my-items-pagination.interface';

@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html',
  styleUrls: ['./pending-items.component.scss'],
})
export class PendingItemsComponent implements OnInit, OnDestroy {
  items: ProductSearchResponseModel[] = [];
  itemsCache: ProductSearchResponseModel[] = [];
  quickSearchTerm = '';
  paginationConfig: MyItemsPagination;
  myItemsHelper: ProductHelper;
  private subscriptions$: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private spinnerService: NgxSpinnerService
  ) {
    this.myItemsHelper = new ProductHelper();
    this.paginationConfig = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
  }

  ngOnInit() {
    this.loadItems();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions$) {
      if (sub) sub.unsubscribe();
    }
  }

  loadItems(): void {
    this.spinnerService.show();

    this.subscriptions$.push(
      zip(
        this.productService.getProductsCount(this.getProductSearchFilter()),
        this.productService.getProducts(this.getProductSearchFilter())
      )
        .pipe(map(([totalRowsCount, rows]) => ({ totalRowsCount, rows })))
        .subscribe(result => {
          this.items = result.rows;
          this.paginationConfig.totalItems = result.totalRowsCount;
          this.itemsCache = this.items;
          this.spinnerService.hide();
        })
    );
  }

  private getProductSearchFilter() {
    return {
      approval_status: ProductApprovalStatusEnum.PENDING,
      draft: true,
      page: this.paginationConfig.currentPage - 1,
      size: this.paginationConfig.itemsPerPage,
    };
  }

  onQuickSearchItems(): void {
    of(this.quickSearchTerm)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        if (this.quickSearchTerm || this.quickSearchTerm !== '') {
          this.items = this.items.filter(_ => _.name.toLowerCase().includes(this.quickSearchTerm.toLowerCase()));
        }
        else {
          this.items = this.itemsCache;
        }
      });
  }

  onOpenDeleteDialog(item: ProductSearchResponseModel): void {
    this.subscriptions$.push(
      this.dialogService
        .open(MyItemsDeleteDialogComponent, { item })
        .afterClosed()
        .subscribe(() => {
          this.loadItems();
        })
    );
  }

  onPageChange(nextPage: number): void {
    this.paginationConfig.currentPage = nextPage;
    this.loadItems();
  }
}
