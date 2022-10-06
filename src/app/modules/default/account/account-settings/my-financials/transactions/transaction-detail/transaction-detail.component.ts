/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { FinancialService } from '@services/financial.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '@services/app/loader.service';
import { billingAddress } from '@services/order-detail';
@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  public listVIewOption: 'list' | 'grid' = 'grid';
  public transactionList: any;
  public invoiceSaleDetails: any;
  public invoiceCommissionDetails: any;
  public invoiceRefundDetails: any;
  public env = environment;
  downloadJsonHref: any;
  invoice: any;
  invoiceCommission: any;
  invoiceRefund: any;
  billing_address: billingAddress;
  isRefund: any;
  constructor(
    private userService: UserService,
    private financialService: FinancialService,
    private _activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService
  ) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ngOnInit() {
    this.loadData();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  loadData() {
    const id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

    this.loaderService.triggerLoading.emit(true);
    this.financialService.transactionDetail(id).subscribe((transactionListData: any) => {
      this.transactionList = transactionListData;
      this.transactionList['invoice'].map(element => {
        this.invoice = element;
      });
      this.billing_address = this.transactionList['billing_address'] ? this.transactionList['billing_address'][0] : '';

      this.loaderService.triggerLoading.emit(false);
    });
  }
}
