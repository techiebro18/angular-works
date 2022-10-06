import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '@services/user.service';
import { FinancialService } from '@services/financial.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCriteriaComponent } from '../../dialogs/search-criteria/search-criteria.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { LoaderService } from '@services/app/loader.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment, default as _rollupMoment } from 'moment';

const momentConst = _rollupMoment || moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};
@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PayoutsComponent implements OnInit {
  public listVIewOption: 'list' | 'grid' = 'grid';
  @Input() isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() criteria: any = {};
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public payoutList: any;
  public payoutDetailSeo: any;
  public searchForm: FormGroup = {} as FormGroup;
  public statusList = [
    { id: 0, name: 'All', value: '' },
    { id: 1, name: 'Pending', value: 'pending' },
    { id: 2, name: 'Paid', value: 'paid' },
    { id: 3, name: 'Cancelled', value: 'canceled' },
    { id: 4, name: 'Failed', value: 'failed' },
  ];
  public dateRange: any;
  public dateRangeValue = '';
  public pagination: any;
  public pageEvent: PageEvent;
  public lastObj: any;
  public firstObj: any;
  public nextButton = false;
  public prevButton = false;
  public defaultPageSize = 5;
  public pageSizeChange = false;
  public pageIndex: number;
  public message: any;
  public maxDate = new Date();
  public payoutData: any;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private financialService: FinancialService,
    private _router: Router,
    private loaderService: LoaderService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.payoutDetailSeo = '/account/payout-detail';
    this.loadData();
  }
  loadData() {
    const user = this.userService.getUserData().getValue();

    this.loaderService.triggerLoading.emit(true);
    const formData = new FormData();

    if (this.pageEvent) {
      formData.append('pageSize', this.pageEvent.pageSize.toString());
      formData.append('pageNumber', this.pageEvent.pageIndex.toString());
    }

    if (this.pageIndex != 0) {
      if (this.prevButton === true && this.firstObj && this.pageSizeChange === false) {
        formData.append('ending_before', this.firstObj.id);
      }
    }

    if (this.nextButton === true && this.lastObj && this.pageSizeChange === false) {
      formData.append('starting_after', this.lastObj.id);
    }

    this.financialService.payoutList(user.id, formData).subscribe(
      (payoutList: any) => {
        this.message = payoutList.message;

        if (Array.isArray(payoutList.list.data) === true) {
          this.payoutList = payoutList.list.data
            ? payoutList.list.data
            : '';

          if (this.payoutList) {
            this.lastObj = this.payoutList[this.payoutList.length - 1];
            this.firstObj = this.payoutList[0];
          }

          this.pagination = payoutList.list;
          this.payoutData = null;
        }
        else {
          this.payoutData = payoutList.list;
          this.payoutList = null;
        }

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
  public goToDetails(payoutId): void {
    this._router.navigate([this.payoutDetailSeo + '/', payoutId]);
  }
  public searchFormCreate(): void {
    this.searchForm = this.formBuilder.group({
      order_item_id: [''],
      status: [''],
      arrival_date: [''],
      stripe_id: [''],
    });
  }
  public searchList() {
    if (this.searchForm && !this.searchForm.invalid) {
      const formData = new FormData();

      for (const key in this.searchForm.value) {
        if (key == 'arrival_date') {
          const arrival_date = this.searchForm.value[key]
            ? moment.default(this.searchForm.value[key]).format('YYYY-MM-DD')
            : this.searchForm.value[key];

          formData.append(key, arrival_date);
        }
        else {
          formData.append(key, this.searchForm.value[key]);
        }
      }

      if (this.pageEvent) {
        formData.append('pageSize', this.pageEvent.pageSize.toString());
        formData.append('pageNumber', this.pageEvent.pageIndex.toString());
      }

      if (this.pageIndex != 0) {
        if (this.prevButton === true && this.firstObj && this.pageSizeChange === false) {
          formData.append('ending_before', this.firstObj.id);
        }
      }

      if (this.nextButton === true && this.lastObj && this.pageSizeChange === false) {
        formData.append('starting_after', this.lastObj.id);
      }

      const user = this.userService.getUserData().getValue();

      this.loaderService.triggerLoading.emit(true);
      this.financialService.payoutList(user.id, formData).subscribe(
        (payoutList: any) => {
          this.message = payoutList.message;

          if (Array.isArray(payoutList.list.data) === true) {
            this.payoutList = payoutList.list.data
              ? payoutList.list.data
              : '';

            if (this.payoutList) {
              this.lastObj = this.payoutList[this.payoutList.length - 1];
              this.firstObj = this.payoutList[0];
            }

            this.pagination = payoutList.list;
            this.payoutData = null;
          }
          else {
            this.payoutData = payoutList.list;
            this.payoutList = null;
          }

          this.loaderService.triggerLoading.emit(false);
        },
        error => {
          this.loaderService.triggerLoading.emit(false);
          this.router.navigate(['/sellers/login']);
        }
      );
    }
    else {
      this.loadData();
    }
  }
  public onDateClick() {
    const ref = this.dialog.open(SearchCriteriaComponent, {
      data: {},
    });

    ref.afterClosed().subscribe(criteria => {
      this.dateRange = criteria;

      if (this.dateRange) {
        const { dateRange = {} } = this.dateRange || {};
        let { toDate, fromDate } = dateRange;

        toDate = toDate
          ? moment.default(toDate).format('DD/MM/YYYY')
          : toDate;
        fromDate = fromDate
          ? moment.default(fromDate).format('DD/MM/YYYY')
          : fromDate;
        this.dateRangeValue = fromDate + ' - ' + toDate;
      }
      else {
        this.dateRangeValue = '';
      }
    });
  }
  public getData(event?: PageEvent) {
    this.pageEvent = event;

    this.pageIndex = event.pageIndex;

    if (event.pageIndex >= event.previousPageIndex) {
      this.nextButton = true;
      this.prevButton = false;
    }
    else {
      this.prevButton = true;
      this.nextButton = false;
    }

    if (this.defaultPageSize !== this.pageEvent.pageSize) {
      this.pageSizeChange = true;
      this.paginator.pageIndex = 0;
      this.defaultPageSize = this.pageEvent.pageSize;
    }
    else {
      this.pageSizeChange = false;
    }

    this.searchList();
  }
  public disableSearchFields(event) {
    if (event.target.value !== '') {
      this.searchForm.controls['arrival_date'].disable();
      this.searchForm.controls['status'].disable();
      this.searchForm.controls.status.setValue('');
      this.searchForm.controls.arrival_date.setValue('');
    }
    else {
      this.searchForm.controls['arrival_date'].enable();
      this.searchForm.controls['status'].enable();
    }
  }
  public addPayoutClass() {
    this.renderer.removeClass(document.body, 'datePickerDefault');
    this.renderer.addClass(document.body, 'datePickerCenter');
  }
}
