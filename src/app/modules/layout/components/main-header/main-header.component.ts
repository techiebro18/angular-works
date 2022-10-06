import { Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Item } from '@schemas/product.entity';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { AuthService } from '@services/auth.service';
import { SharedService } from '@services/common/shared.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { BehaviorSubject } from 'rxjs';
import { LoginRegisterDialogComponent } from '../dialogs/login-register-dialog/login-register-dialog.component';
import { LocalStorageService } from '@services/local-storage.service';
import { SegmentService } from '@services/segment.service';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { AccountBoxComponent } from '../account-box/account-box.component';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  public user$: BehaviorSubject<UserData | null>;
  @Output() activeAppMainHeader = new EventEmitter<any>();
  @ViewChild('accountBox', { static: false }) private AccountBox?: AccountBoxComponent;

  cartItemCount = 0;
  editUrl: string | null = null;
  // TODO: baseUrl usage to be changed
  baseUrl = environment.baseUrl;
  baseRemoteUrl = '';
  // TODO: paths bellow to be changed in a better usage
  wishListSeo = '';
  accountSeo = '';
  viewCartSeo = '';
  checkoutSeo = '';
  sellerItemSeo = '';
  userId: number;
  item_count = 0;
  flashBannerKey = 'flash-sale-banner';
  languageCode = 'en';
  isAccountBoxOpen = false;
  public flashBannerEnabled = false;
  public flashBanner: any;

  constructor(
    private _appService: AppService,
    public authService: AuthService,
    private userService: UserService,
    private _sharedService: SharedService,
    private dialogService: DialogService,
    private universalService: UniversalService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public segmentService: SegmentService,
    private cookieService: CookieService,
    private renderer: Renderer2
  ) {
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    // default links
    this.wishListSeo = 'wishlist';
    this.accountSeo = 'account';
    this.viewCartSeo = 'cart/view-cart';
    this.checkoutSeo = 'checkout';
    this.sellerItemSeo = 'account';
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.flashSaleBanner();

    if (this.universalService.isBrowser) {
      const currentSubDomain = this._appService.getCurrentSubDomain(null);

      this.languageCode = currentSubDomain != '' ? currentSubDomain : 'en';
      this.applyRouting(currentSubDomain);

      // this.href = window.location.pathname;
      // ToDo: to be refactor
      this._sharedService.currentMessage.subscribe(msg => (this.cartItemCount = msg));
      this._sharedService.item_count_message.subscribe(msg => (this.item_count = msg));
      this._sharedService.currentEditUrlObs.subscribe(msg => (this.editUrl = msg));
      const productConfig = {} as Item;

      productConfig.currency_id = this.localStorageService.getItem('config')
        ? JSON.parse(this.localStorageService.getItem('config') as string).currencyID
        : 11;
      productConfig.language_id = this.localStorageService.getItem('config')
        ? JSON.parse(this.localStorageService.getItem('config') as string).languageID
        : 1;

      if (this.user$.getValue() != null && this.authService.loggedIn) {
        const userId = this.user$.getValue()?.id;

        this.userId = userId;
      }
      else {
      }

      const cartItemCount
        = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT) != ''
          ? parseInt(this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT))
          : 0;

      this.cartItemCount = cartItemCount;

      const cart = JSON.parse(this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.CART));

      this.item_count = cart != null ? cart.item_count : 0;
    }
  }

  flashSaleBanner(): void {
    this._appService.getAppSetting(this.flashBannerKey).subscribe(
      (data: any) => {
        if (data.message === 'success') {
          this.flashBannerEnabled = data.model.status == 'active' ? true : false;
          this.flashBanner = data.model.value != '' ? JSON.parse(data.model.value) : '';

          if (this.flashBannerEnabled && this.flashBanner && this.flashBanner['text_' + this.languageCode].length)
            this._appService.setFlashBannerStatus(true);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  applyRouting(currentSubDomain) {
    switch (currentSubDomain) {
      case 'uk':
      case '':
      default:
        this.accountSeo = 'account';
        this.checkoutSeo = 'checkout';
        this.sellerItemSeo = 'account';
        this.wishListSeo = `${this.accountSeo}/wishlist`;
        break;
      case 'de':
        this.accountSeo = 'konto';
        this.checkoutSeo = 'checkout';
        this.sellerItemSeo = 'konto';
        this.wishListSeo = `${this.accountSeo}/wunschzettel`;
        break;
      case 'dk':
        this.accountSeo = 'konto';
        this.checkoutSeo = 'checkout';
        this.sellerItemSeo = 'konto';
        this.wishListSeo = `${this.accountSeo}/favoritter`;
        break;
      case 'se':
        this.accountSeo = 'konto';
        this.checkoutSeo = 'kolla-upp';
        this.sellerItemSeo = 'konto';
        this.wishListSeo = `${this.accountSeo}/önskelista`;
        break;
      case 'es':
        this.accountSeo = 'cuenta';
        this.checkoutSeo = 'checkout';
        this.sellerItemSeo = 'cuenta';
        this.wishListSeo = `${this.accountSeo}/lista-de-deseos`;
        break;
      case 'fr':
        this.accountSeo = 'compte';
        this.checkoutSeo = 'paiement';
        this.sellerItemSeo = 'compte';
        this.wishListSeo = `${this.accountSeo}/wishlist`;
        break;
      case 'it':
        this.accountSeo = 'account';
        this.checkoutSeo = 'checkout';
        this.sellerItemSeo = 'account';
        this.wishListSeo = `${this.accountSeo}/lista-desideri`;
        break;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const routeConfig
        = this.route.snapshot.firstChild === null ? null : this.route.snapshot.firstChild.routeConfig.path;

      this.addAppMainHeader(routeConfig);
    });
  }

  addAppMainHeader(value: any) {
    this.activeAppMainHeader.emit(value);
  }

  openPopup(isSignIn: boolean) {
    this.dialogService
      .open(LoginRegisterDialogComponent, { isDefaultDialog: true, isSignIn, location: 'Menu Bar' })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        if (wasClosedByTheUser) return;
      });
  }

  openUserAccountBox() {
    if (!this.isAccountBoxOpen) {
      this.isAccountBoxOpen = true;
      this.AccountBox?.toogleAccountBox(true);
      setTimeout(() => {
        this.renderer.removeClass(document.getElementById('account_details_link'), 'ignore-click-outside');
      }, 10);
    }
    else this.closeUserAccountBox();
  }

  closeUserAccountBox() {
    this.isAccountBoxOpen = false;
    this.AccountBox?.toogleAccountBox(false);
    this.renderer.addClass(document.getElementById('account_details_link'), 'ignore-click-outside');
  }

  countObjectKeys(obj) {
    return Object.keys(obj).length;
  }
}
