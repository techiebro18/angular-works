import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer } from '@schemas/account/offer.interface';
import { AppSetting } from '@schemas/app.interface';
import { Product } from '@schemas/product.interface';
import { Seller } from '@schemas/seller.interface';
import { OfferService } from '@services/account/offer.service';
import { AppService } from '@services/app/app.service';
import { LoaderService } from '@services/app/loader.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { Apiv2ResponseModel } from '@shared/models/apiv2-response.model';
import { OfferRequestModel } from '@shared/models/offer-request.model';
import { EMPTY, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import OfferHelper from '../../../modules/default/account/account-settings/my-offers/offer-helper';

@Component({
  selector: 'tvb-counter-offer-dialog',
  templateUrl: './counter-offer-dialog.component.html',
  styleUrls: ['./counter-offer-dialog.component.scss'],
})
export class CounterOfferDialogComponent implements OnInit, OnDestroy {
  public offerFormGroup: FormGroup = {} as FormGroup;
  public product: Product;
  public languageShortName: string;
  public currencyCode: string | CurrencyCodeEnum;
  public currencySymbol: string;
  public offerPercentage: number;
  public offerPosition: number;
  public offerHistory: Offer[];
  public maximumOfferPrice: number;
  public minimumOfferPrice: number;
  public offerSubmitted = false;
  public baseRemoteUrl = '';
  public seller: Seller = null;
  public lastOfferPrice: number;
  public typeStart = false;
  public offerSettings: AppSetting;
  public isMakeOfferEnabled = false;
  public errMessage = '';
  private offerSettingKey = 'make-an-offer';
  private subscriptions$: Subscription[] = [];

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private offerService: OfferService,
    private segmentService: SegmentService,
    private universalService: UniversalService,
    private userService: UserService,
    public dialogRef: MatDialogRef<CounterOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputParams: any
  ) {}

  ngOnInit(): void {
    this.product = this.inputParams.data.product;
    this.product.commission_user_type
      = this.product.commission_user_id == 0
        ? 'Professional'
        : this.product.commission_user_type;
    this.offerPosition = this.inputParams.data.position;
    this.offerHistory = this.inputParams.data.offerHistory;
    this.languageShortName = this.inputParams.data.languageShortName;
    this.currencyCode = this.inputParams.data.currencyCode;
    this.currencySymbol = this.inputParams.data.currencySymbol;
    this.lastOfferPrice = this.inputParams.data.lastOfferPrice;
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.loadOfferSettings();
    this.setupMinAndMaxPrices();
    this.loadSellerInfo();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      subscription?.unsubscribe();
    }
  }

  public onKeyUp(event: any): void {
    if (!this.typeStart) {
      this.segmentService.track('Counter Offer - Typed', { label: 'offer_typed' });
    }

    this.typeStart = true;
  }

  public submitOffer(): void {
    this.segmentService.track('Counter Offer - Button Clicked', { label: 'submit_offer' });
    this.loaderService.triggerLoading.emit(true);
    this.errMessage = '';

    if (this.offerFormGroup && !this.offerFormGroup.invalid) {
      const requestData: OfferRequestModel = {
        value: this.offerFormGroup.getRawValue().offer_price,
        buyerId: this.inputParams.data.buyerId,
        sellerId: this.inputParams.data.sellerId,
        currencyCode: this.currencyCode,
        productId: this.product.id,
        statusId: 0,
        position: this.inputParams.data.lastOfferPosition + 1,
      };

      this.subscriptions$.push(
        this.offerService
          .submitOffer(requestData)
          .pipe(
            concatMap((submitOfferResponse: ApiResponseModel<boolean>) => {
              if (submitOfferResponse.data) {
                return this.offerService.getOfferHistory(
                  requestData.buyerId,
                  requestData.sellerId,
                  requestData.productId,
                  requestData.currencyCode
                );
              }

              return EMPTY;
            })
          )
          .subscribe(
            (getOfferHistoryResponse: ApiResponseModel<Offer[]>) => {
              if (getOfferHistoryResponse.data) {
                this.offerHistory = getOfferHistoryResponse.data;

                this.segmentService.track(
                  'Counter Offer Made',
                  OfferHelper.generateSegmentProductObject(
                    this.offerHistory,
                    this.product,
                    this.seller,
                    this.currencyCode as CurrencyCodeEnum,
                    this.languageShortName,
                    this.baseRemoteUrl,
                    this.inputParams.data.userPerspective === OfferUserPerspectiveEnum.SELLER
                  )
                );
                this.offerSubmitted = true;
              }
              else {
                this.errMessage = getOfferHistoryResponse.message;
              }

              this.loaderService.triggerLoading.emit(false);
            },
            error => {
              if (error.message.length) {
                this.errMessage = error.message;
              }

              this.loaderService.triggerLoading.emit(false);
            }
          )
      );
    }
    else {
      this.loaderService.triggerLoading.emit(false);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public loadSellerInfo(): void {
    if (this.inputParams.data.sellerId == UserRolesEnum.TVB_ADMIN) {
      this.seller = {
        id: UserRolesEnum.TVB_ADMIN,
        company_name: 'The Vintage Bar',
        first_name: '',
        last_name: '',
        country: 'Denmark',
        image_id: 'assets/images/logo.jpg',
        username: 'the-vintage-bar',
        role_id: UserRolesEnum.PROFESSIONAL_SELLER,
      };
    }
    else {
      this.userService.getSeller(this.inputParams.data.sellerId).subscribe(data => {
        if (data) {
          this.seller = data['user'];
        }
      });
    }
  }

  public loadOfferSettings(): void {
    this.appService.getAppSetting(this.offerSettingKey).subscribe((response: Apiv2ResponseModel<AppSetting>) => {
      if (response.message === 'success') {
        this.offerSettings = response.model;
        this.isMakeOfferEnabled = response.model.status == 'active' && +response.model.value > 0;
        this.offerPercentage = +this.offerSettings.value;
      }
    });
  }

  shouldShowLastOfferWarning(): boolean {
    return (
      (this.inputParams.data.userPerspective === OfferUserPerspectiveEnum.BUYER
        && this.inputParams.data.lastOfferPosition === 4)
      || (this.inputParams.data.userPerspective === OfferUserPerspectiveEnum.SELLER
        && this.inputParams.data.lastOfferPosition === 5)
    );
  }

  private setupMinAndMaxPrices() {
    if (this.inputParams.data.lastOfferPosition === 1) {
      this.minimumOfferPrice = this.inputParams.data.lastOfferPrice + 0.01;
      this.maximumOfferPrice = this.product.price;
    }
    else {
      this.minimumOfferPrice = this.getMinPriceBasedOnLastPosition(this.inputParams.data.lastOfferPosition);
      this.maximumOfferPrice = this.getMaxPriceBasedOnLastPosition(this.inputParams.data.lastOfferPosition);
    }

    this.offerFormGroup = this.formBuilder.group({
      offer_price: [
        '',
        {
          validators: [
            Validators.min(this.minimumOfferPrice),
            Validators.max(this.maximumOfferPrice),
            Validators.compose([Validators.pattern(/[0-9]*\.?[0-9]*/), Validators.required]),
          ],
        },
      ],
    });
  }

  private getMaxPriceBasedOnLastPosition(lastPosition: number): number {
    if (lastPosition === 2 || lastPosition === 3) {
      const sellerFirstCounterOffer: Offer = this.offerHistory.filter(_ => _.position === 2)[0];

      return sellerFirstCounterOffer.price[this.inputParams.data.currencyCode].value;
    }

    if (lastPosition === 4 || lastPosition === 5) {
      const sellerSecondCounterOffer: Offer = this.offerHistory.filter(_ => _.position === 4)[0];

      return sellerSecondCounterOffer.price[this.inputParams.data.currencyCode].value;
    }

    return 0;
  }

  private getMinPriceBasedOnLastPosition(lastPosition: number): number {
    if (lastPosition === 2) {
      const originalOffer: Offer = this.inputParams.data.offerHistory.filter(_ => _.position === 1)[0];

      return originalOffer.price[this.inputParams.data.currencyCode].value + 0.01;
    }

    if (lastPosition === 3 || lastPosition === 4) {
      const buyerFirstCounterOffer: Offer = this.inputParams.data.offerHistory.filter(_ => _.position === 3)[0];

      return buyerFirstCounterOffer.price[this.inputParams.data.currencyCode].value + 0.01;
    }

    if (lastPosition === 5) {
      const buyerSecondCounterOffer: Offer = this.inputParams.data.offerHistory.filter(_ => _.position === 5)[0];

      return buyerSecondCounterOffer.price[this.inputParams.data.currencyCode].value + 0.01;
    }

    return 0;
  }
}
