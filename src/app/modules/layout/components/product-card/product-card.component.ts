import { Component, Input, OnInit } from '@angular/core';
import { AppConfiguration } from '@schemas/app.interface';
import { AppService } from '@services/app/app.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tvb-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() public hit: any;

  @Input() public language: string;
  @Input() public currency: string;
  @Input() public currencySymbol: string;
  @Input() public saleBadge: boolean;
  @Input() public newLayout = false;
  weLoveTag = false;
  public defaultImageUrl = 'https://thevintagebardev.imgix.net//?h=480&amp;w=480';
  pdpUrl: string = this.universalService.getApplicationUrl();

  public descriptionAttribute: string;
  public priceSympole: string;
  public saleBadgeEnabled: boolean;
  public baseRemoteUrl = '';
  public config$: BehaviorSubject<AppConfiguration | null>;
  public nameAttribute: string;
  public discountedPercentage: string;

  constructor(
    private segmentService: SegmentService,
    private universalService: UniversalService,
    private cookieService: CookieService,
    public appService: AppService
  ) {
    this.config$ = this.appService.getAppConfigurationBehavior();
  }

  ngOnInit(): void {
    this.saleBadgeEnabled = this.saleBadge;
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.descriptionAttribute = `brands_name_${this.language}`;
    this.priceSympole = this.currencySymbol;
    this.weLoveTag = this.hit.discover_en && this.hit.discover_en.includes('we-love');
    this.nameAttribute = `name_${this.language}`;
    this.getDiscountedPrice();
  }

  getDiscountedPrice() {
    if (this.hit.is_discount === 1) {
      this.discountedPercentage = (
        ((this.hit[`regular_price_${this.currency}`] - this.hit[`discounted_price_${this.currency}`])
          / this.hit[`regular_price_${this.currency}`])
        * 100
      ).toFixed(0);
    }
  }

  //TODO: This method is not called !
  async productDetail() {
    this.cookieService.set('__queryID', this.hit.__queryID, { path: '/' });
    // let url=this.pdpUrl+'/'+this.hit.styles_seo_url_en+'#'+this.hit.id;
    await this.segmentService.ProductClicked(this.hit, this.currency);
    // window.location.href=url;
  }
}
