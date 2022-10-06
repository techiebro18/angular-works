import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { orderItem } from '@shared/order-item-detail';
import { ItemDetailService } from '@services/item-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type SellerCancelItemDialogOptions = {
  title: string;
  item: orderItem;
  eventType: string;
};

@Component({
  selector: 'app-seller-cancel-dialog',
  templateUrl: './seller-cancel-dialog.component.html',
  styleUrls: ['./seller-cancel-dialog.component.scss'],
})
export class SellerCancelDialogComponent implements OnInit {
  item: orderItem;
  priceOnSite: number;
  priceForYou: number;
  sellerPreferredCurrency: string;
  cancelReason: string;
  reStock: string;
  public cancelSoldItemForm: FormGroup = {} as FormGroup;
  submitted = false;
  _cancekTypeOpts = [
    { label: 'Select Type', value: '' },
    { label: 'Product not available in stock', value: 'Product not available in stock' },
    { label: 'Price mismatch', value: 'Price mismatch' },
    { label: 'Wrong product', value: 'Wrong product' },
    { label: 'Other', value: 'Other' },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SellerCancelItemDialogOptions,
    private mdDialogRef: MatDialogRef<SellerCancelDialogComponent>,
    private formBuilder: FormBuilder,
    private itemDetailService: ItemDetailService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.item = this.data.item;
    this.priceOnSite = this.item.seller_information_details.preferred_currency_code
      ? this.item.is_discount
        ? this.item['discounted_price_' + this.item.seller_information_details.preferred_currency_code]
        : this.item['regular_price_' + this.item.seller_information_details.preferred_currency_code]
      : this.item['regular_price_' + this.item.base_currency];
    this.priceForYou = this.item.seller_information_details.preferred_currency_code
      ? this.item['cost_of_good_' + this.item.seller_information_details.preferred_currency_code]
      : this.item['cost_of_good_' + this.item.base_currency];
    this.sellerPreferredCurrency
      = this.item.seller_information_details.preferred_currency_code ?? this.item.base_currency;

    this.cancelSoldItemFormCreate();
  }

  public cancelSoldItemFormCreate(): void {
    this.cancelSoldItemForm = this.formBuilder.group({
      orderItemId: [this.item.id],
      cancelReason: ['', Validators.required],
      reStockItem: ['', Validators.required],
    });
  }

  public close(value): void {
    this.mdDialogRef.close(value);
  }

  public cancel(): void {
    this.close(false);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.cancelSoldItemForm.invalid) {
      return;
    }

    const object = {};
    const formOrderItemCancelItem = new FormData();

    for (const key in this.cancelSoldItemForm.value) {
      formOrderItemCancelItem.append(key, this.cancelSoldItemForm.value[key]);
    }

    formOrderItemCancelItem.forEach((value, key) => (object[key] = value));
    this.itemDetailService.cancelItem(formOrderItemCancelItem).subscribe({
      next: (response: { status: string; message: string }) => {
        this.snackBar.open(response.message, 'x', { duration: 10000 });
        this.close(true);
      },
      error: () => {
        this.snackBar.open('Something went wrong. Please contact support team.', 'x', { duration: 60000 });
      },
    });
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }
}
