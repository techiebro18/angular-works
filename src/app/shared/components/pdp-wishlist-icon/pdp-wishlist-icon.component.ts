import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SegmentService } from '@services/segment.service';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-pdp-wishlist-icon',
  templateUrl: './pdp-wishlist-icon.component.html',
  styleUrls: ['./pdp-wishlist-icon.component.scss'],
})
export class PDPWishlistIconComponent implements OnInit {
  private _isInWishlist;
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
    public _productService: ProductService,
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
    this._productService.getUserWishlistRecordsObservable.subscribe(data => {
      if (data !== undefined && data !== null) {
        const checkProductId = obj => obj.product_id === this.productId;
        const isExistProduct = data.list.some(checkProductId);

        if (isExistProduct) {
          this.addWishIcon = false;
        }
      }
    });
    this._productService.setWishlistProductIDObservable.subscribe(data => {
      if (data !== undefined && data !== null) {
        if (data == this.hit.id) {
          this.total_wishlisted = this.total_wishlisted + 1;
        }
      }
    });
  }

  @Input() set isInWishlist(value) {
    this._isInWishlist = value;
  }

  get isInWishlist() {
    return this._isInWishlist;
  }

  openPopup(isSignIn: boolean, productId: any) {
    this.applyWishlistData.productID = productId;
    this.applyWishlistData.status = true;
    this.applyWishlistData.hit = this.hit;
    this._productService.applyWishlist(this.applyWishlistData);
    this.dialogService
      .open(LoginRegisterDialogComponent, {
        isDefaultDialog: true,
        isSignIn,
        isWishlist: true,
        prdImg: this.prdImg,
      })
      .afterClosed()
      .subscribe(() => {});
  }

  addToWishList(productId: any) {
    this.SpinnerService.show();

    const formData = new FormData();

    formData.append('productId', productId);

    this._productService.addWishlist(formData).subscribe(
      data => {
        this.SpinnerService.hide();

        if (data.status == 'success') {
          this.total_wishlisted = this.total_wishlisted + 1;
          this.addWishIcon = false;
          this.segmentService.AddedToWishlist(
            this.user$.getValue()?.id,
            data.wishlist_id,
            this.hit
          );
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }

  removeWishList(productId: any) {
    this.SpinnerService.show();
    this._productService.removeWishList(productId).subscribe(
      data => {
        this.SpinnerService.hide();

        if (data.status == 'success') {
          this.addWishIcon = true;
          this.total_wishlisted = this.total_wishlisted - 1;
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }
}
