import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  public mapProducts(products: any): MappedCatalogProduct[] {
    return products.map(product => {
      const {
        creation_timestamp,
        brand_name,
        name,
        seller_sku: sku,
        sku: seller_sku_non_approved,
        mysql_id,
        regular_price,
        cost = [],
        base_currency,
        category,
        discount_price,
        media_entities = [],
        id,
        seo_url,
        is_discount,
      } = product;

      const regular_price_ins = regular_price.reduce((obj, next) => {
        if (next.currency === base_currency) {
          obj = next;
        }

        return obj;
      }, {});

      const discount_price_ins = discount_price.reduce((obj, next) => {
        if (next.currency === base_currency) {
          obj = next;
        }

        return obj;
      }, {});
      const product_cost = cost.reduce((obj, next) => {
        if (next.currency === base_currency) {
          obj = next;
        }

        return obj;
      }, {});

      let image = media_entities.find(me => me.display_order === 0) || {};

      if (!image && media_entities.length) {
        image = media_entities[0];
      }

      return {
        created_at: moment.unix(creation_timestamp).format('llll'),
        name,
        brand_name,
        sku,
        regular_price: regular_price_ins.value,
        cost_of_good: product_cost.value,
        id,
        mySqlId: mysql_id,
        base_currency,
        image,
        category,
        discount_price: discount_price_ins.value,
        seo_url,
        seller_sku_non_approved,
        hasDiscount: is_discount,
      };
    });
  }
}

export interface MappedCatalogProduct {
  base_currency: string;
  brand_name: string;
  category: string;
  cost_of_good: number;
  created_at: Date;
  discount_price: number;
  id: string;
  image: Image;
  mySqlId: string;
  name: string;
  regular_price: number;
  seller_sku_non_approved: string;
  seo_url: string;
  sku: string;
  hasDiscount: number;
}

export interface Image {
  id: null;
  uuid: string;
  deleted: boolean;
  content: boolean;
  gallery: boolean;
  qc: boolean;
  file_name: null;
  original_url: null;
  compact_url: string;
  large_url: string;
  xlarge_url: string;
  thumb_url: string;
  medium_url: string;
  extension: null;
  display_order: number;
  type: string;
}
