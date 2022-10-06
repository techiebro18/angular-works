import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from './common/helper.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { UserService } from '@services/user.service';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';

export interface CommissionRate {
  price_USD: number;
  price_EUR: number;
  price_GBP: number;
  price_DKK: number;
  price_SEK: number;
  cost_USD: number;
  cost_EUR: number;
  cost_GBP: number;
  cost_DKK: number;
  cost_SEK: number;
  regular_price_USD: number;
  regular_price_EUR: number;
  regular_price_GBP: number;
  regular_price_DKK: number;
  regular_price_SEK: number;
  user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductApprovalService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private helperService: HelperService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  create(productApprovalData: any = {}): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/product-approval/create`, productApprovalData);
  }

  update(id: string, productApprovalData: any, imageUpdate = false): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/product-approval/update/${id}`, productApprovalData);
  }

  get(id: string | number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/product-approval/${id}`).pipe(map(this.productApprovalMapper));
  }

  getMaterials(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/materials/active`);
  }

  getColors(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/color/active`);
  }

  getCurrencies(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/currencies`);
  }

  getSizes(sizeType: string): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/styles/${sizeType}`);
  }

  getCurrencyConversions(currencyCode: string): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/product-approval/conversionCurrencies/${currencyCode}`);
  }

  getCountries(region: string): Observable<any> {
    let searchParams;

    if (region) {
      searchParams = { region };
    }

    return this.http.get(`${environment.ADMIN_API_URL}/countriesmapping`, {
      params: searchParams,
    });
  }

  getCountriesApiV2(region: string): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}countriesmapping/${region}`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${environment.USER_API_URL}/getAllCountry`);
  }

  removeProductImage(userId: number, imageId: string, productId: string): Observable<any> {
    return this.http.get(
      `${environment.ADMIN_API_URL}/product-approval/deleteProductMediaEntity/${productId}/${imageId}/${userId}`
    );
  }

  removeProductMainImage(productId: number, uploadId: number): Observable<any> {
    return this.http.get(
      `${environment.ADMIN_API_URL}/product-approval/deleteProductImage/${productId}/${uploadId}/true`
    );
  }

  getCurrencyWithProductProfessional(id: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/currencies/currencywithproductProfessionalIdNew/${id}`);
  }

  getCommissionRates(amount: number, currency: string, user_id?: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/commissionRate/${currency}/${amount}/${user_id}`);
  }

  getCommissionRateViaExchange(
    currencyCode: string,
    regularPrice: number,
    userId?: number
  ): Observable<CommissionRate> {
    const formattedUserId = this.getUserId(userId);

    return this.http.get<CommissionRate>(
      `${environment.API_V2_URL}cogs/regular-rate-exchange/${currencyCode}/${regularPrice}/${regularPrice}${formattedUserId}`
    );
  }

  /**
   *  API - Catalog SVC
   * @param statusFilter
   * @returns
   */

  public getItems(params: any = {}): Observable<any> {
    const user = this.userService.getUserData().getValue();

    params.commission_user_id = user.id;
    let queryParams = new HttpParams();

    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    });
    const options = {
      params: queryParams,
    };

    return this.http.get(`${environment.API_CATALOG_SVC}/product/search`, options).pipe(
      map((response: any) => {
        return this.helperService.mapProducts(response);
      })
    );
  }

  /**
   *
   * @param statusFilter Ole API
   * @returns list of products
   */
  public getItemsV1(statusFilter = 0): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('statusFilter', statusFilter.toString())
        .set('sortColumn', 'id')
        .set('pageSize', '100')
        .set('sortOrder', 'DESC'),
    };

    return this.http.get(`${environment.ADMIN_API_URL}/product-approval`, options).pipe(
      map((response: any) => {
        return response.productlist;
      })
    );
  }

  public deleteItem(id: any): Observable<any> {
    // TODO: It is better to send the userId as a parameter instead of getting it from localStorage
    // To Keep the method clean and testable
    // const userData = JSON.parse(this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_DATA));
    const userId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);

    return this.http.delete(`${environment.ADMIN_API_URL}/product-approval/delete/${id}/soft/${userId}`);
  }

  public swapMainImageWithGalleryImage(productApprovalId: number, galleryImageId: number): Observable<any> {
    return this.http.get(
      `${environment.ADMIN_API_URL}/product-approval/swapProductMainImageWithGalleryImage/${productApprovalId}/${galleryImageId}`
    );
  }

  public updateProductGalleryOrder(productId: string, productGallery): Observable<any> {
    return this.http.post(
      `${environment.ADMIN_API_URL}/product-approval/updateProductGalleryOrder/${productId}`,
      productGallery
    );
  }

  // not final
  public toDTO(productApproval: any): any {
    const restrictedFields = [
      'brand',
      'brand_name',
      'brand_name_translation',
      'brand_seo',
      'categories',
      'category',
      'color',
      'cost',
      'descriptions',
      'discount_price',
      'discover',
      'discovers',
      'extra_code',
      'extra_codes',
      'material',
      'media_uploads',
      'parent_brand_seo',
      'product_gallery_imgix',
      'productUpload',
      'media_entities',
      'styles',
    ];

    if (!productApproval.productGallery?.productGallery) {
      restrictedFields.push('productGallery');
    }

    for (const field of restrictedFields) {
      delete productApproval[field];
    }

    for (const field in productApproval) {
      // Comparing to null prevents that an empty array value to be removed from productApproval object
      if (productApproval[field] == null) {
        delete productApproval[field];
      }
    }

    return { ...productApproval };
  }

  /**
   *
   * Adds images to the ProductApproval gallery.
   *
   * If there is a need to delete some image, a list
   * with the IDs of those images can be passed to the 'imagesToDelete' param.
   *
   * @param id - String ID of the ProductApproval
   * @param productData - FormData with the images to add
   * @param imagesToDelete - Array of strings with the ID of the images to be deleted
   */
  updateProductGallery(id: number, productData: FormData, imagesToDelete: string[] = []): Observable<any> {
    let url = `${environment.ADMIN_API_URL}/products-new/updateProductGallery/${id}`;

    if (imagesToDelete.length > 0) {
      url = url.concat(`?deleteList=${imagesToDelete.join(',')}`);
    }

    return this.http.post(url, productData);
  }

  private productApprovalMapper(response: any): any {
    let mediaEntities;
    const mappedResponse = {
      ...response,
    };

    if (response.media_entities) {
      mediaEntities = response.media_entities.sort((prev: any, next: any) => {
        return prev.display_order - next.display_order;
      });
      const mainImage = mediaEntities.find(image => {
        return image.display_order === 0;
      });

      if (mainImage) {
        mappedResponse.productUpload = mediaEntities.shift();
      }

      mappedResponse.media_entities = mediaEntities;
    }

    return mappedResponse;
  }

  private getUserId(userId?: number): string {
    return userId === null || userId === undefined ? '' : '/' + userId;
  }
}
