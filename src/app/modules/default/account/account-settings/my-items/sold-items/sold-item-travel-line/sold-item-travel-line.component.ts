import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ItemPayoutResponseModel, ItemTravelStep, OrderItem } from '@shared/models/item-payout-response.model';
import { ItemDetailService } from '@services/item-detail.service';
import { environment } from '@environments/environment';
import { DialogService } from '@services/app/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'tvb-sold-item-travel-line',
  templateUrl: './sold-item-travel-line.component.html',
  styleUrls: ['./sold-item-travel-line.component.scss'],
})
export class SoldItemTravelLineComponent implements OnDestroy, OnInit {
  @Input() soldItemId: number;
  @Input() expanded: boolean;
  itemTravelLine: ItemTravelStep[];
  orderItem: OrderItem;
  dhlShipmentLabelLink: string;
  commissionInvoiceLink: string;

  constructor(
    private itemDetailService: ItemDetailService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) {
    this.orderItem = undefined;
    this.commissionInvoiceLink = '';
    this.dhlShipmentLabelLink = '';
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    if (this.expanded) {
      this.loadPayoutDetails(this.soldItemId);
    }
  }

  loadPayoutDetails(soldItemId: number, force = false): void {
    if (this.orderItem && !force) {
      return null;
    }

    this.itemDetailService
      .getPayoutDetails(soldItemId)
      .subscribe((itemPayoutResponseModel: ItemPayoutResponseModel) => {
        if (itemPayoutResponseModel) {
          this.orderItem = itemPayoutResponseModel.orderItem;
          this.commissionInvoiceLink = this.getInvoiceUrl('commission', itemPayoutResponseModel.orderItem);
          this.dhlShipmentLabelLink = itemPayoutResponseModel.orderItem?.orderItemShipmentTracking?.dhl_label || '';
          this.itemTravelLine = itemPayoutResponseModel.itemTravelLine;
        }

        this.expanded = true;
      });
  }

  private getInvoiceUrl(invoiceType: string, item: OrderItem): string {
    if (['completed', 'refund_overdue', 'refund_pending'].includes(item.status)) {
      if (invoiceType === 'commission') {
        return item.commissionInvoicelink
          ? environment.Finance_Base_Url + 'invoice/' + item.commissionInvoicelink + '/pdf'
          : '';
      }

      return '';
    }

    return '';
  }

  openCancelDialog(): void {
    this.dialogService.openSellerItemCancelDialog({
      title: 'Are you sure you want to cancel this item?',
      item: this.orderItem,
      eventType: 'cancelSoldItem',
    });

    this.dialogService.sellerItemCancelConfirmedDialog().subscribe((confirmed: any) => {
      if (confirmed) {
        this.loadPayoutDetails(this.soldItemId, true);
      }
    });
  }
}
