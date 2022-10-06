import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OfferService } from '@services/account/offer.service';
import { DialogService } from '@services/app/dialog.service';
import { UserService } from '@services/user.service';
import { ConditionDialogComponent } from 'src/app/modules/catalog/components/dialogs/condition-dialog/condition-dialog.component';
import { OfferPrice } from '@schemas/account/offer.interface';
import { ClothesSizeDialogComponent } from 'src/app/modules/catalog/components/dialogs/clothes-size-popup-dialog/clothes-size-popup-dialog.component';
import { ShoesSizeDialogComponent } from 'src/app/modules/catalog/components/dialogs/shoes-size-popup-dialog/shoes-size-popup-dialog.component';
import { MobileService } from '@services/mobile.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details-heading',
  templateUrl: './product-details-heading.component.html',
  styleUrls: ['./product-details-heading.component.scss'],
})
export class ProductDetailsHeadingComponent implements OnInit {
  private _currencyCode;
  private _language;

  @Input() product: any;
  @Input() isInWishlist;

  dialogRef: MatDialogRef<any> | undefined;
  public brand: string;
  public brandObj: any;
  public title: string;
  public style: string;
  public url: string;
  public price: number;
  public discountPrice: number;
  public regularPrices: OfferPrice[];
  public discountPrices: OfferPrice[];
  public discountPercentage: string;
  public user: any;
  public offer: any;
  platform$: Observable<string>;
  public platfrm: any;
  public product_type: string;
  constructor(
    private dialogModalService: DialogService,
    private userService: UserService,
    private offerService: OfferService,
    private mobileService: MobileService
  ) {
    this.platform$ = this.mobileService.isMobile$.pipe(map(isMobile => (isMobile
      ? 'Mobile'
      : 'Desktop')));
  }

  ngOnInit(): void {
    this.getSettings();
    this.checkProductType();
  }

  getSettings(): void {
    this.price = this.product.price;
    this.discountPrice = this.product.discounted_price;
    this.brand = this.product.brand_name;
    this.title = this.product.name;
    this.style = this.product.brand_seo_url;
    this.discountPrices = this.product.discount_prices;

    if (this.product.is_discount) {
      this.discountPercentage = (((this.price - this.discountPrice) / this.price) * 100).toFixed(0);
    }

    this.user = this.userService.getUserData().getValue();

    if (this.user) this.getOffer();
  }

  getOffer() {
    this.offerService.getAcceptedProductOffer(this.user.id, this.product.id, this.currencyCode).subscribe(response => {
      if (response?.data[0]?.offers[0].status === 'ACCEPTED') {
        this.offer = response.data[0].offers[0];
        this.product.is_discount = true;
        this.discountPrice = this.offer.price[this.currencyCode.toLowerCase()].value;
      }
    });
  }

  @Input() set language(value) {
    this._language = value;
    this.brandObj = this.product.parent_brand_seo_url.find(i => i.lang == value.toLowerCase());
    const styleSEO = this.product[`styles_seo_url_${this.language.toLowerCase()}`] || this.product.motherpage_seo_url;
    const brandSEO = this.brandObj.value || this.product.parent_brand_seo_url[0].value;

    this.url = `${location.origin}/designer/${brandSEO}?style=${styleSEO}`;
  }

  get language() {
    return this._language;
  }

  @Input()
  set currencyCode(value) {
    if (!value) {
      this._currencyCode = this.product.base_currency;
      this.price = this.product.price;
      this.discountPrice = this.product.discounted_price;

      return;
    }

    const regularPriceInst = this.product.regular_prices.find(item => item.currency === value) || {};
    const discountPriceInst = this.product.discount_prices.find(item => item.currency === value) || {};

    this._currencyCode = value;
    this.price = regularPriceInst.value;
    this.discountPrice = discountPriceInst.value;
  }

  get currencyCode(): string {
    return this._currencyCode;
  }

  openConditionDialog(): void {
    this.dialogRef = this.dialogModalService.openAuthenticityPopup<ConditionDialogComponent>(ConditionDialogComponent);
  }

  openDialog() {
    this.dialogRef = this.dialogModalService.openSizePopup<ClothesSizeDialogComponent>(
      ClothesSizeDialogComponent,
      null
    );
  }
  openShoesDialog() {
    this.dialogRef = this.dialogModalService.openSizePopup<ShoesSizeDialogComponent>(ShoesSizeDialogComponent, null);
  }

  checkProductType() {
    if (this.product?.sizes[0]?.type?.includes('shoes')) {
      this.product_type = 'shoes';
    }
    else if (this.product?.sizes[0]?.type?.includes('cloth')) {
      this.product_type = 'clothes';
    }
  }
}
