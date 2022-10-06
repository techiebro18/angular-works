import { Component, OnInit } from '@angular/core';
import { FinancialService } from '@services/financial.service';
import { UserService } from '@services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { LoaderService } from '@services/app/loader.service';

@Component({
  selector: 'app-payout-details',
  templateUrl: './payout-details.component.html',
  styleUrls: ['./payout-details.component.scss'],
})
export class PayoutDetailsComponent implements OnInit {
  public payoutDetail: any;
  public pageEvent: PageEvent;
  public pagination: any;
  public payoutId: string;
  public balanceTransactionList: any;
  public message: any;
  public paymentDetail: any;
  public payoutOverview: any;

  constructor(
    private userService: UserService,
    private financialService: FinancialService,
    private _activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  public loadData(): void {
    const user = this.userService.getUserData().getValue();
    const payoutId = this._activatedRoute.snapshot.paramMap.get('id');

    this.loaderService.triggerLoading.emit(true);
    const formData = new FormData();

    if (this.pageEvent) {
      formData.append('pageSize', this.pageEvent.pageSize.toString());
      formData.append('pageNumber', this.pageEvent.pageIndex.toString());
    }

    this.financialService.getPayoutDetail(user.id, payoutId, formData).subscribe((res: any) => {
      this.payoutDetail = res.list.data
        ? res.list.data
        : '';
      this.message = res.message;
      this.balanceTransactionList = res.balanceTransactionList;
      this.paymentDetail = res.paymentDetail;
      this.pagination = res.list;
      this.payoutOverview = res.payoutOverview;
      this.loaderService.triggerLoading.emit(false);
    });
  }
  public getData(event?: PageEvent) {
    this.pageEvent = event;
    this.loadData();
  }
  public getAmount(paymentDetail) {
    for (const payment of this.paymentDetail) {
      if (paymentDetail.txn_id == payment.source_transfer || paymentDetail.id == payment.id) {
        return payment.amount / 100;
      }
    }

    return 0;
  }
  public getCurrency(paymentDetail) {
    for (const payment of this.paymentDetail) {
      if (paymentDetail.txn_id == payment.source_transfer || paymentDetail.id == payment.id) {
        return payment.currency;
      }
    }

    return '';
  }
  public getPaymentId(paymentDetail) {
    for (const payment of this.paymentDetail) {
      if (paymentDetail.txn_id == payment.source_transfer) {
        return payment.id;
      }
      else if (paymentDetail.id == payment.id) {
        return payment.source_transfer;
      }
    }

    return '';
  }
  public getStatus(paymentDetail) {
    for (const payment of this.paymentDetail) {
      if (paymentDetail.txn_id == payment.source_transfer || paymentDetail.id == payment.id) {
        return payment.status;
      }
    }

    return '';
  }
}
