import { Injectable } from '@angular/core';
import { CheckoutData, CouponCode, FilterRecord, Product } from '@schemas/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  // TODO:Ayham need to be refactor

  productData: Product[] = [];

  couponcode: any;

  private currentCartCount = new BehaviorSubject(0);
  private item_count = new BehaviorSubject(0);
  private cardItemsOrder = new BehaviorSubject(0);
  private filterMaxPrice = new BehaviorSubject(0);
  private filterMinPrice = new BehaviorSubject(0);
  private currentEditUrls = new BehaviorSubject<string | null>(null);

  currentMessage = this.currentCartCount.asObservable();
  item_count_message = this.item_count.asObservable();

  cardItems = this.cardItemsOrder.asObservable();
  maxfilterMessage = this.filterMaxPrice.asObservable();
  minfilterMessage = this.filterMinPrice.asObservable();
  currentEditUrlObs = this.currentEditUrls.asObservable();

  // ------wishlist ---//
  private updatedProductBehaviour = new BehaviorSubject(this.productData);
  updatedProductObservable = this.updatedProductBehaviour.asObservable();

  private updatedProductSearchBehaviour = new BehaviorSubject(this.productData);
  updatedProductSearchObservable = this.updatedProductSearchBehaviour.asObservable();

  private updatedDesignerProductBehaviour = new BehaviorSubject(this.productData);
  updatedDesignerProductObservable = this.updatedDesignerProductBehaviour.asObservable();

  private updatedNewarrivalProductBehaviour = new BehaviorSubject(this.productData);
  updatedNewarrivalProductObservable = this.updatedNewarrivalProductBehaviour.asObservable();

  private updatedWishlistProductBehaviour = new BehaviorSubject(this.productData);
  updatedWishlistProductObservable = this.updatedWishlistProductBehaviour.asObservable();

  private updatedFilterListBehaviour = new BehaviorSubject<FilterRecord | null>(null);
  updatedFilterListObservable = this.updatedFilterListBehaviour.asObservable();

  private updatedCartListBehaviour = new BehaviorSubject<Product | null>(null);
  updatedCartListObservable = this.updatedCartListBehaviour.asObservable();

  private updatedUserBehaviour = new BehaviorSubject<string | null>(null);
  updatedUserObservable = this.updatedUserBehaviour.asObservable();

  private updatedSortOrderBehaviour = new BehaviorSubject<string | null>(null);
  updatedSortOrderObservable = this.updatedSortOrderBehaviour.asObservable();

  private updatedSortOrderCountBehaviour = new BehaviorSubject(0);
  updatedSortOrderCountObservable = this.updatedSortOrderCountBehaviour.asObservable();

  private wishlistpopBehaviour = new BehaviorSubject<boolean>(false);
  wishlistpopObservable = this.wishlistpopBehaviour.asObservable();

  private wishlistpopproductBehaviour = new BehaviorSubject<number | null>(null);
  wishlistpopproductObservable = this.wishlistpopproductBehaviour.asObservable();

  // private headerpopBehaviour = new BehaviorSubject(this.wishlistpop);
  // headerpopObservable = this.headerpopBehaviour.asObservable();
  // headerpopStatus(status: boolean) {
  //     this.headerpopBehaviour.next(status);
  // }

  private currentAppliedCoupon = new BehaviorSubject<CouponCode | null>(null);
  currentAppliedCouponObs = this.currentAppliedCoupon.asObservable();

  private orderTotal = new BehaviorSubject<CheckoutData | null>(null);
  orderTotalObs = this.orderTotal.asObservable();

  wishlistpopStatus(status: boolean) {
    if (status == true) {
      // TODO:Ayham what is this ?
      // $('#myModalFooter1').show();
    }

    this.wishlistpopBehaviour.next(status);
  }
  wishlistpopproductStatus(status: number) {
    this.wishlistpopproductBehaviour.next(status);
  }
  updateCartCount(count: number) {
    this.currentCartCount.next(count);
  }
  updateItemCount(count: number) {
    this.item_count.next(count);
  }

  updateCartItem(CartItem: any) {
    this.cardItemsOrder.next(CartItem);
  }
  updatecurrentEditUrls(url: any) {
    this.currentEditUrls.next(url);
  }
  updateFilterMaxPrice(count: number) {
    this.filterMaxPrice.next(count);
  }
  updateFilterMinPrice(count: number) {
    this.filterMinPrice.next(count);
  }

  updatedProductList(products: any) {
    this.updatedProductBehaviour.next(products);
  }
  updatedProductSearchList(products: any) {
    this.updatedProductSearchBehaviour.next(products);
  }
  updatedDesignerProductList(products: any) {
    this.updatedDesignerProductBehaviour.next(products);
  }

  updatedNewarrivalProductList(products: any) {
    this.updatedNewarrivalProductBehaviour.next(products);
  }

  updatedWishlistProductList(products: any) {
    this.updatedWishlistProductBehaviour.next(products);
  }

  updatedFilterList(filterlistconfig: any) {
    this.updatedFilterListBehaviour.next(filterlistconfig);
  }

  updatedCardList(cartlistconfig: any) {
    this.updatedCartListBehaviour.next(cartlistconfig);
  }
  updateUserData(user: any) {
    this.updatedUserBehaviour.next(user);
  }
  updatedSortOrder(sort_order: any) {
    this.updatedSortOrderBehaviour.next(sort_order);
  }
  updatedSortOrderCount(count: any) {
    this.updatedSortOrderCountBehaviour.next(count);
  }

  updatedAppliedCouponCOde(couponcode: CouponCode) {
    this.currentAppliedCoupon.next(couponcode);
  }

  updatedOrderTotal(CheckoutData: CheckoutData) {
    this.orderTotal.next(CheckoutData);
  }
}
