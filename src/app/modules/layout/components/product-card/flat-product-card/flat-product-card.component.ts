import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PriceDropService } from '@services/account/price-drop.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { CookieService } from 'ngx-cookie-service';
import { PlpCurrencyData } from 'src/app/modules/catalog/pages/listing-view/plp-definitions';

@Component({
  selector: 'tvb-flat-product-card',
  templateUrl: './flat-product-card.component.html',
  styleUrls: ['./flat-product-card.component.scss'],
})
export class FlatProductCardComponent implements OnInit {
  @Input() public hit: any;
  @Input() public language: string;
  @Input() public currency: string;
  @Input() public currencySymbol: string;
  @Input() public source: string;
  @Input() public makeOfferEnabled = false;
  @Input() public offerSetting: any;
  @Input() public currencyConfig: PlpCurrencyData;
  @Output() callBack = new EventEmitter();

  constructor(
    private universalService: UniversalService,
    private priceDropService: PriceDropService
  ) {}

  public defaultImageUrl = 'https://thevintagebardev.imgix.net//?h=480&amp;w=480';
  public pdpUrl: string = this.universalService.getApplicationUrl();
  public baseRemoteUrl = '';
  public descriptionAttribute: string;
  public regularPriceAttribute: string;
  public discountedPriceAttribute: string;

  ngOnInit(): void {
    this.applySetup();
  }

  applySetup(): void {
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.descriptionAttribute = `brands_name_${this.language}`;
    this.regularPriceAttribute = `regular_price_${this.currency}`;
    this.discountedPriceAttribute = `discounted_price_${this.currency}`;
  }

  public unfollowPriceDrop(): void {
    this.priceDropService.unsubscribeProductPriceDrop(this.hit.id).subscribe(response => {
      if (response.status) {
        this.callBack.emit();
      }
    });
  }
}
