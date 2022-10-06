import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from '@services/app/dialog.service';
import { ProductService } from '@services/product.service';
import { MyOffersComponent } from 'src/app/modules/default/account/account-settings/my-offers/my-offers.component';
import { PriceDropComponent } from 'src/app/modules/default/account/account-settings/dialogs/price-drop/price-drop.component';
import { ProductItemEditDialogComponent } from 'src/app/modules/default/account/account-settings//dialogs/product-item-edit-dialog/product-item-edit-dialog.component';
import { ProductApproval } from '@schemas/product';
import { Router } from '@angular/router';

@Component({
  selector: 'tvb-seller-vision',
  templateUrl: './seller-vision.component.html',
  styleUrls: ['./seller-vision.component.scss'],
})
export class SellerVisionComponent implements OnInit {
  @Input() makeOfferEnabled: boolean;
  @Input() sellerOfferEnabled: boolean;
  @Input() product: any;
  @Output('reloadProduct') reloadProduct: EventEmitter<any> = new EventEmitter();
  productItem: ProductApproval;
  public trashModel = false;
  public displayButton = true;
  public popUpHeading = '';

  constructor(private dialogService: DialogService, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.searchAndMap('id=' + this.product.id).subscribe((item: any) => {
      this.productItem = item && item[0] ? item[0] : {};
    });
  }

  openOffers(): void {
    this.dialogService.open(MyOffersComponent, {
      sellerId: this.product.commission_user_id,
      productId: this.product.id,
      width: '80%',
    });
  }

  public openPriceDropModal(): void {
    this.dialogService.open(PriceDropComponent, { productData: this.productItem, width: 'auto' });
  }

  public openEditModal(): void {
    this.dialogService
      .open(ProductItemEditDialogComponent, { productData: this.productItem, width: 'auto' })
      .afterClosed()
      .subscribe(result => {
        this.reloadProduct.emit();
      });
  }

  openTrashPopUp(): void {
    this.trashModel = true;
    this.popUpHeading = 'Are you sure you want to delete this item?';
    document.body.style.overflow = 'hidden';
  }

  trashProductItem(): void {
    this.deleteItem();
    this.displayButton = false;
    this.popUpHeading = 'ITEM DELETED';
  }

  deleteItem() {
    this.productService.deleteItem(this.product.id).subscribe((result: any) => {
      return result;
    });
  }

  hidePopUp(): void {
    this.trashModel = false;
    this.displayButton = true;
    document.body.style.overflow = 'auto';
  }
  refresh(): void {
    this.trashModel = false;
    this.displayButton = true;
    document.body.style.overflow = 'auto';
    this.router.navigate([`/${this.product.motherpage_seo_url}`]);
  }
}
