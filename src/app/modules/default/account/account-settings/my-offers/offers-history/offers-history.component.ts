import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { OfferService } from '@services/account/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { Product } from '@schemas/product.interface';
import { AppConfiguration } from '@schemas/app.interface';
import { AppService } from '@services/app/app.service';
import { Offer, OfferSettings } from '@schemas/account/offer.interface';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@services/app/loader.service';
import { Subscription } from 'rxjs';
import { DialogService } from '@services/app/dialog.service';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { SegmentService } from '@services/segment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Seller } from '@schemas/seller.interface';
import { UniversalService } from '@services/universal.service';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import OfferHelper from '../offer-helper';
import DateUtils from '@shared/utils/date-utils';
import { OutputEmitModel } from '@shared/models/output-emit.model';

@Component({
  selector: 'tvb-offers-history',
  templateUrl: './offers-history.component.html',
  styleUrls: ['./offers-history.component.scss'],
})
export class OffersHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
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
  private offerSettingKey = 'make-an-offer';
  private subscriptions$: Subscription[] = [];

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private appService: AppService,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private segmentService: SegmentService,
    private snackBar: MatSnackBar,
    private universalService: UniversalService,
    private userService: UserService,
    public location: Location,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loaderService.triggerLoading.emit(true);
    this.buyerId = +this.route.snapshot.queryParamMap.get('buyerId');
    this.sellerId = +this.route.snapshot.queryParamMap.get('sellerId');
    this.productId = this.route.snapshot.queryParamMap.get('productId');
    this.userPerspective = +this.route.snapshot.queryParamMap.get(
      'userPerspective'
    ) as OfferUserPerspectiveEnum;
    this.appConfig = this.appService.getAppConfigurationValue();
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.loadOfferSettings();
    this.loadProduct();
    this.loadOfferHistory();
    this.user = this.userService.getUserData().getValue();
  }

  ngAfterViewInit(): void {
    // Prevents ExpressionChangedAfterItHasBeenCheckedError: https://angular.io/errors/NG0100
    this.changeDetector.detectChanges();
  }

  private loadProduct(): void {
    this.loaderService.triggerLoading.emit(true);
    this.subscriptions$.push(
      this.productService
        .getProductDetail(
          this.productId,
          this.appConfig.languageShortName,
          this.appConfig.currencyCode
        )
        .subscribe(responseSuccess => {
          this.product = responseSuccess;
          this.loaderService.triggerLoading.emit(false);
        })
    );
  }

  private loadOfferHistory(): void {
    this.loaderService.triggerLoading.emit(true);
    this.subscriptions$.push(
      this.offerService
        .getOfferHistory(this.buyerId, this.sellerId, this.productId, this.appConfig?.currencyCode)
        .subscribe(responseSuccess => {
          this.offerHistory = responseSuccess.data;
          this.lastOffer = this.offerHistory[this.offerHistory.length - 1];
          this.loaderService.triggerLoading.emit(false);
        })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      subscription?.unsubscribe();
    }
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

  handleClickAcceptOffer(emittedEvent: OutputEmitModel): void {
    if (emittedEvent.success) {
      this.hideErrorMessage();
      this.loadOfferHistory();
    }
    else if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
  }

  handleClickRejectOffer(emittedEvent: OutputEmitModel): void {
    if (emittedEvent.success) {
      this.hideErrorMessage();
      this.loadOfferHistory();
    }
    else if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
  }

  handleClickBuyProduct(emittedEvent: OutputEmitModel): void {
    this.hideErrorMessage();

    if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
  }

  handleClickMakeCounterOffer(emittedEvent: OutputEmitModel): void {
    if (emittedEvent.success) {
      this.hideErrorMessage();
      this.loadOfferHistory();
    }
    else if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
  }

  private showErrorMessage(message?: string): void {
    this.errorMessage = message
      ? message
      : this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');
  }

  private hideErrorMessage(): void {
    this.errorMessage = null;
  }
}
