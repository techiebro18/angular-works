import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.scss'],
})
export class WishlistButtonComponent implements OnInit {
  public isInWishList;
  @Input() product;
  @Input() compact = false;
  @Input() page = '';
  @Input() showAsLink = false;
  @Input() invertHeart = false;
  @Output() callbackEvent = new EventEmitter<string>();
  public user$: BehaviorSubject<UserData | null>;
  public user_id: any = null;
  public applyWishlistData = {
    status: false,
    productID: '',
    hit: '',
  };
  loggedInStatus: any;

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
    this.loggedInStatus = this.authService.loggedIn;
    this.isInWishList = false;

    if (this.loggedInStatus) {
      this.getUserWishlist();
    }
  }

  callParent() {
    this.callbackEvent.emit('method');
  }

  openPopup(isSignIn: boolean) {
    const { id, imgix_image_url } = this.product;

    this.applyWishlistData.productID = id;
    this.applyWishlistData.status = true;
    this.applyWishlistData.hit = this.product;
    this._productService.applyWishlist(this.applyWishlistData);
    this.dialogService
      .open(LoginRegisterDialogComponent, {
        isDefaultDialog: true,
        isWishlist: true,
        isSignIn,
        prdImg: imgix_image_url,
        location:
          this.page == 'PDP'
            ? 'Product Detail Page - Add To Wishlist'
            : 'Other - Add To Wishlist',
      })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        this.segmentService.addToWishlistButtonClick();

        if (wasClosedByTheUser) return;

        this.getUserWishlist();
      });
  }

  toggleWishList() {
    if (!this.isInWishList) {
      this.addToWishList();
      this.segmentService.addToWishlistButtonClick();

      return;
    }

    this.removeWishList();
  }

  addToWishList() {
    this.SpinnerService.show();

    const formData = new FormData();

    formData.append('productId', this.product.id);
    this._productService.addWishlist(formData).subscribe(
      data => {
        this.SpinnerService.hide();

        if (data.status == 'success') {
          this.isInWishList = true;
          const product = Object.create(this.product);

          product.regular_price_EUR = this.product.regular_prices
            ? this.product.regular_prices.find(obj => obj.currency === 'EUR').value || ''
            : this.product.regular_price
              ? this.product.regular_price.find(obj => obj.currency === 'EUR').value || ''
              : '';
          this.segmentService.AddedToWishlist(this.user$.getValue()?.id, data.wishlist_id, product);
          this.callParent();
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }

  removeWishList() {
    this.SpinnerService.show();
    this._productService.removeWishList(this.product.id).subscribe(
      data => {
        this.SpinnerService.hide();

        if (data.status == 'success') {
          this.isInWishList = false;
          this.callParent();
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }

  getUserWishlist() {
    this._productService.getWishlist().subscribe(data => {
      if (data !== undefined && data !== null) {
        const isExistProduct = data.list.find(obj => obj.product_id === this.product.id);

        if (isExistProduct) {
          this.isInWishList = true;
        }
        else this.isInWishList = false;
      }
    });
  }
}
