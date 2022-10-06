import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Seller } from '@schemas/seller.interface';
import { UserData } from '@schemas/user.interface';
import { OfferService } from '@services/account/offer.service';
import { PriceDropService } from '@services/account/price-drop.service';
import { LoaderService } from '@services/app/loader.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { OfferRequestModel } from '@shared/models/offer-request.model';
import { OfferPrice } from '@schemas/account/offer.interface';
import { ApiResponseModel } from '@shared/models/api-response.model';
import UserHelper from '@shared/helpers/user-helper';

@Component({
  selector: 'app-make-offer-dialog',
  templateUrl: './make-offer-dialog.component.html',
  styleUrls: ['./make-offer-dialog.component.scss'],
})
export class MakeOfferDialogComponent implements OnInit {
  private language;
  public offerFormGroup: FormGroup = {} as FormGroup;
  public product: any;
  public currency: string;
  public currencySymbol: string;
  public offerPercentage: any;
  public brand: string;
  public endPrice: any;
  public startingPrice: any;
  public title: string;
  public style: string;
  public url: string;
  public price: number;
  public position = '';
  public typeStart = false;
  public offerSubmitted = false;
  public priceOffered: number;
  public discountPrice: number;
  public sellerId: number;
  public discountPrices: OfferPrice[];
  public errMessage = '';
  public baseRemoteUrl = '';
  public seller: Seller = null;
  public user: UserData;
  public isOfferUnderNegotiation: boolean = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private universalService: UniversalService,
    private userService: UserService,
    private offerService: OfferService,
    private spinnerService: NgxSpinnerService,
    private segmentService: SegmentService,
    private priceDropService: PriceDropService,
    public dialogRef: MatDialogRef<MakeOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.product = this.data?.data?.product;
    this.product.commission_user_type
      = this.product.commission_user_id == 0
        ? 'Professional'
        : this.product.commission_user_type;
    this.position = this.data?.data?.position;
    this.language = this.data?.data?.language;
    this.currency = this.data?.data?.currency;
    this.currencySymbol = this.data?.data?.currencySymbol;
    this.offerPercentage = this.data?.data?.offerPercentage;
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.price = this.product.price ?? this.product[`regular_price_${this.currency}`];
    this.discountPrice = this.product.discounted_price ?? this.product[`discounted_price_${this.currency}`];
    this.brand = this.product.brand_name;
    this.title = this.product.name;
    this.style = this.product.brand_seo_url;
    this.discountPrices = this.product.discount_prices;
    this.sellerId = this.data?.data?.sellerId;
    this.user = this.userService.getUserData().getValue();

    if (this.product.is_discount) {
      this.startingPrice = this.discountPrice - this.discountPrice * (this.offerPercentage / 100);
      this.endPrice = this.discountPrice;
    }
    else {
      this.startingPrice = this.price - this.price * (this.offerPercentage / 100);
      this.endPrice = this.price;
    }

    this.offerFormGroup = this.formBuilder.group({
      offer_price: [
        '',
        {
          validators: [
            Validators.min(this.startingPrice),
            Validators.max(this.endPrice),
            Validators.compose([Validators.pattern(/\d*\.?\d*/), Validators.required]),
          ],
        },
      ],
    });
    this.getSellerInfo();

    this.offerService
      .isOfferUnderNegotiation(this.user.id, this.sellerId, this.product.id)
      .subscribe((responseSuccess: ApiResponseModel<boolean>) => {
        this.isOfferUnderNegotiation = responseSuccess.data;
      });
  }

  public onKeyUp(event: any): void {
    if (!this.typeStart) {
      this.segmentService.track('Offer Typed', { label: 'offer_typed' });
    }

    this.typeStart = true;
    this.offerFormGroup.patchValue({
      offer_price: this.offerFormGroup.getRawValue().offer_price.replace(',', ''),
    });
  }

  public submitOffer() {
    this.segmentService.track('Button Clicked', { label: 'submit_offer' });
    this.spinnerService.show();
    const baseRemoteUrl = this.universalService.getApplicationUrl();

    this.errMessage = '';

    if (this.offerFormGroup && !this.offerFormGroup.invalid) {
      const formData: OfferRequestModel = {
        value: +this.offerFormGroup.getRawValue().offer_price,
        buyerId: this.user.id,
        sellerId: this.sellerId,
        currencyCode: this.currency,
        productId: this.product.id,
        statusId: 0,
        position: 1,
      };

      this.offerService.submitOffer(formData).subscribe(
        response => {
          if (response.data == true) {
            this.subscribePriceDrop();
            this.priceOffered = this.offerFormGroup.getRawValue().offer_price;
            const segmentObj = {
              brand: this.brand,
              parent_category: this.getParentCategories(),
              category: this.product.categoryname,
              color: this.getColor(),
              condition: this.segmentService.getCondition(this.product.condition_rating),
              currency: this.currency,
              image_url: this.product.imgix_image_url,
              name: this.title,
              offer_amount: +this.priceOffered,
              position: this.position,
              price: this.endPrice,
              product_id: this.product.id,
              seller_company_name: this.seller.company_name,
              seller_country: this.seller.country,
              seller_first_name: this.seller.first_name,
              seller_id: this.sellerId,
              seller_type: UserHelper.isRoleIdTvbAdmin(this.product.commission_user_id)
                ? 'tvb'
                : this.product.commission_user_type,
              seller_username: this.seller.username,
              sku: this.product.sku,
              seller_sku: this.product.seller_sku ?? '',
              styles: this.product.motherpage_seo_url,
              is_seller_event: false,
              url: baseRemoteUrl + '/' + this.product.motherpage_seo_url + '?pdp=' + this.product.id,
            };

            this.segmentService.track('Offer Made', segmentObj);
            this.offerSubmitted = true;
          }
          else {
            this.errMessage = response.message;
          }

          this.spinnerService.hide();
        },
        error => {
          if (error.message.length) {
            this.errMessage = error.message;
          }

          this.spinnerService.hide();
        }
      );
    }
    else {
      this.spinnerService.hide();
    }
  }

  getColor() {
    const color
      = (this.product.colors?.length
        ? this.product.colors[0].value
        : null)
      ?? (this.product.color_code?.length
        ? this.product.color_code[0].value
        : '');

    return color;
  }

  getParentCategories() {
    return (
      this.product.parentCategories?.find(obj => obj.lang === this.language).value
      ?? this.product[`parent_category_${this.language}`]
    );
  }

  private subscribePriceDrop() {
    this.priceDropService.subscribeProductPriceDrop({ product_id: this.product.id }).subscribe(response => {});
  }

  private getCondition(rating) {
    switch (rating) {
    case 1: {
      return 'new with tags';
    }
    case 2: {
      return 'excellent';
    }
    case 4: {
      return 'good but used';
    }
    case 5: {
      return 'worn with love';
    }
    default: {
      return '';
    }
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  getSellerInfo() {
    if (this.sellerId == UserRolesEnum.TVB_ADMIN) {
      this.seller = {
        id: UserRolesEnum.TVB_ADMIN,
        company_name: 'The Vintage Bar',
        first_name: '',
        last_name: '',
        country: 'Denmark',
        image_id: 'assets/images/logo.jpg',
        username: 'the-vintage-bar',
        role_id: 15,
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
}
