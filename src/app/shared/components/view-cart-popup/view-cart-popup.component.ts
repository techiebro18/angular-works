import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Offer, OfferPrice } from '@schemas/account/offer.interface';
import { OfferService } from '@services/account/offer.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-view-cart-popup',
  templateUrl: './view-cart-popup.component.html',
  styleUrls: ['./view-cart-popup.component.scss'],
})
export class ViewCartPopupComponent implements OnInit {
  private _currencyCode;
  private _language;

  @Output() backToShop: EventEmitter<void> = new EventEmitter();
  @Input() product: any;
  @Input() isInWishlist;

  public brand: string;
  public brandObj: any;
  public title: string;
  public style: string;
  public url: string;
  public price: number;
  public discountPrice: number;
  public regularPrices: OfferPrice[];
  public discountPrices: OfferPrice[];
  public user: any;
  public offer: Offer;
  baseRemoteUrl = '';

  constructor(
    private universalService: UniversalService,
    private offerService: OfferService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.price = this.product.price;
    this.discountPrice = this.product.discounted_price;
    this.brand = this.product.brand_name;
    this.title = this.product.name;
    this.style = this.product.brand_seo_url;
    this.discountPrices = this.product.discount_prices;
    this.user = this.userService.getUserData().getValue();

    if (this.user) this.getOffer();
  }

  getOffer() {
    this.offerService
      .getAcceptedProductOffer(this.user.id, this.product.id, this.currencyCode)
      .subscribe(response => {
        if (response?.data[0]?.offers[0].status === 'ACCEPTED') {
          this.offer = response.data[0].offers[0];
          this.product.is_discount = true;
          this.discountPrice = this.offer.price[this._currencyCode.toLowerCase()].value;
        }
      });
  }

  @Input() set language(value) {
    this._language = value;
    this.brandObj = this.product.parent_brand_seo_url.find(i => i.lang == value.toLowerCase());
    const styleSEO
      = this.product[`styles_seo_url_${this.language.toLowerCase()}`]
      || this.product.motherpage_seo_url;
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

    const regularPriceInst
      = this.product.regular_prices.find(item => item.currency === value) || {};
    const discountPriceInst
      = this.product.discount_prices.find(item => item.currency === value) || {};

    this._currencyCode = value;
    this.price = regularPriceInst.value;
    this.discountPrice = discountPriceInst.value;
  }

  get currencyCode(): string {
    return this._currencyCode;
  }

  viewShoppingBag(): void {
    this.router.navigate(['/cart/view-cart']);
  }

  close(): void {
    this.backToShop.emit();
  }
}
