import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Offer, OfferSettings } from '@schemas/account/offer.interface';
import { AppConfiguration } from '@schemas/app.interface';
import { Product } from '@schemas/product.interface';
import { OfferService } from '@services/account/offer.service';
import { DialogService } from '@services/app/dialog.service';
import { CartActionsService } from '@services/cart/cart-actions.service';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { OfferActionTypeEnum, OfferStatusEnum, OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { OutputEmitModel } from '@shared/models/output-emit.model';
import { EMPTY, Observable, Subscription, forkJoin, of } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import OfferHelper from '../offer-helper';
import { OffersHistoryDialogComponent } from '../offers-history-dialog/offers-history-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'tvb-offers-buttons-bar',
  templateUrl: './offers-buttons-bar.component.html',
  styleUrls: ['./offers-buttons-bar.component.scss'],
})
export class OffersButtonsBarComponent implements OnInit, OnDestroy {
  @Input() appConfig: AppConfiguration;
  @Input() offer: Offer;
  @Input() offerHistory?: Offer[];
  @Input() product: Product;
  @Input() userPerspective: OfferUserPerspectiveEnum;
  @Input() offerSettings: OfferSettings;
  @Output() acceptAction: EventEmitter<OutputEmitModel> = new EventEmitter();
  @Output() rejectAction: EventEmitter<OutputEmitModel> = new EventEmitter();
  @Output() buyAction: EventEmitter<OutputEmitModel> = new EventEmitter();
  @Output() counterOfferAction: EventEmitter<OutputEmitModel> = new EventEmitter();
  public OfferHelper = OfferHelper;
  private baseRemoteUrl: string;
  private subscriptions$: Subscription[] = [];

  constructor(
    private dialogService: DialogService,
    private spinnerService: NgxSpinnerService,
    private offerService: OfferService,
    private segmentService: SegmentService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private universalService: UniversalService,
    private cartService: CartActionsService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      subscription?.unsubscribe();
    }
  }

  shouldShowButtonsBar(offer: Offer): boolean {
    return (
      this.shouldShowAcceptBtn(offer)
      || this.shouldShowRejectBtn(offer)
      || this.shouldShowBuyBtn(offer)
      || this.shouldShowBuyerMakeCounterOfferBtn(offer)
      || this.shouldShowSellerMakeCounterOfferBtn(offer)
    );
  }

  shouldShowBuyBtn(offer: Offer): boolean {
    return (
      OfferHelper.isBuyerPerspective(this.userPerspective)
      && ((OfferHelper.isBuyerOffer(offer?.position) && offer?.statusId === OfferStatusEnum.ACCEPTED)
        || (OfferHelper.isSellerOffer(offer?.position)
          && (offer?.statusId === OfferStatusEnum.ACCEPTED || offer?.statusId === OfferStatusEnum.PENDING)))
    );
  }

  shouldShowAcceptBtn(offer: Offer): boolean {
    return (
      offer?.statusId === OfferStatusEnum.PENDING
      && OfferHelper.isSellerPerspective(this.userPerspective)
      && OfferHelper.isBuyerOffer(offer?.position)
      && !this.hasOfferExpired(offer)
    );
  }

  shouldShowRejectBtn(offer: Offer): boolean {
    return this.shouldShowAcceptBtn(offer);
  }

  shouldShowBuyerMakeCounterOfferBtn(offer: Offer): boolean {
    return (
      offer?.position <= 4
      && OfferHelper.isBuyerPerspective(this.userPerspective)
      && OfferHelper.isSellerOffer(offer?.position)
      && !this.hasOfferExpired(offer)
    );
  }

  shouldShowSellerMakeCounterOfferBtn(offer: Offer): boolean {
    return (
      offer?.position <= 5
      && OfferHelper.isSellerPerspective(this.userPerspective)
      && OfferHelper.isBuyerOffer(offer?.position)
      && !this.hasOfferExpired(offer)
      && (offer?.statusId === OfferStatusEnum.PENDING || offer?.statusId === OfferStatusEnum.REJECTED)
    );
  }

  handleClickAcceptOffer(offer: Offer): void {
    this.dialogService
      .open(OffersHistoryDialogComponent, {
        buyerId: offer.buyerId,
        sellerId: offer.sellerId,
        productId: this.product.id,
        product: this.product,
        userPerspective: this.userPerspective,
        actionType: OfferActionTypeEnum.ACCEPT,
      })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        this.counterOfferAction.emit({ success: true, error: undefined });

        if (wasClosedByTheUser) {
          return;
        }
      });
  }

  handleClickBuyProduct(offer: Offer): void {
    this.spinnerService.show();
    let buyActionObs$: Observable<any>;

    if (offer.statusId == OfferStatusEnum.ACCEPTED) {
      buyActionObs$ = this.cartService.addToCart(offer.productId).pipe(
        catchError(err => {
          this.buyAction.emit({ success: false, error: err });

          return EMPTY;
        })
      );
    }
    else {
      buyActionObs$ = this.offerService.acceptOffer(offer.id, this.userPerspective).pipe(
        concatMap((acceptOfferRes: ApiResponseModel<boolean>) => {
          if (acceptOfferRes.data) {
            return this.cartService.addToCart(offer.productId);
          }
          else {
            this.buyAction.emit({
              success: false,
              error: 'An error has occurred while trying to add the product into the shopping cart',
            });

            return EMPTY;
          }
        }),
        catchError(err => {
          this.buyAction.emit({ success: false, error: err });

          return EMPTY;
        })
      );
    }

    this.subscriptions$.push(
      buyActionObs$.subscribe((addToCartRes: any) => {
        this.spinnerService.hide();

        if (addToCartRes.status) {
          this.buyAction.emit({ success: true, error: undefined });
          this.router.navigate(['/cart/view-cart']);
        }
        else {
          this.buyAction.emit({
            success: false,
            error: 'An error has occurred while trying to add the product into the shopping cart',
          });
        }
      })
    );
  }

  handleClickRejectOffer(offer: Offer): void {
    this.dialogService
      .open(OffersHistoryDialogComponent, {
        buyerId: offer.buyerId,
        sellerId: offer.sellerId,
        productId: this.product.id,
        product: this.product,
        userPerspective: this.userPerspective,
        actionType: OfferActionTypeEnum.DECLINE,
      })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        this.counterOfferAction.emit({ success: true, error: undefined });

        if (wasClosedByTheUser) {
          return;
        }
      });
  }

  handleClickMakeCounterOfferBtn(offer): void {
    this.segmentService.track('Button Clicked', { label: 'counter_offer' });

    this.offerService
      .getOfferHistory(offer.buyerId, offer.sellerId, offer.productId, this.appConfig.currencyCode)
      .subscribe((apiResponseModel: ApiResponseModel<Offer[]>) => {
        this.dialogService
          .open(OffersHistoryDialogComponent, {
            buyerId: offer.buyerId,
            sellerId: offer.sellerId,
            productId: this.product.id,
            product: this.product,
            userPerspective: this.userPerspective,
            actionType: OfferActionTypeEnum.COUNTER_OFFER,
          })
          .afterClosed()
          .subscribe(wasClosedByTheUser => {
            this.counterOfferAction.emit({ success: true, error: undefined });

            if (wasClosedByTheUser) {
              return;
            }
          });
      });
  }

  hasOfferExpired(offer): boolean {
    return OfferHelper.hasOfferExpired(offer);
  }
}
