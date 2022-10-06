import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Offer } from '@schemas/account/offer.interface';
import { ProductOffer } from '@schemas/account/product-offer.interface';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { OfferRequestModel } from '@shared/models/offer-request.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private offerGlobalStatus$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  public getOfferGlobalStatus(): BehaviorSubject<boolean> {
    return this.offerGlobalStatus$;
  }

  public setOfferGlobalStatus(status: boolean): void {
    this.offerGlobalStatus$.next(status);
  }

  public getBuyerOffers(buyerId: number, currencyCode: string): Observable<ApiResponseModel<Offer[]>> {
    return this.httpClient.get<ApiResponseModel<Offer[]>>(
      `${environment.OFFER_API_URL}/offers/buyer/${buyerId}?currencyCode=${currencyCode}`
    );
  }

  public getSellerOffers(sellerId: number, currencyCode: string): Observable<ApiResponseModel<Offer[]>> {
    return this.httpClient.get<ApiResponseModel<Offer[]>>(
      `${environment.OFFER_API_URL}/offers/seller/${sellerId}?currencyCode=${currencyCode}`
    );
  }

  public getSellerOffersOnlyLastPosition(
    sellerId: number,
    currencyCode: string,
    activeOffers = true
  ): Observable<ApiResponseModel<Offer[]>> {
    return this.httpClient.get<ApiResponseModel<Offer[]>>(
      `${environment.OFFER_API_URL}/offers/seller/${sellerId}`
        + `/last-position?currencyCode=${currencyCode}&active=${activeOffers}`
    );
  }

  public getSellerOffersOnlyLastPositionByProduct(
    sellerId: number,
    currencyCode: string,
    productId: string
  ): Observable<ApiResponseModel<Offer[]>> {
    return this.httpClient.get<ApiResponseModel<Offer[]>>(
      `${environment.OFFER_API_URL}/offers/seller/${sellerId}`
        + `/last-position?currencyCode=${currencyCode}&productId=${productId}`
    );
  }

  public getBuyersOfferOnlyLastPosition(
    buyerId: number,
    currencyCode: string,
    activeOffers = true
  ): Observable<ApiResponseModel<Offer[]>> {
    return this.httpClient.get<ApiResponseModel<Offer[]>>(
      `${environment.OFFER_API_URL}/offers/buyer/${buyerId}`
        + `/last-position?currencyCode=${currencyCode}&active=${activeOffers}`
    );
  }

  public acceptOffer(
    offerId: number,
    userPerspective: OfferUserPerspectiveEnum
  ): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.get<ApiResponseModel<boolean>>(
      `${environment.OFFER_API_URL}/offers/accept/${offerId}/${userPerspective}`
    );
  }

  public rejectOffer(
    offerId: number,
    userPerspective: OfferUserPerspectiveEnum
  ): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.get<ApiResponseModel<boolean>>(
      `${environment.OFFER_API_URL}/offers/reject/${offerId}/${userPerspective}`
    );
  }

  public submitOffer(offerData: OfferRequestModel): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.post<ApiResponseModel<boolean>>(
      `${environment.OFFER_API_URL}/offers/receive-offer`,
      offerData
    );
  }

  public isGlobalOfferParamEnabled(): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.get<ApiResponseModel<boolean>>(
      environment.OFFER_API_URL + '/offers/is-global-offer-param-enabled'
    );
  }

  public isUserOpenToOffers(userId: number): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.get<ApiResponseModel<boolean>>(
      `${environment.OFFER_API_URL}/offers/is-open-to-offers/${userId}`
    );
  }

  public updateOpenToOffersParam(sellerId: number, enable: boolean): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.put<ApiResponseModel<boolean>>(`${environment.OFFER_API_URL}/offers/open-to-offers`, {
      sellerId,
      enable,
    });
  }

  public getAcceptedOffer(
    buyerId: number,
    productId: string,
    currencyCode: string
  ): Observable<ApiResponseModel<Offer>> {
    return this.httpClient.get<ApiResponseModel<Offer>>(
      `${environment.OFFER_API_URL}/offers/accepted/buyer`
        + `/${buyerId}?productIds=${productId}&currencyCode=${currencyCode}`
    );
  }

  public getAcceptedProductOffer(
    buyerId: number,
    productId: string,
    currencyCode: string
  ): Observable<ApiResponseModel<ProductOffer>> {
    return this.httpClient.get<ApiResponseModel<ProductOffer>>(
      `${environment.OFFER_API_URL}/offers/accepted/products/buyer/${buyerId}`
        + `?productIds=${productId}&currencyCode=${currencyCode}`
    );
  }

  public getOfferHistory(
    buyerId: number,
    sellerId: number,
    productId: string,
    currencyCode = 'EUR'
  ): Observable<ApiResponseModel<Offer[]>> {
    return this.httpClient.get<ApiResponseModel<Offer[]>>(
      `${environment.OFFER_API_URL}/offers/history`
        + `?buyerId=${buyerId}&sellerId=${sellerId}&productId=${productId}`
        + `&currencyCode=${currencyCode}`
    );
  }

  public getSellersOpenToOffers(sellerIds: string): Observable<ApiResponseModel<any>> {
    return this.httpClient.get<ApiResponseModel<any>>(
      `${environment.OFFER_API_URL}/seller/open-to-offers/?${sellerIds}`
    );
  }

  public isOfferUnderNegotiation(
    buyerId: number,
    sellerId: number,
    productId: string
  ): Observable<ApiResponseModel<boolean>> {
    return this.httpClient.get<ApiResponseModel<boolean>>(
      `${environment.OFFER_API_URL}/offers`
        + `/is-offer-under-negotiation?buyerId=${buyerId}&sellerId=${sellerId}&productId=${productId}`
    );
  }
}
