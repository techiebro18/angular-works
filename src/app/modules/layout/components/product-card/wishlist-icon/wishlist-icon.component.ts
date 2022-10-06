import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { AppService } from '@services/app/app.service';
import { LoginRegisterDialogComponent } from '../../dialogs/login-register-dialog/login-register-dialog.component';
import { DialogService } from '@services/app/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SegmentService } from '@services/segment.service';
import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';

@Component({
  selector: 'app-wishlist-icon',
  templateUrl: './wishlist-icon.component.html',
  styleUrls: ['./wishlist-icon.component.scss'],
})
export class WishlistIconComponent implements OnInit {
  public user$: BehaviorSubject<UserData | null>;
  user_id: any = null;
  @Input() prdImg;
  @Input() productId: any;
  @Input() hit: any;
  loggedInStatus: any;
  currentAppConfiguaration: any;
  addWishIcon = true;
  total_wishlisted: number;
  applyWishlistData = { status: false, productID: '', hit: '' };

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private dialogService: DialogService,
    public productService: ProductService,
    public appService: AppService,
    private SpinnerService: NgxSpinnerService,
    private segmentService: SegmentService
  ) {
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.total_wishlisted = this.hit.total_wishlisted;
    this.loggedInStatus = this.authService.isLoggedInObs;
    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();
    this.productService.getUserWishlistRecordsObservable.subscribe((data: any | ProductSearchResponseModel[]) => {
      if (data) {
        const isExistProduct = data.list
          ? data.list.some(_ => _.product_id === this.productId) // in case of Algolia search result
          : data.some(_ => _.id === this.productId); // in case of ProductSearchResponseModel type

        if (isExistProduct) {
          this.addWishIcon = false;
        }
      }
    });
    this.productService.setWishlistProductIDObservable.subscribe(data => {
      if (data !== undefined && data !== null) {
        if (data == this.hit.id) {
          this.addWishIcon = false;
          this.total_wishlisted = this.total_wishlisted + 1;
        }
      }
    });
  }

  openPopup(isSignIn: boolean, productId: any) {
    this.applyWishlistData.productID = productId;
    this.applyWishlistData.status = true;
    this.applyWishlistData.hit = this.hit;
    this.productService.applyWishlist(this.applyWishlistData);
    this.dialogService
      .open(LoginRegisterDialogComponent, {
        isDefaultDialog: true,
        isSignIn,
        isWishlist: true,
        prdImg: this.prdImg,
        location: 'Product List - Add To Wishlist',
      })
      .afterClosed()
      .subscribe(() => {});
  }

  addToWishList(productId: any) {
    this.SpinnerService.show();
    const formData = new FormData();

    formData.append('productId', productId);
    this.productService.addWishlist(formData).subscribe(
      data => {
        this.SpinnerService.hide();

        if (data.status == 'success') {
          this.total_wishlisted = this.total_wishlisted + 1;
          this.addWishIcon = false;
          this.segmentService.AddedToWishlist(this.user$.getValue()?.id, data.wishlist_id, this.hit);
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }

  removeWishList(productId: any) {
    this.SpinnerService.show();
    this.productService.removeWishList(productId).subscribe(
      data => {
        this.SpinnerService.hide();

        if (data.status == 'success') {
          this.addWishIcon = true;
          this.total_wishlisted = this.total_wishlisted - 1;
          this.productService.setUpdateWishlist(true);
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }
}
