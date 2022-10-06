import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { environment } from '@environments/environment';
import { OrderDetailService } from '@services/order-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app/app.service';
import { Subscription } from 'rxjs';
import { MetaService } from '@services/app/meta.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  currentAppConfiguaration: any;
  baseUrl = environment.baseAngularUrl;
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
  appServiceSubscription: Subscription;
  ordersuccessdata: Subscription;
  loading: boolean;
  orderDetail: any;
  orderItems: any;
  regularPrice: any;
  itemTotal: any;
  itemSubTotal: any = 0;
  itemTaxTotal: any = 0;
  itemTotalFinal = 0;
  itemSubTotalFinal = 0;
  itemTaxTotalFinal = 0;
  itemDiscountFinal = 0;
  itemShippingFinal = 0;
  country_data: any;
  subDomain: string;
  awinMerchantId: string;
  awinFlag: number;
  coupon: any;
  orderItemTotal: any;

  constructor(
    private orderService: OrderDetailService,
    private _activatedRoute: ActivatedRoute,
    private appService: AppService,
    private metaService: MetaService,
    @Inject(DOCUMENT) private doc: any,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.subDomain = this.appService.getCurrentSubDomain(null);
    this.awinFlag = environment.AWIN_FLAG;
    this.metaService.getStaticPageMeta('ordersuccess', '', 'Order Success');
    const subdomain = this.appService.getCurrentSubDomain(null);
    const langOfSubDomain = this.appService.getLangOfSubDomain(subdomain);

    this.appConfig = {
      currencyID: 11,
      currencyCode: 'EUR',
      currencySymbol: '€',
      languageID: langOfSubDomain.languageID,
      languageName: langOfSubDomain.languageName,
      languageShortName: langOfSubDomain.languageShortName,
      countryID: 1,
      countryName: 'United States',
      countrycode: 'US',
      configuration: 1,
    };

    const orderId: number = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

    this.ordersuccessdata = this.orderService.getOrderDetail(orderId).subscribe((order: any) => {
      this.orderItems = order;
      this.country_data = order.country_data;
      this.orderDetail = order.data;
      this.orderItems.orders.order_item.forEach(obj => {
        this.regularPrice = parseFloat(obj.quantity) * parseFloat(obj.regular_price);
        this.itemTotal = this.regularPrice;
        this.itemSubTotal = parseFloat(this.itemTotal) + parseFloat(obj.shippeing_cost) - parseFloat(obj.item_discount);
        this.itemTaxTotal = this.itemSubTotal;
        this.itemTotalFinal = this.itemTotalFinal + parseFloat(this.itemTotal);
        this.itemSubTotalFinal = this.itemSubTotalFinal + parseFloat(this.itemSubTotal);
        this.itemTaxTotalFinal = this.itemTaxTotalFinal + parseFloat(this.itemTaxTotal);
        this.itemDiscountFinal = this.itemDiscountFinal + parseFloat(obj.item_discount);
        this.itemShippingFinal = this.itemShippingFinal + parseFloat(obj.shippeing_cost);
        this.loading = false;
      });
      this.setAwin();
    });
  }

  setAwin() {
    if (this.subDomain === 'dk' || this.subDomain === 'se' || this.subDomain === 'de') {
      this.coupon = this.orderItems.data.coupon_id != 0 ? this.orderItems.data.coupon_id : '';
      this.orderItemTotal = this.orderItems.data.item_total.toFixed(2);
      this.awinMerchantId = this.getAwinMerchantId();

      const script = this.doc.createElement('script');

      script.type = 'text/javascript';
      script.id = 'awinTrack';
      script.innerHTML = `
      //<![CDATA[ /*** Do not change ***/
      var AWIN = {};
      AWIN.Tracking = {};
      AWIN.Tracking.Sale = {};
      /*** Set your transaction parameters ***/
      AWIN.Tracking.Sale.amount = "${this.orderItemTotal}";
      AWIN.Tracking.Sale.orderRef = "${this.orderItems.data.order_id}";
      AWIN.Tracking.Sale.parts = "default:${this.orderItemTotal}";
      AWIN.Tracking.Sale.voucher = "${this.coupon}";
      AWIN.Tracking.Sale.currency = "${this.orderItems.data.currencycode}";
      AWIN.Tracking.Sale.test = "${this.awinFlag}";
      AWIN.Tracking.Sale.channel = "aw";
      //]]>
      `;

      const footer = this.doc.getElementsByTagName('footer')[1];

      footer.appendChild(script);
      this.setDwin();
    }
  }

  public setDwin() {
    this.doc.getElementById('dwinScript').remove();
    const subDomain = this.appService.getCurrentSubDomain(null);

    if (subDomain === 'dk' || subDomain === 'se' || subDomain === 'de') {
      const script = this.doc.createElement('script');

      script.type = 'text/javascript';
      script.defer = 'defer';
      script.id = 'dwinScript';

      if (subDomain === 'dk') script.src = `https://www.dwin1.com/${environment.AWIN_MERCHANT_ID.DK}.js`;

      if (subDomain === 'se') script.src = `https://www.dwin1.com/${environment.AWIN_MERCHANT_ID.SE}.js`;

      if (subDomain === 'de') script.src = `https://www.dwin1.com/${environment.AWIN_MERCHANT_ID.DE}.js`;

      this.renderer2.appendChild(this.doc.body, script);
    }
  }

  getAwinMerchantId(): string {
    switch (this.subDomain) {
      case 'de':
        return environment.AWIN_MERCHANT_ID.DE;
      case 'se':
        return environment.AWIN_MERCHANT_ID.SE;
      case 'dk':
        return environment.AWIN_MERCHANT_ID.DK;
      default:
        return null;
    }
  }

  ngOnDestroy() {
    this.doc.getElementById('awinTrack')?.remove();
  }
}
