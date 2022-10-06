import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConfiguration } from '@schemas/app.interface';
import { Product } from '@schemas/product.interface';
import { Offer, OfferSettings } from '@schemas/account/offer.interface';
import { OfferActionTypeEnum, OfferStatusEnum, OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { Seller } from '@schemas/seller.interface';
import { UserData } from '@schemas/user.interface';
import { EMPTY, Observable } from 'rxjs';
import { OfferService } from '@services/account/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { AppService } from '@services/app/app.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, Location } from '@angular/common';
import { DialogService } from '@services/app/dialog.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import OfferHelper from '../offer-helper';
import DateUtils from '@shared/utils/date-utils';
import { OutputEmitModel } from '@shared/models/output-emit.model';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { OfferRequestModel } from '@shared/models/offer-request.model';
import { catchError, concatMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'tvb-offers-history-dialog',
  templateUrl: './offers-history-dialog.component.html',
  styleUrls: ['./offers-history-dialog.component.scss'],
})
export class OffersHistoryDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  public appConfig: AppConfiguration;
  public buyerId: number;
  public sellerId: number;
  public productId: string;
  public product: Product;
  public offerHistory: Offer[] = [];
  public lastOffer: Offer;
  public userPerspective: OfferUserPerspectiveEnum;
  public isMakeOfferEnabled: boolean;
  public offerSettings: OfferSettings;
  public seller: Seller;
  public user: UserData;
  public baseRemoteUrl: string;
  public errorMessage: string = null;
  public actionType: OfferActionTypeEnum = undefined;
  public hasCounterOfferBeenMade = false;
  public hasCounterOfferBeenAccepted = false;
  public hasCounterOfferBeenDeclined = false;
  private offerSettingKey = 'make-an-offer';
  public startingPrice;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private appService: AppService,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    private spinnerService: NgxSpinnerService,
    private dialogService: DialogService,
    private segmentService: SegmentService,
    private snackBar: MatSnackBar,
    private universalService: UniversalService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    public location: Location,
    public dialogRef: MatDialogRef<OffersHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputParams: any
  ) {}

  ngOnInit(): void {
    this.buyerId = +this.inputParams.data.buyerId;
    this.sellerId = +this.inputParams.data.sellerId;
    this.productId = this.inputParams.data.productId;
    this.userPerspective = +this.inputParams.data.userPerspective as OfferUserPerspectiveEnum;
    this.actionType = this.inputParams.data.actionType as OfferActionTypeEnum;
    this.appConfig = this.appService.getAppConfigurationValue();
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.loadOfferSettings();
    this.loadProduct();
    this.loadOfferHistory();
    this.loadSeller();
    this.user = this.userService.getUserData().getValue();
  }

  ngAfterViewInit(): void {
    // Prevents ExpressionChangedAfterItHasBeenCheckedError: https://angular.io/errors/NG0100
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {}

  private loadProduct(): void {
    this.productService
      .getProductDetail(this.productId, this.appConfig.languageShortName, this.appConfig.currencyCode)
      .subscribe(responseSuccess => {
        this.product = responseSuccess;
        this.startingPrice = this.product?.discounted_price
          ? this.product.discounted_price
          : this.product?.regular_price;
      });
  }

  private loadOfferHistory(): void {
    this.spinnerService.show();

    this.offerService
      .getOfferHistory(this.buyerId, this.sellerId, this.productId, this.appConfig?.currencyCode)
      .subscribe(responseSuccess => {
        this.offerHistory = responseSuccess.data;
        this.lastOffer = this.offerHistory[this.offerHistory.length - 1];
        this.spinnerService.hide();
      });
  }

  private loadSeller(): void {
    this.userService.getSeller(this.sellerId).subscribe(response => (this.seller = response.user));
  }

  loadOfferSettings(): void {
    this.appService.getAppSetting(this.offerSettingKey).subscribe((data: any) => {
      if (data.message === 'success') {
        this.offerSettings = data.model;
        this.isMakeOfferEnabled = data.model.status == 'active' && data.model.value > 0;
      }
    });
  }

  getTimeToExpireText(offer: Offer, product: Product): string {
    if (product?.stock === 0) {
      return this.translateService.instant('make_an_offer.listing.sold_out');
    }

    const hoursToExpire: number = OfferHelper.getTimeToExpireValue(offer);
    const splitTime = DateUtils.ConvertHoursToSplitTime(hoursToExpire);

    if (hoursToExpire > 0) {
      return this.translateService.instant('make_an_offer.listing.expires_in', {
        days: splitTime.days,
        hours: splitTime.hours,
        minutes: splitTime.minutes,
      });
    }
    else {
      return this.translateService.instant('make_an_offer.status.expired');
    }
  }

  getHeaderTitle(): string {
    if (this.actionType === OfferActionTypeEnum.COUNTER_OFFER) {
      if (this.hasCounterOfferBeenMade) {
        return this.translateService.instant('make_an_offer.titles.counter_offer_sent');
      }
      else {
        return this.translateService.instant('make_an_offer.titles.make_counter');
      }
    }

    if (this.actionType === OfferActionTypeEnum.ACCEPT) {
      if (this.hasCounterOfferBeenAccepted) {
        return this.translateService.instant('make_an_offer.titles.accepted');
      }
      else {
        return this.translateService.instant('make_an_offer.titles.confirm_accept');
      }
    }

    if (this.actionType === OfferActionTypeEnum.DECLINE) {
      if (this.hasCounterOfferBeenDeclined) {
        return this.translateService.instant('make_an_offer.titles.declined');
      }
      else {
        return this.translateService.instant('make_an_offer.titles.confirm_decline');
      }
    }

    return '';
  }

  isCounterOfferActionType(): boolean {
    return this.actionType === OfferActionTypeEnum.COUNTER_OFFER;
  }

  isAcceptActionType(): boolean {
    return this.actionType === OfferActionTypeEnum.ACCEPT;
  }

  isDeclineActionType(): boolean {
    return this.actionType === OfferActionTypeEnum.DECLINE;
  }

  handleOfferMade(emittedEvent: OutputEmitModel) {
    if (emittedEvent.success) {
      this.hasCounterOfferBeenMade = true;
      this.loadOfferHistory();
      this.spinnerService.hide();
    }
  }

  acceptOffer(): void {
    let acceptOrDeclineObs$: Observable<ApiResponseModel<boolean>>;
    let segmentActionName = '';

    if (this.isAcceptActionType()) {
      acceptOrDeclineObs$ = this.offerService.acceptOffer(this.lastOffer.id, this.userPerspective);
      segmentActionName = 'Offer Accepted';
    }
    else if (this.isDeclineActionType()) {
      acceptOrDeclineObs$ = this.offerService.rejectOffer(this.lastOffer.id, this.userPerspective);
      segmentActionName = 'Offer Declined';
    }

    acceptOrDeclineObs$.subscribe({
      next: () => {
        this.hasCounterOfferBeenAccepted = true;
        this.spinnerService.hide();
        this.segmentService.track(
          segmentActionName,
          OfferHelper.generateSegmentProductObject(
            this.offerHistory,
            this.product,
            this.seller,
            this.appConfig.currencyCode as CurrencyCodeEnum,
            this.appConfig.languageShortName,
            this.baseRemoteUrl,
            this.userPerspective === OfferUserPerspectiveEnum.SELLER
          )
        );
      },
      error: responseError => {
        this.snackBar.open(responseError.message, 'x', { duration: 5000 });
      },
    });
  }

  /**
   *
   * @description Declines an Offer.
   *
   * Alternative scenario: If the user that is declining the offer is a seller, then
   * automatically a counter-offer will be made considering the last maximum possible value for
   * the seller.
   *
   */
  declineOffer(): void {
    this.spinnerService.show();
    const rejectOffer$ = this.offerService.rejectOffer(this.lastOffer.id, this.userPerspective);
    let operation$: Observable<any>;

    if (OfferHelper.isSellerPerspective(this.userPerspective)) {
      operation$ = rejectOffer$.pipe(
        concatMap(rejectOfferRes => {
          const submitOfferRequestData: OfferRequestModel = {
            value:
              this.lastOffer.position === 1
                ? this.startingPrice
                : this.offerHistory.filter(_ => _.position === this.lastOffer.position - 1)[0].price[
                  this.appConfig.currencyCode.toLowerCase()
                ].value,
            buyerId: this.lastOffer.buyerId,
            sellerId: this.lastOffer.sellerId,
            currencyCode: this.appConfig.currencyCode,
            productId: this.lastOffer.productId,
            statusId: OfferStatusEnum.REJECTED,
            position: this.lastOffer.position + 1,
          };

          return this.offerService.submitOffer(submitOfferRequestData);
        }),
        catchError(responseError => {
          this.snackBar.open(responseError.message, 'x', { duration: 5000 });
          this.spinnerService.hide();

          return EMPTY;
        })
      );
    }

    operation$
      .pipe(
        concatMap((response: ApiResponseModel<boolean>) => {
          if (response.data) {
            this.hasCounterOfferBeenDeclined = true;

            this.segmentService.track(
              'Offer Rejected',
              OfferHelper.generateSegmentProductObject(
                this.offerHistory,
                this.product,
                this.seller,
                this.appConfig.currencyCode as CurrencyCodeEnum,
                this.appConfig.languageShortName,
                this.baseRemoteUrl,
                this.userPerspective === OfferUserPerspectiveEnum.SELLER
              )
            );
          }

          return this.offerService.getOfferHistory(
            this.lastOffer.buyerId,
            this.lastOffer.sellerId,
            this.lastOffer.productId,
            this.appConfig.currencyCode
          );
        })
      )
      .subscribe({
        next: (response: ApiResponseModel<Offer[]>) => {
          this.offerHistory = response.data;
          this.spinnerService.hide();
        },
        error: response => {
          this.snackBar.open(response.message, 'x', { duration: 5000 });
          this.spinnerService.hide();
        },
      });
  }

  cancelAndClose(): void {
    this.dialogRef.close();
  }

  shouldShowLastOfferWarning(): boolean {
    return OfferHelper.isLastOffer(this.userPerspective, this.lastOffer.position) && this.isCounterOfferActionType();
  }

  isBuyerPerspective(perspective: number): boolean {
    return OfferHelper.isBuyerPerspective(perspective);
  }

  isSellerPerspective(perspective: number): boolean {
    return OfferHelper.isSellerPerspective(perspective);
  }
}
