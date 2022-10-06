import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableLike, Subject } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { LocalStorageService } from './local-storage.service';
import { HelperService, MappedCatalogProduct } from './common/helper.service';
import { ProductApprovalStatusEnum } from '@shared/constants/product-approval-statuses';
import { UserService } from '@services/user.service';
import { ApplyWishlist } from '@schemas/addwishlist.interface';
import { SegmentService } from '@services/segment.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public selectedProductType: BehaviorSubject<string> = new BehaviorSubject<string>(ProductApprovalStatusEnum.APPROVED);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private helperService: HelperService,
    private userService: UserService,
    private segmentService: SegmentService,
    private cookieService: CookieService
  ) {}

  private _updateWishlist = new BehaviorSubject(null);
  updateWishlist = this._updateWishlist.asObservable();

  public setUpdateWishlist(updateWishlist: boolean) {
    this._updateWishlist.next(updateWishlist);
  }

  public update(id: number, productApprovalData: any, imageUpdate = false): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/products-new/update/${id}`, productApprovalData);
  }

  public getProductFromAdminServices(id: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/products-new/${id}`).pipe(map(this.productMapperFromAdmin));
  }

  public updateProductGallery(id: number, productData: any): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/products-new/updateProductGallery/${id}`, productData);
  }

  public removeProductImage(userId: number, imageId: string, productId: string): Observable<any> {
    return this.http.get(
      `${environment.ADMIN_API_URL}/products-new/deleteProductMediaEntity/${productId}/${imageId}/${userId}`
    );
  }

  public removeProductMainImage(productId: number, uploadId: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/products-new/deleteProductImage/${productId}/${uploadId}/true`);
  }

  public productPriceDrop(id: number, productApprovalData: any, imageUpdate = false): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/products-new/price-drop/${id}`, productApprovalData);
  }

  public get(id: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/product/${id}`);
  }

  public getMaterials(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/materials/active`);
  }

  public getColors(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/color/active`);
  }

  public getCurrencies(): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/currencies`);
  }

  public getSizes(sizeType: string): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/styles/${sizeType}`);
  }

  public getCurrencyConversions(currencyCode: string): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/product-approval/conversionCurrencies/${currencyCode}`);
  }

  public getCountries(region: string): Observable<any> {
    let searchParams;

    if (region) {
      searchParams = { region };
    }

    return this.http.get(`${environment.ADMIN_API_URL}/countriesmapping`, { params: searchParams });
  }

  public getCountryWiseShipping(): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}countrywise-shipping`);
  }

  public getCurrencyWithProductProfessional(id: number): Observable<any> {
    return this.http.get(`${environment.ADMIN_API_URL}/currencies/currencywithproductProfessionalIdNew/${id}`);
  }

  public getCommisionRates(amount: number, currency: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/commissionRate/${currency}/${amount}`);
  }

  public getProducts(params: unknown = {}): Observable<ProductSearchResponseModel[]> {
    const user = this.userService.getUserData().getValue();

    params['commission_user_id'] = user.id;
    let queryParams = new HttpParams();

    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    });

    const options = { params: queryParams };

    return this.http.get<ProductSearchResponseModel[]>(`${environment.API_CATALOG_SVC}/product/search`, options);
  }

  public getProductsCount(params: any = {}): Observable<number> {
    const user = this.userService.getUserData().getValue();

    params['commission_user_id'] = user.id;
    let queryParams = new HttpParams();

    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    });

    const options = {
      params: queryParams,
    };

    return this.http.get<number>(`${environment.API_CATALOG_SVC}/product/count`, options);
  }

  public search(qs: string): Observable<ProductSearchResponseModel[]> {
    return this.http.get<ProductSearchResponseModel[]>(`${environment.API_CATALOG_SVC}/product/search?` + qs);
  }

  public searchAndMap(qs: string): Observable<MappedCatalogProduct[]> {
    return this.http.get<ProductSearchResponseModel[]>(`${environment.API_CATALOG_SVC}/product/search?` + qs).pipe(
      map((response: any): MappedCatalogProduct[] => {
        return this.helperService.mapProducts(response);
      })
    );
  }

  public deleteItem(id: any): Observable<any> {
    // TODO: It is better to send the userId as a parameter instead of getting it from localStorage
    // To Keep the method clean and testable
    //const userData = JSON.parse(this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_DATA));
    const userId = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.USER_ID);

    return this.http.delete(`${environment.ADMIN_API_URL}/products-new/delete/${id}/soft/${userId}`);
  }

  public addWishlist(data: any): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}wishlist`, data);
  }

  public removeWishList(productID): Observable<any> {
    return this.http.delete(`${environment.API_V2_URL}wishlist/${productID}`);
  }

  public getWishlist(): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}wishlist/list`);
  }

  public addProductsToWishlist(products: any): Observable<any> {
    const payload = new HttpParams().set('productId', JSON.stringify(products));

    return this.http.post(`${environment.API_V2_URL}wishlist/multiple`, payload);
  }

  private getUserWishlistRecordsBehaviour = new BehaviorSubject<any>(null);
  public getUserWishlistRecordsObservable = this.getUserWishlistRecordsBehaviour.asObservable();

  private applyWishlistBehaviour = new BehaviorSubject<ApplyWishlist | null>(null);
  public applyWishlistObservable = this.applyWishlistBehaviour.asObservable();

  public applyWishlist(data: any) {
    this.applyWishlistBehaviour.next(data);
  }

  private setHitBehaviour = new Subject();
  public setHitObservable = this.setHitBehaviour.asObservable();

  public setHit(data: any) {
    this.setHitBehaviour.next(data);
  }

  private setWishlistProductIDBehaviour = new BehaviorSubject<any>(null);
  setWishlistProductIDObservable = this.setWishlistProductIDBehaviour.asObservable();

  public setWishlistProductID(id: any) {
    this.setWishlistProductIDBehaviour.next(id);
  }

  public updateUserWishlistRecords(records: any) {
    this.getUserWishlistRecordsBehaviour.next(records);
  }

  public addToWishList(productId: any, userId: any, hit: any) {
    const formData = new FormData();

    formData.append('productId', productId);
    this.addWishlist(formData).subscribe(
      data => {
        this.segmentService.AddedToWishlist(userId, data.wishlist_id, hit);
      },
      error => {
        console.log(error);
      }
    );
  }

  public reSellProduct(productData: any): Observable<any> {
    return this.http.post(`${environment.ADMIN_API_URL}/products-new/resell`, productData);
  }

  public getProductDetail(productId, lang, curr): Observable<any> {
    return this.http.get(`${environment.API_CATALOG_URL}client/pdp/${productId}/lang/${lang}/currency/${curr}`);
  }

  public getSellerInfo(sellerId): Observable<any> {
    return this.http.get(`${environment.API_CATALOG_URL}public/product/seller-count/${sellerId}`);
  }

  public getSellerSoldItems(sellerId): Observable<any> {
    return this.http.get(`${environment.API_URL}/count-sold/${sellerId}`);
  }

  public getSimilarProducts(productId, stylesSeoUrl): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}product/similar/${productId}/${stylesSeoUrl}`);
  }

  public getSameBrandProducts(productId, stylesSeoUrl): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}product/sameBrand/${productId}/${stylesSeoUrl}`);
  }

  public swapMainImageWithGalleryImage(productId: number, galleryImageId: number): Observable<any> {
    return this.http.get(
      `${environment.ADMIN_API_URL}/products-new/swapProductMainImageWithGalleryImage/${productId}/${galleryImageId}`
    );
  }

  public updateProductGalleryOrder(productid: number, productGallery: any[]): Observable<any> {
    return this.http.post(
      `${environment.ADMIN_API_URL}/products-new/updateProductGalleryOrder/${productid}`,
      productGallery
    );
  }

  private productMapperFromAdmin(response: any): any {
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

  public getWishlistProductIDsByUser(userId: string | number): Observable<WishlistObjectIdsResponseModel> {
    return this.http.get<WishlistObjectIdsResponseModel>(
      `${environment.API_V2_URL}wishlist/list/user/${userId.toString()}`
    );
  }

  public getApprovedProducts(timestamps: any): Observable<any> {
    return this.http.get<any>(
      `${environment.API_CATALOG_URL}public/product/count-approval-range?fromTimestamp=${timestamps.from}&toTimestamp=${timestamps.to}`
    );
  }
}

export interface WishlistObjectIdsResponseModel {
  list: WishlistProductId[];
}

export interface WishlistProductId {
  product_id: string;
}
