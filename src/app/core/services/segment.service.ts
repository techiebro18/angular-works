import UserHelper from '@shared/helpers/user-helper';
import Order, { OrderUser } from '@services/checkout/models/order';
import { Injectable } from '@angular/core';
import { Product } from '@schemas/product.interface';
import { UniversalService } from '@services/universal.service';
import { CookieService } from 'ngx-cookie-service';

declare global {
  interface Window {
    analytics: any;
  }
}

export interface SegmentWaitlistItemModel {
  type: string;
  value: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  baseRemoteUrl = this.universalService.getApplicationUrl();

  constructor(private universalService: UniversalService, private cookieService: CookieService) {}

  public identify(user: any) {
    if (this.universalService.isBrowser && user.email?.length) {
      'analytics' in window
        && window.analytics.identify(user.id.toString(), {
          name: user.first_name,
          email: user.email,
        });
    }
  }

  public pageView(options?: any): void {
    if (this.universalService.isBrowser) {
      if (!options && window.document.title) options = { name: window.document.title };

      window?.analytics?.page(options);
    }
  }

  public JoinedWaitlist(category: any, filters: SegmentWaitlistItemModel[]) {
    if (this.universalService.isBrowser) {
      window.analytics.track('Joined Waitlist', { category, filters });
    }
  }

  public ProductClicked(ProductData: any, currency: string) {
    return window.analytics.track('Product Clicked', this.algoliaProduct(ProductData, currency));
  }

  public ProductViewed(productData: Product, lang: string, currency: string) {
    return window.analytics.track('Product Viewed', this.productArrayPDP(currency, lang, productData));
  }

  public ProductAdded(productData: Product, lang: string, currency: string) {
    return window.analytics.track('Product Added', this.productArrayPDP(currency, lang, productData));
  }

  public CheckoutStarted(
    currency: string,
    lang: string,
    revenue: number,
    productData: Array<{ name; catalog; position; product_id; brand_seo_url }>
  ) {
    const productDataArray = this.productCatalogArray(currency, lang, productData);

    return window.analytics.track('Checkout Started', {
      currency: currency,
      revenue: revenue,
      products: productDataArray,
    });
  }

  public CartViewed(
    currency: string,
    lang: string,
    productData: Array<{ name; catalog; position; product_id; brand_seo_url }>
  ) {
    const productDataArray = this.productCatalogArray(currency, lang, productData);

    return window.analytics.track('Cart Viewed', {
      currency: currency,
      products: productDataArray,
    });
  }

  public OrderCompleted(
    currency: string,
    lang: string,
    productData: Array<{ name; catalog; position; product_id; brand_seo_url }>,
    totalProductsValue: any,
    totalShippingValue: any,
    discount: any,
    order: Order,
    user: OrderUser
  ) {
    const productDataArray = this.productCatalogArray(currency, lang, productData);

    if (order?.order_cart?.length) {
      productData.forEach((product, index) => {
        order?.order_cart?.forEach((orderItem, oiIndex) => {
          if (orderItem?.product_id == product?.product_id)
            productDataArray[index].order_item_id = orderItem?.order_item_id?.toString();
        });
      });
    }

    return window.analytics.track(
      'Order Completed',
      {
        currency: currency,
        order_id: order?.order_id?.toString(),
        coupon: order?.coupon_code ?? '',
        subtotal: totalProductsValue - discount,
        tax: order?.order_detail?.tax ?? '',
        total: +totalShippingValue + totalProductsValue - discount,
        revenue: totalProductsValue - discount,
        shipping: totalShippingValue,
        discount: discount,
        products: productDataArray,
        email: user?.email,
        payment_method: order?.provider,
        shipping_method: 'dhl',
        queryID: this.cookieService.get('__queryID') || null,
        index: this.cookieService.get('indexName') || null,
        seller_first_name: user?.first_name ?? '',
        seller_username: user?.username ?? '',
        seller_country: user?.countryName ?? '',
        seller_company_name: user?.company_name ?? '',
        order_item_id: order?.order_cart[0]?.order_item_id,
      },
      {
        context: {
          triats: {
            email: user?.email,
            first_name: user?.first_name,
            last_name: user?.last_name,
            phone: (user?.phone_code ? user?.phone_code : '') + user?.mobile_no,
          },
        },
      }
    );
  }

  public productCatalogArray(
    currency: string,
    lang: string,
    productData: Array<{ name; catalog; position; product_id; brand_seo_url }>
  ): any {
    return productData?.map(product => {
      const cat = product?.catalog?.category
        .filter(obj => obj.lang === 'en')
        .map(function (val) {
          return val.value;
        })
        .join();

      return {
        brand: product?.catalog?.brand_name ?? '',
        name: product?.catalog?.name,
        price: product?.catalog?.regular_price?.find(obj => obj.currency === currency)?.value,
        product_id: product?.product_id,
        objectID: product?.product_id,
        position: product?.position ?? '',
        quantity: 1,
        currency: currency,
        styles: product?.catalog?.seo_url ?? '',
        category: cat,
        image: product?.catalog?.imgix_image_url ?? '',
        image_url: product?.catalog?.imgix_image_url ?? '',
        sku: product?.catalog?.sku,
        seller_sku: product?.catalog?.seller_sku ?? '',
        seller_id: product?.catalog?.commission_user_id.toString(),
        seller_type: UserHelper.isRoleIdTvbAdmin(product?.catalog?.commission_user_id)
          ? 'tvb'
          : product?.catalog?.commission_user_type,
        parent_category: product?.catalog?.main_category?.toLowerCase(),
        url:
          this.baseRemoteUrl
          + '/'
          + (product?.catalog?.styles?.length
            ? product?.catalog?.styles?.find(obj => obj.lang === 'en')?.value || ''
            : 'item')
          + '?pdp='
          + product?.product_id,
      };
    });
  }

  public productArrayPDP(currency: string, lang: string, product: Product) {
    const cat = product.categories
      .filter(obj => obj.lang === 'en')
      .map(function (val) {
        return val.value;
      })
      .join();
    const parentCat = product.parentCategories
      .filter(obj => obj.lang === 'en')
      .map(function (val) {
        return val.value;
      })
      .join();
    const color = product.colors
      .filter(obj => obj.lang === 'en')
      .map(function (val) {
        return val.value;
      })
      .join();

    return {
      brand: product.brand_name,
      category: cat,
      colors: color,
      currency: currency,
      condition: this.getCondition(product.condition_rating),
      image_url: product.imgix_image_url,
      index: this.cookieService.get('indexName') || null,
      name: product.name,
      objectID: product.id.toString(),
      parent_category: parentCat.toLowerCase(),
      price: parseFloat(product.price.toFixed(2)),
      product_id: '' + product.id,
      quantity: 1,
      queryID: this.cookieService.get('__queryID') || null,
      seller_id: product.commission_user_id,
      seller_type: UserHelper.isRoleIdTvbAdmin(product.commission_user_id) ? 'tvb' : product.commission_user_type,
      sku: product.sku,
      seller_sku: product.seller_sku,
      styles: product.brand_seo_url ?? '',
      url: this.baseRemoteUrl + '/' + (product.brand_seo_url ?? 'item') + '?pdp=' + product.id,
      is_out_of_stock: product.is_out_of_stock,
    };
  }

  public getCondition(rating) {
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
        return null;
      }
    }
  }

  public ProductListViewed(plpConfig: any, routeData: any, data: any) {
    if (this.universalService.isBrowser) {
      const segmentArray = this.algoliaProductArray(data, plpConfig.currency);
      const category
        = plpConfig.childCat != null
          ? plpConfig.childCat
          : plpConfig.childCat == null && plpConfig.parentCat != null
            ? plpConfig.parentCat
            : routeData.plpFor; // else

      window.analytics.track('Product List Viewed', {
        category: category,
        products: segmentArray,
        index: this.cookieService.get('indexName') || null,
      });
    }
  }

  public ProductListFiltered(
    parentCat: any,
    childCat: any,
    filters: any,
    productsList: Product[],
    plpConfig: any
  ): void {
    if (this.universalService.isBrowser) {
      const segmentArray = this.algoliaProductArray(productsList, plpConfig.currency);

      window.analytics.track('Product List Filtered', {
        filters,
        products: segmentArray,
        index: this.cookieService.get('indexName') || null,
      });
    }
  }

  public SignedIn(userID: any, email: any, location?: string) {
    if (this.universalService.isBrowser) {
      window.analytics.track('Signed In', { email: email, location: location, page_category: document.title });
    }
  }

  public SignedOut(email: any) {
    if (this.universalService.isBrowser) {
      window.analytics.track('Signed Out', { email: email });
    }
  }

  public algoliaProductArray(data: any, currency: string) {
    const segmentArray = [];

    data.forEach((productData, index) => {
      const seo_url = productData.styles_seo_url_en
        ? productData.styles_seo_url_en
        : productData.brand_seo_url
          ? productData.brand_seo_url
          : productData.seo_url;
      const arr = {
        brand: productData.brand_name,
        product_id: productData.id.toString(),
        sku: productData.sku.toString(),
        seller_sku: productData.seller_sku,
        objectID: productData.objectID,
        condition: productData.condition_rating ? this.getCondition(parseInt(productData.condition_rating)) : '',
        color: productData.color_en ? productData.color_en.join() : '',
        parent_category: productData.parent_category_en?.name ? productData.parent_category_en?.name : '',
        seller_id: parseInt(productData.commission_user_id),
        seller_type: UserHelper.isRoleIdTvbAdmin(productData.commission_user_id)
          ? 'tvb'
          : productData.commission_user_type,
        name: productData.name,
        category: productData.category_en?.name ? productData.category_en?.name : '',
        price: parseFloat(productData.regular_price_EUR.toFixed(2)),
        styles: seo_url,
        url: this.baseRemoteUrl + '/' + seo_url + '?pdp=' + productData.id,
        image_url: productData.imgix_image_url ?? '',
        currency: currency,
        position: productData.__position,
      };

      segmentArray.push(arr);
    });

    return segmentArray;
  }

  public algoliaProduct(productData: any, currency: string) {
    const seo_url = productData.styles_seo_url_en
      ? productData.styles_seo_url_en
      : productData.brand_seo_url
        ? productData.brand_seo_url
        : productData.seo_url;

    return {
      brand: productData.brand_name,
      product_id: productData.id.toString(),
      sku: productData.sku.toString(),
      seller_sku: productData.seller_sku,
      objectID: productData.objectID,
      condition: productData.condition_rating ? this.getCondition(parseInt(productData.condition_rating)) : '',
      color: productData.color_en ? productData.color_en.join() : '',
      parent_category: productData.parent_category_en?.name ? productData.parent_category_en?.name : '',
      seller_id: parseInt(productData.commission_user_id),
      seller_type: UserHelper.isRoleIdTvbAdmin(productData.commission_user_id)
        ? 'tvb'
        : productData.commission_user_type,
      name: productData.name,
      category: productData.category_en?.name ? productData.category_en?.name : '',
      price: parseFloat(productData.regular_price_EUR.toFixed(2)),
      styles: seo_url,
      url: this.baseRemoteUrl + '/' + seo_url + '?pdp=' + productData.id,
      image_url: productData.imgix_image_url ?? '',
      currency: currency,
      position: productData.__position,
      queryID: this.cookieService.get('__queryID') || null,
      index: this.cookieService.get('indexName') || null,
    };
  }

  public AddedToWishlist(userId: any, wishlistId: any, productData: any, currency = 'EUR') {
    if (this.universalService.isBrowser) {
      const seo_url = productData.styles_seo_url_en
        ? productData.styles_seo_url_en
        : productData.brand_seo_url
          ? productData.brand_seo_url
          : productData.seo_url;
      let cat = '';

      if (productData.category_en) cat = productData.category_en?.name;
      else if (productData.categories)
        cat = productData.categories
          .filter(obj => obj.lang === 'en')
          .map(function (val) {
            return val.value;
          })
          .join();
      else if (productData.category)
        cat = productData.category
          .filter(obj => obj.lang === 'en')
          .map(function (val) {
            return val.value;
          })
          .join();

      let parent_cat = '';

      if (productData.parent_category_en) parent_cat = productData.parent_category_en?.name;
      else if (productData.parentCategories)
        parent_cat = productData.parentCategories
          .filter(obj => obj.lang === 'en')
          .map(function (val) {
            return val.value;
          })
          .join();
      else if (productData.parent_category)
        parent_cat = productData.parent_category
          .filter(obj => obj.lang === 'en')
          .map(function (val) {
            return val.value;
          })
          .join();

      let colors = '';

      if (productData.color_en) colors = productData.color_en.join();
      else if (productData.colors)
        colors = productData.colors
          .filter(obj => obj.lang === 'en')
          .map(function (val) {
            return val.value;
          })
          .join();
      else if (productData.color)
        colors = productData.color
          .filter(obj => obj.lang === 'en')
          .map(function (val) {
            return val.value;
          })
          .join();

      window.analytics.track('Product Added to Wishlist', {
        wishlist_id: wishlistId.toString(),
        product_id: productData.id.toString(),
        condition: productData.condition_rating ? this.getCondition(parseInt(productData.condition_rating)) : '',
        parent_category: parent_cat.toLowerCase(),
        category: cat,
        color: colors,
        sku: productData.sku.toString(),
        seller_sku: productData.seller_sku.toString() || '',
        name: productData.name,
        brand: productData.brand_name,
        price: this.getRegularPrice(productData, currency),
        position: productData.__position ?? '',
        styles: seo_url ?? '',
        currency: currency,
        quantity: 1,
        image_url: productData.imgix_image_url,
        image: productData.imgix_image_url,
        seller_id: productData.commission_user_id,
        seller_type: UserHelper.isRoleIdTvbAdmin(productData.commission_user_id)
          ? 'tvb'
          : productData.commission_user_type,
        url: this.baseRemoteUrl + '/' + seo_url + '?pdp=' + productData.id,
      });
    }
  }

  private getRegularPrice(product: any, currency: string): number {
    if (product[`regular_price_${currency}`]) return parseFloat(product[`regular_price_${currency}`].toFixed(2));
    else {
      const price = product.regular_price.find(x => x.currency == currency).value;

      return parseFloat(price.toFixed(2));
    }
  }

  public track(name: string, options?: any): void {
    if (this.universalService.isBrowser) {
      window?.analytics?.track(name, options);
    }
  }

  public identifyOnePageUser(user: any) {
    if (this.universalService.isBrowser && user.email?.length) {
      'analytics' in window
        && window.analytics.identify(user.id, {
          userId: user.id,
          email: user.email,
        });
    }
  }

  public trackOnePageUser(
    name: string,
    options?: {
      label?: string;
      form?: string;
      category?: string;
      step?: number;
      step_name?: string;
      login_method?: string;
      payment_method?: string;
      shipping_method?: string;
    }
  ): void {
    if (this.universalService.isBrowser) {
      window.analytics.track(name, options);
    }
  }

  public SignedUp(userID: any, email: any, location?: string) {
    if (this.universalService.isBrowser) {
      window.analytics.track('Signed Up', { email: email, location: location });
    }
  }

  public forgotPasswordClick() {
    if (this.universalService.isBrowser) {
      window.analytics.track('Link Clicked', { label: 'forgot_password', category: 'checkout' });
    }
  }

  public removeProductButtonClick() {
    if (this.universalService.isBrowser) {
      window.analytics.track('Button Clicked', { label: 'removed_product' });
    }
  }

  public continueShoppingButtonClick() {
    if (this.universalService.isBrowser) {
      window.analytics.track('Button Clicked', { label: 'continue_shopping' });
    }
  }

  public proceedToCheckoutButtonClick() {
    if (this.universalService.isBrowser) {
      window.analytics.track('Button Clicked', { label: 'proceed_to_checkout' });
    }
  }

  public addToWishlistButtonClick() {
    if (this.universalService.isBrowser) {
      window.analytics.track('Button Clicked', { label: 'add_to_wishlist' });
    }
  }

  public priceDrop(event: string, product: any, url: string, location: string) {
    if (this.universalService.isBrowser) {
      window.analytics.track(event, {
        brand: product.brand_name,
        category: product.categoryname,
        color: product.colors[0]?.value,
        condition: product.condition_description,
        currency: product.base_currency,
        image_url: product.image_url,
        location: location,
        material: product.material,
        name: product.name,
        objectID: product.id,
        parent_category: product.parentCategories?.find(x => x.lang === 'en').value,
        price: product.price,
        product_id: product.id,
        seller_id: product.commission_user_id,
        seller_sku: product.seller_sku,
        seller_type: UserHelper.isRoleIdTvbAdmin(product.commission_user_id) ? 'tvb' : product.commission_user_type,
        sku: product.sku,
        styles: product.motherpage_seo_url,
        url: url,
      });
    }
  }

  public AcceptTerms(email: string, company_name: string, term: string) {
    return window.analytics.track('Terms Accepted Pro Seller', {
      email: email,
      seller_company_name: company_name,
      term: term,
    });
  }

  public AcceptTermsMyAgreements(email: string, company_name: string, term: string, commission_rates: any) {
    return window.analytics.track('Terms Accepted Pro Seller', {
      commission_rates: commission_rates,
      email: email,
      seller_company_name: company_name,
      term: term,
    });
  }
}
