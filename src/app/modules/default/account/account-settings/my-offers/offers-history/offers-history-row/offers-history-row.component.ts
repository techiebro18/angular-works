import { Component, Input, OnInit } from '@angular/core';
import { parseISO } from 'date-fns';
import DateUtils from '@shared/utils/date-utils';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import OfferHelper from '../../offer-helper';

@Component({
  selector: 'tvb-offers-history-row',
  templateUrl: './offers-history-row.component.html',
  styleUrls: ['./offers-history-row.component.scss'],
})
export class OffersHistoryRowComponent implements OnInit {
  @Input() offerMadeAt: Date | string;
  @Input() expirationDate: Date;
  @Input() offerPosition: number;
  @Input() isLastPosition: boolean;
  @Input() offerValue: number;
  @Input() buyerName: string;
  @Input() buyerProfilePicture: string;
  @Input() sellerName: string;
  @Input() sellerProfilePicture: string;
  @Input() currencyCode: string;
  @Input() currencySymbol: string;
  @Input() userPerspective: OfferUserPerspectiveEnum;
  offerOwnerType: OfferUserPerspectiveEnum;
  daysToRespond = 0;

  constructor() {}

  ngOnInit(): void {
    this.offerOwnerType = this.offerPosition % 2 > 0
      ? OfferUserPerspectiveEnum.BUYER
      : OfferUserPerspectiveEnum.SELLER;

    this.offerMadeAt = parseISO(DateUtils.DiscardTimezone(parseISO(this.offerMadeAt.toLocaleString())));

    if (this.offerMadeAt.getDay() === 5) {
      this.daysToRespond = 3; // in case of Friday
    }
    else {
      this.daysToRespond = 2; // All week days, except Friday
    }
  }

  getOfferValueText() {
    let text = this.offerPosition === 6
      ? 'Final '
      : '';

    if (OfferHelper.isBuyerPerspective(this.userPerspective)) {
      if (this.offerOwnerType === OfferUserPerspectiveEnum.BUYER) text += 'Offer Sent';

      if (this.offerOwnerType === OfferUserPerspectiveEnum.SELLER) text += 'Offer Received';
    }
    else if (OfferHelper.isSellerPerspective(this.userPerspective)) {
      if (OfferHelper.isBuyerOffer(this.offerOwnerType)) text += 'Offer Received';

      if (this.offerOwnerType === OfferUserPerspectiveEnum.SELLER) text += 'Offer Sent';
    }

    text += `: ${this.currencySymbol} ${this.offerValue.toFixed(2)}`;

    return text;
  }

  isBuyerPerspective(): boolean {
    return OfferHelper.isBuyerPerspective(this.userPerspective);
  }

  isSellerPerspective(): boolean {
    return OfferHelper.isSellerPerspective(this.userPerspective);
  }

  isBuyerRow(): boolean {
    return this.offerOwnerType === OfferUserPerspectiveEnum.BUYER;
  }

  isSellerRow(): boolean {
    return this.offerOwnerType === OfferUserPerspectiveEnum.SELLER;
  }

  getClassAccordingToOwnerAndPerspective(): string {
    if (this.isBuyerPerspective() && this.isBuyerRow()) {
      return 'buyer-perspective-buyer-position';
    }

    if (this.isBuyerPerspective() && this.isSellerRow()) {
      return 'buyer-perspective-seller-position';
    }

    if (this.isSellerPerspective() && this.isBuyerRow()) {
      return 'seller-perspective-buyer-position';
    }

    if (this.isSellerPerspective() && this.isSellerRow()) {
      return 'seller-perspective-seller-position';
    }

    return '';
  }

  getRowUserName(): string {
    if (this.isBuyerRow()) {
      return this.buyerName;
    }
    else if (this.isSellerRow()) {
      return this.sellerName;
    }

    return '';
  }

  getRowProfilePicture(): string {
    if (this.isBuyerRow()) {
      return this.buyerProfilePicture;
    }
    else if (this.isSellerRow()) {
      return this.sellerProfilePicture;
    }

    return '';
  }
}
