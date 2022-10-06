import UserHelper from '@shared/helpers/user-helper';
import { Offer } from '@schemas/account/offer.interface';
import { Product } from '@schemas/product.interface';
import { Seller } from '@schemas/seller.interface';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { ProductCategoriesStringEnum } from '@shared/enums/product-categories-string.enum';
import { ProductConditionsStringEnum } from '@shared/enums/product-conditions-string.enum';
import { SellerTypeStringEnum } from '@shared/enums/seller-type-string.enum';
import DateUtils from '@shared/utils/date-utils';
import { addDays, differenceInMinutes, parseISO } from 'date-fns';

export interface CounterOfferSegmentObj {
  brand: string;
  buyer_id?: string;
  category: string;
  color?: string;
  condition: ProductConditionsStringEnum;
  currency: CurrencyCodeEnum;
  image_url?: string;
  is_seller_event: boolean;
  product_id: string;
  material?: string;
  name: string;
  offer_amount: number;
  parent_category: ProductCategoriesStringEnum;
  previous_offer_amount: number;
  price: number;
  position?: number; // This is regarding the Product
  seller_company_name: string;
  seller_country: string;
  seller_first_name: string;
  seller_id: string;
  seller_sku: string;
  seller_type: SellerTypeStringEnum | string;
  seller_username: string;
  sku: string;
  styles: string;
  url?: string;
}

/**
 * Helper class for 'Make an Offer' feature
 */
export default class OfferHelper {
  /**
   * Given an offer, gets the time left to such offer expire.
   *
   * @param {Offer} offer
   * @returns {number} - Time left to expire in minutes, two decimal places
   */
  static getTimeToExpireValue(offer: Offer): number {
    const offerCreatedAt: Date = parseISO(offer?.createdAt.toString());
    const nowUTC: Date = parseISO(DateUtils.DiscardTimezone(new Date()));

    return +(
      differenceInMinutes(addDays(offerCreatedAt, OfferHelper.calculateExpirationDays(offerCreatedAt)), nowUTC) / 60
    ).toFixed(2);
  }

  /**
   * Given a date, calculates how may days will be the expiration time amount (in days).
   *
   * All week days should have expiration time of 48h (two days),
   * except for Friday which expires in 72h (three days)
   *
   * @param {Date} createdAt - Date to be calculated
   * @returns {number} - Number of days to expiration date
   */
  static calculateExpirationDays(createdAt: Date): number {
    if (createdAt.getDay() === 5) {
      // in case of Friday
      return 3;
    }
    else {
      // All week days, except Friday
      return 2;
    }
  }

  static getExpiredHoursValue(offer: Offer): number {
    return OfferHelper.getTimeToExpireValue(offer) * -1;
  }

  static hasOfferExpired(offer: Offer): boolean {
    return OfferHelper.getTimeToExpireValue(offer) <= 0;
  }

  static isBuyerOffer(offerPosition: number): boolean {
    return offerPosition % 2 > 0;
  }

  static isSellerOffer(offerPosition: number): boolean {
    return offerPosition % 2 === 0;
  }

  static isBuyerPerspective(userPerspective: OfferUserPerspectiveEnum): boolean {
    return userPerspective === OfferUserPerspectiveEnum.BUYER;
  }

  static isSellerPerspective(userPerspective: OfferUserPerspectiveEnum): boolean {
    return userPerspective === OfferUserPerspectiveEnum.SELLER;
  }

  static getPreviousOfferAmount(offerHistory: Offer[], currencyCode: CurrencyCodeEnum): number {
    const lastOffer: Offer = [...offerHistory].pop();

    if (lastOffer.position > 1) {
      return offerHistory[offerHistory.length - 2].price[currencyCode.toLowerCase()].value;
    }
    else {
      return null;
    }
  }

  static generateSegmentProductObject(
    offerHistory: Offer[],
    product: Product,
    seller: Seller,
    currencyCode: CurrencyCodeEnum,
    languageShortname: string,
    baseRemoteUrl: string,
    sellerEvent: boolean
  ): CounterOfferSegmentObj {
    const offer: Offer = [...offerHistory].pop();

    return {
      brand: product.brand_name,
      buyer_id: offer.buyerId.toString(),
      category: product.categoryname,
      color: product.colors.length ? product.colors[0].value : '',
      condition: (APP_CONSTANTS.PRODUCT.CONDITIONS[product.condition_rating] as ProductConditionsStringEnum) || null,
      currency: currencyCode,
      image_url: product.imgix_image_url,
      is_seller_event: sellerEvent,
      name: product.name || '',
      offer_amount: offer.price[currencyCode.toLowerCase()].value,
      parent_category: product.parentCategories.find(obj => obj.lang === languageShortname)
        .value as ProductCategoriesStringEnum,
      position: +product.position || null,
      previous_offer_amount: OfferHelper.getPreviousOfferAmount(offerHistory, currencyCode as CurrencyCodeEnum),
      price: product.price,
      product_id: product.id,
      material: product.material || '',
      seller_company_name: seller.company_name,
      seller_country: seller.country,
      seller_first_name: seller.first_name,
      seller_id: seller.id.toString(),
      seller_sku: product.seller_sku ?? '',
      seller_type: UserHelper.isRoleIdTvbAdmin(product.commission_user_id) ? 'tvb' : product.commission_user_type,
      seller_username: seller.username,
      sku: product.sku,
      styles: product.motherpage_seo_url,
      url: baseRemoteUrl + '/' + product.motherpage_seo_url + '?pdp=' + product.id,
    };
  }

  static isLastOffer(userPerspective: OfferUserPerspectiveEnum, lastOfferPosition: number): boolean {
    return (
      (userPerspective === OfferUserPerspectiveEnum.BUYER && lastOfferPosition === 4)
      || (userPerspective === OfferUserPerspectiveEnum.SELLER && lastOfferPosition === 5)
    );
  }
}
