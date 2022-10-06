import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderDetailService } from '@services/order-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import { DialogService } from '@services/app/dialog.service';
import { ResellForFreeDialogComponent } from '../dialogs/resell-for-free-dialog/resell-for-free-dialog.component';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-my-orders-details',
  templateUrl: './my-orders-details.component.html',
  styleUrls: ['./my-orders-details.component.scss'],
})
export class MyOrdersDetailsComponent implements OnInit {
  baseUrl = environment.baseUrl;
  orderItems: any;
  fmt: any;
  orderDetail: any;
  regularPrice: any;
  itemTotal: any;
  itemSubTotal: any = 0;
  itemTaxTotal: any = 0;
  itemTotalFinal = 0;
  itemSubTotalFinal = 0;
  itemTaxTotalFinal = 0;
  itemDiscountFinal = 0;
  itemShippingFinal = 0;
  returnModel = false;
  invalidAddress: boolean;
  cntry_return_amnt: any;
  final_refund: any;
  total_item_amt: any;
  discount_amount: any;
  order_item_id: any;
  orderItem: any;
  selected_item: any;
  selected_item1: any;
  final_refund_amount: any;
  discountshow: boolean;
  total_amt: any;
  country_refund_amount: any;
  validAddress: boolean;
  country_data: any;
  confirmModal = false;
  @ViewChild('returnReason') returnReason: ElementRef;
  return_reason: any;
  resonMsg: string;
  refundstep2 = false;
  refundstep1 = true;
  return_policy: any;
  confirmrefundbtn = false;
  appConfig: {
    currencyID: number;
    currencyCode: string;
    currencySymbol: string;
    languageID: number;
    languageName: string;
    languageShortName: string;
    countryID: number;
    countryName: string;
    countrycode: string;
    configuration: number;
  };
  confirmMessage: string;
  user: any;
  isOnbordingDone: any;
  resell_item: any;
  resellModal: boolean;
  return_message: any;
  return_tracking_url: any;
  loading: boolean;
  resellModalOnboarding: boolean;
  resellConfirmMessage: string;
  resellModalConfirm: boolean;

  appServiceSubscription: Subscription;
  getOrderItemDetailSubscription: Subscription;
  getUserDataSubcription: Subscription;
  getRefundAmoutSubscription: Subscription;
  privateSellerItemResellSubscription: Subscription;
  orderCancelSubscription: Subscription;
  saveReturnSubscription: Subscription;
  itemResellSubscription: Subscription;
  resellConfirmSuccessMsg: string;
  resellModalSuccessMsg = false;
  roundOffDiffrence = 0;
  constructor(
    private orderService: OrderDetailService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    const orderId: number = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

    this.metaService.getStaticPageMeta('account/order-detail/' + orderId, '', 'Order Details');
    this.loadData();
  }

  public loadData(): void {
    this.loading = true;
    const orderId: number = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

    this.itemTotalFinal = 0;
    this.itemSubTotalFinal = 0;
    this.itemTaxTotalFinal = 0;
    this.itemDiscountFinal = 0;
    this.itemShippingFinal = 0;
    this.roundOffDiffrence;
    this.getOrderItemDetailSubscription = this.orderService.getOrderDetail(orderId).subscribe((order: any) => {
      this.orderItems = order;
      this.country_data = order.country_data;
      this.orderDetail = order.data;
      this.orderItems.orders.order_item.forEach(obj => {
        this.itemTotalFinal += obj.regular_price;
        this.itemSubTotal += obj.regular_price + obj.shippeing_cost - obj.item_discount;
        this.itemDiscountFinal += obj.item_discount;
        this.itemShippingFinal += obj.shippeing_cost;
        this.loading = false;
      });
      this.roundOffDiffrence = this.orderItems.orders.orderTotalAmount - this.itemSubTotal;
      this.itemTotalFinal = this.itemTotalFinal + this.roundOffDiffrence;
      this.itemSubTotal = this.itemSubTotal + this.roundOffDiffrence;
      this.itemSubTotalFinal = this.itemSubTotal;
      this.itemTaxTotalFinal = this.itemSubTotal;
    });
  }

  calculateReturn(formData) {
    this.returnModel = true;
    this.invalidAddress = false;
    this.loading = true;
    this.getRefundAmoutSubscription = this.orderService.getRefundAmout(formData).subscribe((returnData: any) => {
      if ((returnData.status = 'success')) {
        this.cntry_return_amnt = returnData.country_refund_amount;
        this.final_refund = returnData.final_refund_amount;
        this.total_item_amt = returnData.item_total;
        this.discount_amount = returnData.discount_amount;
        this.order_item_id = this.orderItem.id;
        this.selected_item = returnData.selected_item;
        this.selected_item1 = returnData.selected_item;
        this.final_refund_amount = returnData.final_refund_amount;
        this.discountshow = this.discount_amount !== 0
          ? true
          : false;
        this.total_amt = returnData.item_total;
        this.country_refund_amount = returnData.country_refund_amount;
        this.invalidAddress = returnData.validateAddressForPickup === false
          ? true
          : false;
        this.validAddress = returnData.validateAddressForPickup === false
          ? false
          : true;
      }

      this.loading = false;
    });
  }

  nextbtnrefund(): void {
    this.return_reason = this.returnReason.nativeElement.value;

    if (this.return_reason === '') {
      this.resonMsg = 'Please select reason of return';
      this.confirmrefundbtn = false;
    }
    else {
      this.resonMsg = '';
      this.refundstep2 = true;
      this.refundstep1 = false;
    }
  }

  returnorderItem(data) {
    this.orderItem = data;
  }

  cancelOrder(data): void {
    this.orderItem = data;
    this.confirmModal = true;
    this.confirmMessage = 'Are you sure want to cancel this order item ?';
  }

  cancelOrderConfirm(): void {
    const formData = { orderItemId: this.orderItem.id };
    const postData = { ...formData, ...this.appConfig };

    this.orderCancelSubscription = this.orderService.order_cancel(postData).subscribe(
      (responseData: any) => {
        if (responseData.status == 'success') {
          this.confirmModal = false;
          this.return_message = responseData.message;
          this.loadData();
          window.location.reload();
        }
        else {
          this.confirmModal = false;
          this.return_message = responseData.message;
        }
      },
      error => {
        this.confirmModal = false;
        this.return_message = 'Something went wrong please try again later';
      }
    );
  }

  closePopup(popUpId): void {
    switch (popUpId) {
      case 'returnModel':
        this.returnModel = false;
        break;
      case 'confirmModal':
        this.confirmModal = false;
        break;
      case 'resellModal':
        this.resellModal = false;
        break;
      case 'resellModalConfirm':
        this.resellModalConfirm = false;
        break;
      case 'resellModalOnboarding':
        this.resellModalOnboarding = false;
        break;
      case 'resellModalSuccessMsg':
        this.resellModalSuccessMsg = false;
        this.ngOnInit();
        break;
      default:
        break;
    }
  }

  returnPolicyClick(event): void {
    this.return_policy = event.target.checked;
    this.confirmrefundbtn = this.return_policy === true
      ? true
      : false;
  }

  saveReturn(): void {
    const formData = {
      item_id: this.orderItem.id,
      country_id: this.orderDetail.country_id,
      return_reason: this.return_reason,
      return_policy: this.return_policy,
    };
    const postData = { ...formData, ...this.appConfig };

    this.loading = true;
    this.saveReturnSubscription = this.orderService.saveReturn(postData).subscribe(
      (returnData: any) => {
        if ((returnData.status = 'success')) {
          this.returnModel = false;
          this.return_message = returnData.status.status_msg;
          window.location.reload();
        }

        if ((returnData.status = 'error')) {
          this.returnModel = false;
          this.return_message = returnData.status.status_msg;
        }

        this.loading = false;
      },
      error => {
        this.returnModel = false;
        this.return_message = 'Something went wrong please try again later';
        this.loading = false;
      }
    );
  }

  reSellOrderItem(data): void {
    this.orderItem = data;
    this.resellModal = true;
    const formData = { orderItemId: this.orderItem.id, productId: this.orderItem.productId };
    const postData = { ...formData, ...this.appConfig };

    this.loading = true;
    this.privateSellerItemResellSubscription = this.orderService
      .private_seller_item_resell(postData)
      .subscribe((responseData: any) => {
        this.resell_item = responseData.selected_item;
        this.loading = false;
      });
  }

  resellAgree(): void {
    if (this.isOnbordingDone === 'no') {
      this.resellConfirmMessage = 'you did not complete payment onbording proccess. Please complete it first';
      this.resellModalOnboarding = true;
      this.resellModal = false;
    }
    else {
      this.resellModalConfirm = true;
      this.resellModal = false;
      this.resellConfirmMessage = 'Are you sure want to resell this order item ?';
    }
  }

  resellOnboardingConfirm(): void {
    this.router.navigate(['account/get-paid/re-sell/' + this.orderItem.orderId]);
  }

  resellAgreeConfirm(): void {
    const formData = { orderItemId: this.orderItem.id, productId: this.orderItem.productId };
    const postData = { ...formData, ...this.appConfig };

    this.loading = true;
    this.itemResellSubscription = this.orderService.item_resell(postData).subscribe((responseData: any) => {
      this.resellConfirmSuccessMsg = responseData.error_message;
      this.resell_item = responseData.selected_item;
      this.resellModalConfirm = false;
      this.resellModalSuccessMsg = true;
      this.loading = false;
    });
  }

  public backButtonReturn() {
    this.returnModel = true;
    this.invalidAddress = false;
    this.refundstep2 = false;
    this.refundstep1 = true;
  }

  ngOnDestroy() {
    this.appServiceSubscription?.unsubscribe();
    this.getOrderItemDetailSubscription?.unsubscribe();
    this.getUserDataSubcription?.unsubscribe();
    this.getRefundAmoutSubscription?.unsubscribe();
    this.privateSellerItemResellSubscription?.unsubscribe();
    this.orderCancelSubscription?.unsubscribe();
    this.saveReturnSubscription?.unsubscribe();
    this.itemResellSubscription?.unsubscribe();
  }

  public onResellForFree(data): void {
    this.dialogService
      .open(ResellForFreeDialogComponent, { ...data })
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      });
  }
}
