export interface Offer {
  id: number;
  sellerId?: number;
  buyerId?: number;
  buyerName?: string;
  sellerName?: string;
  buyerProfilePicture?: string;
  sellerProfilePicture?: string;
  productId: string;
  product: OfferProduct;
  statusId: number;
  status: string;
  position: number;
  price: OfferPrice;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferSettings {
  status: string;
  value: number;
}

export interface OfferProduct {
  id: string;
  name: string;
  seoUrl: string;
  imageUrl: string;
  stock: number;
  price: OfferProductPrice;
}

export interface OfferProductPrice {
  currency: string;
  value: number;
  costOfGoods: number;
}

export interface OfferPrice {
  EUR: OfferCurrency;
  USD: OfferCurrency;
  GBP: OfferCurrency;
  DKK: OfferCurrency;
  SEK: OfferCurrency;
}

export interface OfferCurrency {
  value: number;
  costOfGoods: number;
}
