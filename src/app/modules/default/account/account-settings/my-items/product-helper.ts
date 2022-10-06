import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';
import { UserData } from '@schemas/user.interface';

export class ProductHelper {
  getPriceOnSite(item: ProductSearchResponseModel): number {
    return item.regular_price.find(_ => _.currency === item.base_currency).value;
  }

  getPriceOnSiteByCurrency(item: ProductSearchResponseModel, userPreferredCurrency: string): number {
    return item.regular_price.find(_ => _.currency === userPreferredCurrency).value;
  }

  getForYouPrice(item: ProductSearchResponseModel): number {
    return item.cost.find(_ => _.currency === item.base_currency).value;
  }

  getForYouPriceByCurrency(item: ProductSearchResponseModel, userPreferredCurrency: string): number {
    return item.cost.find(_ => _.currency === item.base_currency).value;
  }

  getDiscountPrice(item: ProductSearchResponseModel): number {
    return item.discount_price.find(_ => _.currency === item.base_currency).value;
  }

  getDiscountPriceByCurrency(item: ProductSearchResponseModel, userPreferredCurrency: string): number {
    return item.discount_price.find(_ => _.currency === userPreferredCurrency).value;
  }

  getTranslatedBrandName(item: ProductSearchResponseModel, user: UserData): string {
    return item.brand_name_translation.find(_ => _.lang === user.languageName).value;
  }
}
