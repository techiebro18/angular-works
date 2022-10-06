import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductOffer } from '@schemas/account/product-offer.interface';
import { OfferService } from '@services/account/offer.service';
import { MetaService } from '@services/app/meta.service';
import { UserService } from '@services/user.service';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferStatusEnum, OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { DatePipe } from '@angular/common';
import { UniversalService } from '@services/universal.service';
import { AppConfiguration } from '@schemas/app.interface';
import { Offer } from '@schemas/account/offer.interface';
import DateUtils from '@shared/utils/date-utils';
import { Product } from '@schemas/product.interface';
import OfferHelper from './offer-helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tvb-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
})
export class MyOffersComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions$: Subscription[] = [];
  private offerSettingsKey = 'make-an-offer';
  public appConfig: AppConfiguration;
  public baseRemoteUrl: string;
  public errorMessage: string = null;
  public filteredOffers: Offer[] = [];
  public isMakeOfferEnabled: boolean;
  public offerSettings: any;
  public productData: Product = null;
  public offers: Offer[];
  public activeOffersList: Offer[];
  public expiredOffersList: Offer[];
  public searchItems: string;
  public statusTranslationDictionary: any;
  public userPerspective: OfferUserPerspectiveEnum;
  public currentPage = 1;
  public productId: string;
  public activeOffers = true;

  constructor(
    private appService: AppService,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private spinnerService: NgxSpinnerService,
    private metaService: MetaService,
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private universalService: UniversalService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<MyOffersComponent>,
    @Inject(MAT_DIALOG_DATA) public inputParams?: any
  ) {}

  ngOnInit(): void {
    // The following line allows to reload the same page component when navigate to the same route again
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.setupPage();
    this.loadOfferSetting();
    this.loadOffers();
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
  }

  setupPage() {
    this.hideErrorMessage();
    this.statusTranslationDictionary = {
      PENDING: this.translateService.instant('make_an_offer.status.pending'),
      ACCEPTED: this.translateService.instant('make_an_offer.status.accepted'),
      REJECTED: this.translateService.instant('make_an_offer.status.declined'),
      EXPIRED: this.translateService.instant('make_an_offer.status.expired'),
      WAITING_BUYER: this.translateService.instant('make_an_offer.status.waiting_buyer'),
      WAITING_SELLER: this.translateService.instant('make_an_offer.status.waiting_seller'),
    };
    this.userPerspective = +this.activatedRoute.snapshot.data.userPerspective;
    this.appConfig = this.appService.getAppConfigurationValue();
    this.productId = this.inputParams?.data?.productId;

    if (!this.productId) {
      this.metaService.getStaticPageMeta('account/my-offers', '', 'My Offers');
    }

    if (this.productId) {
      this.userPerspective = OfferUserPerspectiveEnum.SELLER;
    }
  }

  ngAfterViewInit(): void {
    // Prevents ExpressionChangedAfterItHasBeenCheckedError: https://angular.io/errors/NG0100
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions$) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

  private showErrorMessage(message?: string): void {
    this.errorMessage = message ? message : this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');
  }

  private hideErrorMessage(): void {
    this.errorMessage = null;
  }

  changeOfferVision(active: boolean): void {
    if (active) {
      this.activeOffers = active;

      if (!this.activeOffersList?.length) this.loadOffers();
      else {
        this.offers = this.activeOffersList;
      }
    }
    else {
      this.activeOffers = active;

      if (!this.expiredOffersList?.length) this.loadOffers();
      else {
        this.offers = this.expiredOffersList;
      }
    }
  }

  loadOffers(): void {
    this.spinnerService.show();

    const user = this.userService.getUserData().getValue();
    let getOffersOb$: Observable<ApiResponseModel<Offer[]>>;

    if (OfferHelper.isBuyerPerspective(this.userPerspective)) {
      getOffersOb$ = this.offerService.getBuyersOfferOnlyLastPosition(
        user.id,
        this.appConfig.currencyCode,
        this.activeOffers
      );
    }
    else if (OfferHelper.isSellerPerspective(this.userPerspective)) {
      if (!this.productId)
        getOffersOb$ = this.offerService.getSellerOffersOnlyLastPosition(
          user.id,
          this.appConfig.currencyCode,
          this.activeOffers
        );
      else
        getOffersOb$ = this.offerService.getSellerOffersOnlyLastPositionByProduct(
          user.id,
          this.appConfig.currencyCode,
          this.productId
        );
    }

    this.subscriptions$.push(
      getOffersOb$.subscribe(
        (responseSuccess: ApiResponseModel<Offer[]>) => {
          this.offers = responseSuccess.data;

          if (this.activeOffers) this.activeOffersList = this.offers;
          else this.expiredOffersList = this.offers;

          this.spinnerService.hide();
        },
        (responseError: ApiResponseModel<any>) => {
          this.showErrorMessage(responseError?.message);
          this.snackBar.open(
            responseError?.message || this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR'),
            'x',
            { duration: 5000 }
          );
          this.spinnerService.hide();
        }
      )
    );
  }

  onSearchItems(): void {
    if (this.searchItems || this.searchItems !== '') {
      this.filteredOffers = this.offers.filter(_ =>
        _.product.name?.toLowerCase().includes(this.searchItems?.toLowerCase())
      );
    }
    else {
      this.filteredOffers = this.offers;
    }
  }

  loadOfferSetting(): void {
    this.appService.getAppSetting(this.offerSettingsKey).subscribe((data: any) => {
      if (data.message === 'success') {
        this.offerSettings = data.model;
        this.isMakeOfferEnabled = data.model.status == 'active' && data.model.value > 0;
      }
    });
  }

  getTimeToExpireText(offer: Offer, product: ProductOffer): string {
    if (product.stock === 0) {
      return this.translateService.instant('make_an_offer.listing.sold_out');
    }

    const hoursToExpire: number = OfferHelper.getTimeToExpireValue(offer);
    const splitTime = DateUtils.ConvertHoursToSplitTime(hoursToExpire);
    const truthyStatuses = [OfferStatusEnum.PENDING, OfferStatusEnum.EXPIRED];

    if (truthyStatuses.includes(offer.statusId)) {
      return hoursToExpire > 0
        ? this.translateService.instant('make_an_offer.listing.expires_in', {
          days: splitTime.days,
          hours: splitTime.hours,
          minutes: splitTime.minutes,
        })
        : this.datePipe.transform(offer.createdAt, 'dd-MM-yy HH:mm');
    }
    else {
      return this.datePipe.transform(offer.createdAt, 'dd-MM-yy HH:mm');
    }
  }

  getTextAccordingToStatus(offer: Offer, verbose: boolean): string {
    if (offer.statusId === OfferStatusEnum.PENDING) {
      if (OfferHelper.isBuyerPerspective(this.userPerspective) && OfferHelper.isBuyerOffer(offer.position)) {
        return this.statusTranslationDictionary.WAITING_SELLER;
      }

      if (OfferHelper.isSellerPerspective(this.userPerspective) && OfferHelper.isSellerOffer(offer.position)) {
        return this.statusTranslationDictionary.WAITING_BUYER;
      }
    }

    if (offer.statusId === OfferStatusEnum.ACCEPTED || offer.statusId === OfferStatusEnum.REJECTED) {
      return offer.updatedAt
        ? `${this.statusTranslationDictionary[offer.status]} on ${this.datePipe.transform(
          offer.updatedAt,
          'dd-MM-yy HH:mm'
        )}`
        : this.statusTranslationDictionary[offer.status];
    }

    if (offer.statusId === OfferStatusEnum.EXPIRED) {
      if (verbose) {
        const expiredValueInHours = OfferHelper.getExpiredHoursValue(offer);
        const splitTime = DateUtils.ConvertHoursToSplitTime(expiredValueInHours);

        return this.translateService.instant('make_an_offer.listing.expired_time_ago', {
          status: this.statusTranslationDictionary[offer.status],
          days: splitTime.days,
          hours: splitTime.hours,
          minutes: splitTime.minutes,
        });
      }
      else {
        return this.translateService.instant('make_an_offer.status.expired');
      }
    }

    return this.statusTranslationDictionary[offer.status];
  }

  handleClickAcceptOffer(emittedEvent: any): void {
    if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
    else {
      this.loadOffers();
    }
  }

  handleClickRejectOffer(emittedEvent: any): void {
    if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
    else {
      this.loadOffers();
    }
  }

  handleClickBuyProduct(emittedEvent: any): void {
    if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
  }

  handleClickMakeCounterOffer(emittedEvent: any): void {
    if (emittedEvent.error) {
      this.showErrorMessage(emittedEvent.error);
    }
    else {
      this.loadOffers();
    }
  }

  isBuyerPerspective(perspective: number): boolean {
    return OfferHelper.isBuyerPerspective(perspective);
  }

  isSellerPerspective(perspective: number): boolean {
    return OfferHelper.isSellerPerspective(perspective);
  }
}
