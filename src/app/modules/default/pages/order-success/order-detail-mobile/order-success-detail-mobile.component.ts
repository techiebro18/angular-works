import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetailService } from '@services/order-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { UserService } from '@services/user.service';
import { AppService } from '@services/app/app.service';
import * as moment from 'moment';
import { ConfigService } from '@services/app/config.service';

@Component({
  selector: 'app-order-success-detail-mobile',
  templateUrl: './order-success-detail-mobile.component.html',
  styleUrls: ['./order-success-detail-mobile.component.scss'],
})
export class OrderSuccessDetailMobileComponent implements OnInit {
  @Input() orderItem: any;
  @Input() country_data: any;
  @Input() orderDetail: any;
  @Output() returnData = new EventEmitter();
  @Output() returnorderItem = new EventEmitter();
  @Output() cancelData = new EventEmitter();
  @Output() reSellData = new EventEmitter();

  public imgixParam = '?h=150&w=150';
  public productDTO: any = {};
  public env = environment;
  public imageName = '';
  public availableForFreeResell: boolean;
  regularPrice: any;
  itemTotal: any;
  itemSubTotal: any;
  itemTaxTotal: any;
  invoice: any;
  isOnbordingDone: any;
  fmt: any;
  user: any;
  parcelSlip: string;
  reminderHour: any;
  reminderConidtion: boolean;
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
    this.imageName = this.orderItem.imgix_image_url
      ? this.orderItem.imgix_image_url
      : this.orderItem.image_url
        ? this.env.PRODUCT_IMGIX_URL + this.orderItem.image_url + this.imgixParam
        : '';
    this.invoice
      = this.env.IMGIX_UPLOADS_URL + 'invoice_pdf/invoice_' + this.orderItem.order_id + '_' + this.orderItem.id + '/pdf';
    this.user = this.userService.getUserData();
    this.isOnbordingDone = this.user.connected_stripe_id ? 'yes' : 'no';
    this.parcelSlip
      = this.env.IMGIX_UPLOADS_URL
      + 'parcel_slip_buyer/parcelSlip_'
      + this.orderItem.return_shipment_tracking_number
      + '/pdf';

    if (this.orderItem.resell_product_id) {
      const startDate: any = new Date(this.orderItem.allow_extended_date).getTime();
      const endDate: any = new Date().getTime();
      const diffMs = startDate - endDate; // milliseconds

      this.reminderHour = Math.floor(diffMs / 3600 / 1000); // hours
      this.reminderConidtion = this.orderItem.allow_extended_date && this.reminderHour > 0 ? true : false;
    }
    else {
      const startDate: any = new Date(this.orderItem.delivery_date).getTime();
      const endDate: any = new Date().getTime();
      const diffMs = endDate - startDate; // milliseconds

      this.reminderHour = Math.floor(diffMs / 3600 / 1000); // hours
      this.reminderConidtion = this.reminderHour > 0 && this.reminderHour <= 72 ? true : false;
    }

    const deliverDateAddFourteenDays = new Date(this.orderItem.delivery_date);

    deliverDateAddFourteenDays.setDate(deliverDateAddFourteenDays.getDate() + 14);
    this.returnValidDate = new Date(deliverDateAddFourteenDays).getTime() >= new Date().getTime();
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

  reSellOrderItem(orderItemId, productId) {
    this.reSellData.emit(this.orderItem);
  }

  cancelOrder(orderItemId) {
    const postData = { orderItemId: this.orderItem.id };
    const formData = { ...postData, ...this.appConfig };

    this.cancelData.emit(this.orderItem);
  }

  calculateReturn(orderItemId) {
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

    const now = moment.default(new Date());
    const deliveryDate = moment.default(this.orderItem.delivery_date as string);
    const hoursPassedFromDelivery = now.diff(deliveryDate, 'hours');

    return hoursPassedFromDelivery < this.configService.resellForFreeTimeInterval;
  }
}
