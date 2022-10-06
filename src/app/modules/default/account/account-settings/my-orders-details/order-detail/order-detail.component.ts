import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@services/app/app.service';
import { ConfigService } from '@services/app/config.service';
import { OrderDetailService } from '@services/order-detail.service';
import { UserService } from '@services/user.service';
import * as moment from 'moment';
import { environment } from '../../../../../../../environments/environment';

const NOW = moment.default(new Date());

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input() orderItem: any;
  @Input() country_data: any;
  @Input() orderDetail: any;
  @Output() returnData = new EventEmitter();
  @Output() returnorderItem = new EventEmitter();
  @Output() cancelData = new EventEmitter();
  @Output() reSellData = new EventEmitter();
  @Output() resellForFree: EventEmitter<any> = new EventEmitter(null);

  imgixParam = '?h=150&w=150';
  productDTO: any = {};
  env = environment;
  imageName = '';
  availableForFreeResell: boolean;
  regularPrice: any;
  itemTotal: any;
  itemSubTotal: any;
  itemTaxTotal: any;
  invoice: any;
  shippingInvoice: any;
  isOnbordingDone: any;
  fmt: any;
  user: any;
  parcelSlip: string;
  reminderHour: any;
  reminderCondition: boolean;
  orderItemStatus = ['processing', 'quality_control', 'ship_order_item', 'ready_for_shipping'];
  returnValidDate: boolean;
  returnModel: boolean;
  invalidAddress: boolean;
  cntry_return_amnt: any;
  final_refund: any;
  total_item_amt: any;
  discount_amount: any;
  order_item_id: any;
  selected_item: any;
  selected_item1: any;
  final_refund_amount: any;
  discountshow: boolean;
  total_amt: any;
  country_refund_amount: any;
  validAddress: boolean;
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
  hideCancelButton = false;
  constructor(
    private orderService: OrderDetailService,
    private _activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.convertDataToDTO();
    this.loadData();
  }

  private convertDataToDTO(): void {
    this.regularPrice = parseInt(this.orderItem.quantity) * parseFloat(this.orderItem.regular_price);
    this.itemTotal = this.regularPrice;
    this.itemSubTotal
      = parseFloat(this.itemTotal) + parseFloat(this.orderItem.shippeing_cost) - parseFloat(this.orderItem.item_discount);
    this.itemTaxTotal = this.itemSubTotal;
    this.imageName = this.orderItem.imgix_image_url ? this.orderItem.imgix_image_url : this.orderItem.image_url;
    this.invoice = this.orderItem.productInvoicelink
      ? this.env.Finance_Base_Url + 'invoice/' + this.orderItem.productInvoicelink + '/pdf'
      : '';
    this.shippingInvoice = this.orderItem.shippingInvoicelink
      ? this.env.Finance_Base_Url + 'invoice/' + this.orderItem.shippingInvoicelink + '/pdf'
      : '';
    this.user = this.userService.getUserData();
    this.isOnbordingDone = this.user.connected_stripe_id ? 'yes' : 'no';
    this.parcelSlip
      = this.orderItem.return_label_url != null
        ? this.orderItem.return_label_url
        : this.env.IMGIX_UPLOADS_URL
          + 'parcel_slip_buyer/parcelSlip_'
          + this.orderItem.return_shipment_tracking_number
          + '/pdf';

    const deliveryDate = moment.default(this.orderItem.delivery_date as string);

    if (this.orderItem.resell_product_id) {
      const startDate = moment.default(this.orderItem.allow_extended_date as string);

      this.reminderHour = NOW.diff(startDate, 'hours');
      this.reminderCondition = this.orderItem.allow_extended_date && this.reminderHour > 0;
    }
    else {
      this.reminderHour = NOW.diff(deliveryDate, 'hours');
      this.reminderCondition = this.reminderHour > 0 && this.reminderHour <= 72;
    }

    this.returnValidDate = deliveryDate.add(14, 'days').isAfter(moment.default());
    this.availableForFreeResell = this.isAvailableForFreeResell();
  }

  loadData(): void {
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
  }

  reSellOrderItem(orderItemId, productId): void {
    this.reSellData.emit(this.orderItem);
  }

  cancelOrder(orderItemId): void {
    const postData = { orderItemId: this.orderItem.id };
    const formData = { ...postData, ...this.appConfig };

    this.cancelData.emit(this.orderItem);
  }

  calculateReturn(orderItemId): void {
    const postData = {
      item_id: this.orderItem.id,
      country_id: this.orderDetail.country_id,
      currencyId: this.orderDetail.currency_id,
      currency_code: this.orderDetail.currencycode,
    };
    const formData = { ...postData, ...this.appConfig };

    this.returnData.emit(formData);
    this.returnorderItem.emit(this.orderItem);
  }

  private isAvailableForFreeResell(): boolean {
    if (this.orderItem.commission_user_type !== 'private') {
      return false;
    }

    const deliveryDate = moment.default(this.orderItem.delivery_date as string);
    const hoursPassedFromDelivery = NOW.diff(deliveryDate, 'hours');

    return hoursPassedFromDelivery < this.configService.resellForFreeTimeInterval;
  }

  public onResellForFree(): void {
    const data = {
      price: this.orderItem.price,
      base_currency: this.orderItem.currencycode,
      id: this.orderItem.product_id,
      name: this.orderItem.name,
      commission_user: this.user.getValue()?.id,
      regular_price: this.orderItem.regular_price,
      cost_of_good: this.orderItem.cost_of_good,
      product_id: this.orderItem.product_id,
      order_id: this.orderItem.order_id,
      order_item_id: this.orderItem.id,
    };

    this.resellForFree.emit(data);
  }

  generateDownloadJsonUri(filepath): any {
    const xhr = new XMLHttpRequest();

    xhr.open('HEAD', filepath, false);
    xhr.send();

    if (xhr.status === 404 || xhr.status === 500) {
      return false;
    }
    else {
      return filepath;
    }
  }
}
