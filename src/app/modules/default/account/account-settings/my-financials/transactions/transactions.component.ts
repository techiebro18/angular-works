import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '@services/user.service';
import { FinancialService } from '@services/financial.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCriteriaComponent } from '../../dialogs/search-criteria/search-criteria.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { LoaderService } from '@services/app/loader.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  public listVIewOption: 'list' | 'grid' = 'grid';
  public maxDate = new Date();
  @Input() isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() criteria: any = {};
  public transactionList: any;
  public searchForm: FormGroup = {} as FormGroup;
  public statusList = [
    { id: 0, name: 'All', value: '' },
    { id: 1, name: 'Pending', value: 'pending' },
    { id: 3, name: 'Completed', value: 'completed' },
    { id: 4, name: 'Cancelled', value: 'cancelled' },
    { id: 6, name: 'Failed', value: 'failed' },
    { id: 7, name: 'Withdraw', value: 'withdraw' },
  ];
  public dateRange: any;
  dateRangeValue = '';
  public pagination: any;
  pageEvent: PageEvent;
  user: any;
  sellerCurrency: string;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private financialService: FinancialService,
    private loaderService: LoaderService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.user = this.userService.getUserData().getValue();

    this.loaderService.triggerLoading.emit(true);
    const formData = new FormData();

    if (this.pageEvent) {
      formData.append('pageSize', this.pageEvent.pageSize.toString());
      formData.append('pageNumber', this.pageEvent.pageIndex.toString());
    }

    this.financialService.transactionList(this.user.id, formData).subscribe(
      (transactionList: any) => {
        this.transactionList = transactionList.list.data;
        this.pagination = transactionList.list;
        this.sellerCurrency = transactionList.sellerCurrency;
        this.loaderService.triggerLoading.emit(false);
      },
      error => {
        this.loaderService.triggerLoading.emit(false);
        this.router.navigate(['/sellers/login']);
      }
    );
    this.searchFormCreate();
  }
  public extractTxnFromJson(obj) {
    obj = JSON.parse(obj);

    return obj.destination_payment;
  }
  public searchFormCreate(): void {
    this.searchForm = this.formBuilder.group({
      order_item_id: [''],
      status: [''],
      date_from: [''],
      date_to: [''],
      stripe_id: [''],
    });
  }
  public searchList() {
    if (this.searchForm && !this.searchForm.invalid) {
      const formData = new FormData();

      for (const key in this.searchForm.value) {
        formData.append(key, this.searchForm.value[key]);
      }

      if (this.dateRange) {
        const { dateRange = {} } = this.dateRange || {};
        let { toDate, fromDate } = dateRange;

        toDate = toDate ? moment.default(toDate).format('DD/MM/YYYY') : toDate;
        fromDate = fromDate ? moment.default(fromDate).format('DD/MM/YYYY') : fromDate;
        formData.append('date_from', fromDate);
        formData.append('date_to', toDate);
      }

      if (this.pageEvent) {
        formData.append('pageSize', this.pageEvent.pageSize.toString());
        formData.append('pageNumber', this.pageEvent.pageIndex.toString());
      }

      this.loaderService.triggerLoading.emit(true);
      this.financialService.transactionList(this.user.id, formData).subscribe(
        (transactionList: any) => {
          this.transactionList = transactionList.list.data;
          this.pagination = transactionList.list;
          this.loaderService.triggerLoading.emit(false);
        },
        error => {
          this.loaderService.triggerLoading.emit(false);
          this.router.navigate(['/sellers/login']);
        }
      );
    }
  }
  public onDateClick() {
    this.renderer.removeClass(document.body, 'datePickerCenter');
    this.renderer.addClass(document.body, 'datePickerDefault');

    const ref = this.dialog.open(SearchCriteriaComponent, {
      data: {},
    });

    ref.afterClosed().subscribe(criteria => {
      this.dateRange = criteria;

      if (this.dateRange) {
        const { dateRange = {} } = this.dateRange || {};
        let { toDate, fromDate } = dateRange;

        toDate = toDate ? moment.default(toDate).format('DD/MM/YYYY') : toDate;
        fromDate = fromDate ? moment.default(fromDate).format('DD/MM/YYYY') : fromDate;
        this.dateRangeValue = fromDate + ' - ' + toDate;
      }
      else {
        this.dateRangeValue = '';
      }
    });
  }
  public getData(event?: PageEvent) {
    this.pageEvent = event;
    this.searchList();
  }

  public isOverflow(el: HTMLElement): boolean {
    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden';

    const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  }
}
