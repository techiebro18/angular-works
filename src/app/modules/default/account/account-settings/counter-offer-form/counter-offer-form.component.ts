import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@schemas/product.interface';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';
import { Offer, OfferPrice } from '@schemas/account/offer.interface';
import { Seller } from '@schemas/seller.interface';
import { AppSetting } from '@schemas/app.interface';
import { EMPTY, Subscription } from 'rxjs';
import { AppService } from '@services/app/app.service';
import { LoaderService } from '@services/app/loader.service';
import { OfferService } from '@services/account/offer.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { OfferRequestModel } from '@shared/models/offer-request.model';
import { concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiResponseModel } from '@shared/models/api-response.model';
import OfferHelper from '../my-offers/offer-helper';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { Apiv2ResponseModel } from '@shared/models/apiv2-response.model';
import { OutputEmitModel } from '@shared/models/output-emit.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommissionRate, ProductApprovalService } from '@services/product-approval.service';
import UserHelper from '@shared/helpers/user-helper';

@Component({
  selector: 'tvb-counter-offer-form',
  templateUrl: './counter-offer-form.component.html',
  styleUrls: ['./counter-offer-form.component.scss'],
})
export class CounterOfferFormComponent implements OnInit, OnDestroy {
  @Input() buyerId: number;
  @Input() sellerId: number;
  @Input() product: Product;
  @Input() offerHistory: Offer[];
  @Input() lastOfferPosition: number;
  @Input() lastOfferPrice: OfferPrice;
  @Input() languageShortName: string;
  @Input() currencyCode: string | CurrencyCodeEnum;
  @Input() currencySymbol: string;
  @Input() userPerspective: OfferUserPerspectiveEnum;
  @Output() offerMade: EventEmitter<OutputEmitModel> = new EventEmitter();
  public offerFormGroup: FormGroup = {} as FormGroup;
  public offerPercentage: number;
  public maximumOfferPrice: number;
  public minimumOfferPrice: number;
  public offerSubmitted = false;
  public baseRemoteUrl = '';
  public seller: Seller = null;
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
    private spinnerService: NgxSpinnerService,
    private offerService: OfferService,
    private segmentService: SegmentService,
    private universalService: UniversalService,
    private userService: UserService,
    private productApprovalService: ProductApprovalService
  ) {}

  ngOnInit(): void {
    this.product.commission_user_type
      = this.product.commission_user_id == 0
        ? 'Professional'
        : this.product.commission_user_type;
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.loadOfferSettings();
    this.setupMinAndMaxPrices();
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
    this.offerFormGroup.patchValue({
      offer_price: this.offerFormGroup.getRawValue().offer_price.replace(',', ''),
    });
  }

  public submitOffer(): void {
    this.segmentService.track('Counter Offer - Button Clicked', { label: 'submit_offer' });
    this.spinnerService.show();
    this.errMessage = '';

    if (this.offerFormGroup && !this.offerFormGroup.invalid) {
      this.loadSellerInfo();

      const requestData: OfferRequestModel = {
        value: +this.offerFormGroup.getRawValue().offer_price,
        buyerId: this.buyerId,
        sellerId: this.sellerId,
        currencyCode: this.currencyCode,
        productId: this.product.id,
        statusId: 0,
        position: this.lastOfferPosition + 1,
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
                    this.userPerspective === OfferUserPerspectiveEnum.SELLER
                  )
                );
                this.offerSubmitted = true;
              }
              else {
                this.errMessage = getOfferHistoryResponse.message;
              }

              this.spinnerService.hide();
              this.offerMade.emit({ success: true, error: false });
            },
            error => {
              if (error.message.length) {
                this.errMessage = error.message;
              }

              this.spinnerService.hide();
            }
          )
      );
    }
    else {
      this.spinnerService.hide();
    }
  }

  public loadSellerInfo(): void {
    if (this.sellerId == UserRolesEnum.TVB_ADMIN) {
      this.seller = {
        id: UserRolesEnum.TVB_ADMIN,
        company_name: 'The Vintage Bar',
        first_name: 'The Vintage Bar',
        last_name: '',
        country: 'Denmark',
        image_id: 'assets/images/logo.jpg',
        username: 'the-vintage-bar',
        role_id: UserRolesEnum.PROFESSIONAL_SELLER,
      };
    }
    else {
      this.userService.getSeller(this.sellerId).subscribe(data => {
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

  private setupMinAndMaxPrices() {
    if (this.lastOfferPosition === 1) {
      this.minimumOfferPrice = this.lastOfferPrice[this.currencyCode.toLowerCase()].value + 0.01;
      this.maximumOfferPrice = this.product.price;
    }
    else {
      this.minimumOfferPrice = this.getMinPriceBasedOnLastPosition(this.lastOfferPosition);
      this.maximumOfferPrice = this.getMaxPriceBasedOnLastPosition(this.lastOfferPosition);
    }

    this.setupForm();
  }

  private setupForm(): void {
    this.offerFormGroup = this.formBuilder.group({
      offer_price: [
        '',
        {
          validators: [
            Validators.min(this.minimumOfferPrice),
            Validators.max(this.maximumOfferPrice),
            Validators.compose([Validators.pattern(/\d*\.?\d*/), Validators.required]),
          ],
        },
      ],
      for_you_price: [{ value: '', disabled: true }],
    });

    function getUserIdAccordingToUserRole() {
      if (UserHelper.isProfessionalSellerRole(this.userService.getUserData().getValue()))
        return this.userService.getUserData().getValue().id;
      else if (UserHelper.isTvbAdminRole(this.userService.getUserData().getValue())) return 0;
      else return null;
    }

    this.subscriptions$.push(
      this.offerFormGroup
        .get('offer_price')
        .valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(() => {
            if (!this.isFormInputInvalid('offer_price')) {
              return this.productApprovalService.getCommissionRateViaExchange(
                this.currencyCode,
                this.offerFormGroup.get('offer_price').value,
                getUserIdAccordingToUserRole.call(this)
              );
            }
            else {
              this.offerFormGroup.patchValue({ for_you_price: '' });

              return EMPTY;
            }
          })
        )
        .subscribe((responseSuccess: CommissionRate) => {
          this.offerFormGroup.patchValue({ for_you_price: responseSuccess[`cost_${this.currencyCode}`] });
        })
    );
  }

  private getMaxPriceBasedOnLastPosition(lastPosition: number): number {
    if (lastPosition === 2 || lastPosition === 3) {
      const sellerFirstCounterOffer: Offer = this.offerHistory.filter(_ => _.position === 2)[0];

      return sellerFirstCounterOffer.price[this.currencyCode.toLowerCase()].value;
    }

    if (lastPosition === 4 || lastPosition === 5) {
      const sellerSecondCounterOffer: Offer = this.offerHistory.filter(_ => _.position === 4)[0];

      return sellerSecondCounterOffer.price[this.currencyCode.toLowerCase()].value;
    }

    return 0;
  }

  private getMinPriceBasedOnLastPosition(lastPosition: number): number {
    if (lastPosition === 2) {
      const originalOffer: Offer = this.offerHistory.filter(_ => _.position === 1)[0];

      return originalOffer.price[this.currencyCode.toLowerCase()].value + 0.01;
    }

    if (lastPosition === 3 || lastPosition === 4) {
      const buyerFirstCounterOffer: Offer = this.offerHistory.filter(_ => _.position === 3)[0];

      return buyerFirstCounterOffer.price[this.currencyCode.toLowerCase()].value + 0.01;
    }

    if (lastPosition === 5) {
      const buyerSecondCounterOffer: Offer = this.offerHistory.filter(_ => _.position === 5)[0];

      return buyerSecondCounterOffer.price[this.currencyCode.toLowerCase()].value + 0.01;
    }

    return 0;
  }

  isFormInputInvalid(formControlName: string): boolean {
    return (
      this.offerFormGroup.dirty
      && this.offerFormGroup.get(formControlName).errors
      && this.offerFormGroup.get(formControlName).invalid
    );
  }

  isSellerPerspective(): boolean {
    return OfferHelper.isSellerPerspective(this.userPerspective);
  }
}
