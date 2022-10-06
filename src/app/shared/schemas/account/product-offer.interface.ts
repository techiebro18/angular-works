import { Offer } from '@schemas/account/offer.interface';

export interface ProductOffer {
  id: string;
  name: string;
  seoUrl: string;
  imageUrl: string;
  stock: number;
  price_DKK?: number;
  price_EUR?: number;
  price_GBP?: number;
  price_SEK?: number;
  price_USD?: number;
  offers: Offer[];
}
