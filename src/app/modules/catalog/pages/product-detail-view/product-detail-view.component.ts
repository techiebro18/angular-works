import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { AppConfiguration, AppResponse } from '@schemas/app.interface';
import { UserData } from '@schemas/user.interface';
import { OfferService } from '@services/account/offer.service';
import { PriceDropService } from '@services/account/price-drop.service';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { LoaderService } from '@services/app/loader.service';
import { MetaService } from '@services/app/meta.service';
import { AuthService } from '@services/auth.service';
import { CartService } from '@services/cart/cart.service';
import CartPlusMinusRequestFiltered from '@services/cart/models/cart-plus-minus-request-filtered';
import GetShoppingCartRequestFiltered from '@services/cart/models/get-shopping-cart-request-filtered';
import { SharedService } from '@services/common/shared.service';
import { LocalStorageService } from '@services/local-storage.service';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';
import { MessageDialogComponent } from 'src/app/modules/layout/components/dialogs/message-dialog/message-dialog.component';
import { addToCart } from 'src/app/state/actions/cart.actions';
import { AuthenticityDialogComponent } from '../../components/dialogs/authenticity-popup-dialog/authenticity-popup-dialog.component';
import { PlpCurrencyData, PlpRouteParams } from '../listing-view/plp-definitions';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss'],
})
export class ProductDetailViewComponent implements OnInit {
  public device_id: string = null;
  public trashModel = false;

  @Input() public routeParam: PlpRouteParams;
  @Input() public currencyConfig: PlpCurrencyData;
  @Input() public productId: number;
  @Input() public position: number;

  loggedInStatus: any;
  public currentLanguage;
  public productData: any = null;
  dialogRef: MatDialogRef<any>;
  public similarProducts: any = null;
  public sameBrandProducts: any = null;
  public images = null;
  public isInWishlist;
  public language = 'en';
  public currency = 'USD';
  public currencyCode = 'USD';
  public breadcrumbParentCat: string;
  public breadcrumbParentCatLink: string;
  public breadcrumbChildCat: string;
  public breadcrumbChildCatLink: string;
  public breadcrumbProductName: string;
  public offerSetting: any;
  public makeOfferEnabled = false;
  public sellerId: number;
  public sellerOfferEnabled = false;
  public user$: BehaviorSubject<UserData | null>;
  viewCartSeo = '';
  baseRemoteUrl = '';
  offerSettingKey = 'make-an-offer';
  followedPriceDrop = false;
  customOptions: OwlOptions = {
    loop: false,
    rewind: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    autoWidth: false,
    navText: [
      '<img src="assets/images/gallery/chevron_back_rgb_black.svg">',
      '<img src="assets/images/gallery/chevron_forward_rgb_black.svg">',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  public appConfig: any;
  public currencySelectionData = [
    { id: 1, name: 'USD' },
    { id: 11, name: 'EUR' },
    { id: 19, name: 'GBP' },
    { id: 32, name: 'DKK' },
    { id: 112, name: 'SEK' },
  ];

  constructor(
    private productService: ProductService,
    private appService: AppService,
    private dialogModalService: DialogService,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private universalService: UniversalService,
    private cookieService: CookieService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private segmentService: SegmentService,
    private store: Store<any>,
    private metaService: MetaService,
    private offerService: OfferService,
    private renderer: Renderer2,
    private priceDropService: PriceDropService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private userService: UserService
  ) {
    this.metaService.setPageNoIndex();
    this.loaderService.triggerLoading.emit(true);
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.applySetup();
    this.getProductDetail();
    this.getUserWishlist();
  }

  reloadProduct() {
    this.getProductDetail();
  }

  applySetup(): void {
    this.renderer.addClass(document.body, 'noHorizontalScroll');
    this.viewCartSeo = '/cart/view-cart';
    this.baseRemoteUrl = this.universalService.getApplicationUrl();

    if (this.universalService.isBrowser) {
      const currentSubDomain = this.appService.getCurrentSubDomain(null);
    }

    this.appConfig = this.appService.getAppConfigurationValue();

    if (this.appConfig && this.appConfig.currencyCode) {
      this.currency = this.appConfig.currencyCode;
    }

    if (this.appConfig && this.appConfig.languageShortName) {
      this.language = this.appConfig.languageShortName;
    }

    this.currentLanguage = this.getCurrentPLPLanguageSuffix();
    this.setCurrencyRules();
  }

  setCurrencyRules() {
    this.route.queryParams.subscribe(params => {
      const keepCurrency = params['keepCurrency'];

      const selectedCurrency = this.currencySelectionData.find(x => x.name == keepCurrency)?.id;

      if (selectedCurrency) {
        this.savePreferences(selectedCurrency);
      }
    });
  }

  savePreferences(selectedCurrency: number) {
    const oldAppConfig: AppConfiguration = this.appService.getAppConfigurationValue();
    const appConfig = {
      ...oldAppConfig,
      currencyID: selectedCurrency || 11,
      currencyCode: this.appService.currencies.find(x => x.id === selectedCurrency)?.name || 'EUR',
      currencySymbol: this.appService.currencies.find(x => x.id === selectedCurrency)?.symbol || '€',
    } as AppConfiguration;

    this.appService.setAppConfiguration(appConfig);
  }

  checkOfferEnabled(): void {
    this.appService.getAppSetting(this.offerSettingKey).subscribe(
      (data: any) => {
        if (data.message === 'success') {
          this.offerSetting = data.model;
          this.makeOfferEnabled = data.model.status == 'active' && data.model.value > 0 ? true : false;
        }
      },
      error => {
        console.log(error);
      }
    );
    this.offerService.isUserOpenToOffers(this.sellerId).subscribe(
      (data: any) => {
        if (data.data === true) {
          this.sellerOfferEnabled = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getProductDetail(): void {
    this.productService
      .getProductDetail(this.productId, this.currentLanguage, this.currencyConfig.plpCurrency?.toLowerCase())
      .subscribe(
        data => {
          this.productData = data;
          this.productData.is_out_of_stock = data.stock > 0 ? false : true;
          this.sellerId = this.productData.commission_user_id;
          this.segmentService.ProductViewed(this.productData, this.language, this.currencyConfig.plpCurrency);
          this.setImages(this.productData.media_entities);
          this.loaderService.triggerLoading.emit(false);
          this.breadcrumbParentCatLink
            = this.productData.parentCategories.find(obj => obj.lang === this.getCurrentPLPLanguageSuffix())?.value || '';
          this.breadcrumbParentCat = this.breadcrumbParentCatLink.replace(/-/g, ' ');
          this.breadcrumbChildCatLink
            = this.productData?.categories.find(obj => obj?.lang === this.getCurrentPLPLanguageSuffix())?.value || '';
          this.breadcrumbChildCat = this.breadcrumbChildCatLink.replace(/-/g, ' ');
          this.breadcrumbProductName = this.productData.motherpage_seo_url.replace(/-/g, ' ');
          this.metaService.getPDPMeta(
            this.breadcrumbProductName,
            this.productData.motherpage_seo_url + '?pdp=' + this.productData.id
          );
          this.checkOfferEnabled();
          this.checkPriceDrop();
          this.getSimilarProducts();
          this.getSameBrandProducts();
        },
        error => {
          if (error === 'Not found') {
            this.router.navigate([`/${this.routeParam.styles_seo_url}`]);
          }

          console.log('Error in getting the product details', error);
        }
      );
  }

  getSimilarProducts(): void {
    this.productService.getSimilarProducts(this.productId, this.routeParam.styles_seo_url).subscribe(
      data => {
        if (data.list) {
          this.similarProducts = data.list;
          this.similarProducts.data = this.similarProducts.data.filter(({ id }) => this.productId !== id);
        }
      },
      error => {}
    );
  }

  getSameBrandProducts(): void {
    this.productService.getSameBrandProducts(this.productId, this.routeParam.styles_seo_url).subscribe(
      data => {
        if (data.list) {
          this.sameBrandProducts = data.list;
          this.sameBrandProducts.data = this.sameBrandProducts.data.filter(({ id }) => this.productId !== id);
        }
      },
      error => {}
    );
  }

  //TODO: check what catalog service expects as language
  public getCurrentPLPLanguageSuffix() {
    // Language should be taken from domain
    let languageSuffix = '';
    const subdomain = this.appService.getCurrentSubDomain(null);

    // Algolia uses en for English-us and Englisg-uk
    languageSuffix = subdomain == '' || subdomain == 'uk' ? 'en' : subdomain;

    // Algolia has swedish language as 'sv' instead of 'se' !!
    // Algolia has Danish language as 'da' instead of 'dk' !!
    if (languageSuffix == 'se') {
      languageSuffix = 'sv';
    }
    else if (languageSuffix == 'dk') {
      languageSuffix = 'da';
    }

    return languageSuffix;
  }

  openAuthenticityDialog() {
    this.dialogRef
      = this.dialogModalService.openAuthenticityPopup<AuthenticityDialogComponent>(AuthenticityDialogComponent);
  }

  setImages(images) {
    images.sort(function (a, b) {
      return parseFloat(a.display_order) - parseFloat(b.display_order);
    });
    this.images = images
      .filter(obj => !!obj.xlarge_url)
      .map(({ xlarge_url, medium_url }) => ({
        img: xlarge_url,
        thumbnail: medium_url,
      }));
  }

  addToCartV2(productId) {
    this.device_id = this.cookieService.get(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID);

    if (this.device_id == null || this.device_id.trim() == '') {
      this.cartService.getDeviceId().subscribe(device_id => {
        this.device_id = device_id;

        if (this.device_id != null) {
          this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.DEVICE_ID, this.device_id, {
            path: '/',
            domain: environment.cookieDomain,
          });

          this.getCart(this.device_id, productId);
        }
      });
    }
    else {
      this.getCart(this.device_id, productId);
    }
    //
  }
  //////////
  getCart(device_id: string, productId) {
    const access_token = this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    const cartRequest: GetShoppingCartRequestFiltered = {
      device_id: device_id,
      language: this.language,
      currency: this.currency,
    };

    this.cartService.getCart(cartRequest, access_token).subscribe(
      response => {
        //Next callback
        const cartPlusMinusRequest: CartPlusMinusRequestFiltered = {
          device_id: device_id,
          cart_id: response.cart.id,
          product_id: productId,
          position: this.position,
          language: this.language,
          currency: this.currency,
        };

        this.cartPlus(cartPlusMinusRequest);
      },
      error => {
        //Error callback
        console.error('Inside GET CART error caught in component', error);
      }
    );
  } //
  cartPlus(cartPlusMinusRequest: CartPlusMinusRequestFiltered) {
    const access_token = this.localStorageService.getItem(APP_CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);

    this.cartService.cartPlus(cartPlusMinusRequest, access_token).subscribe(
      response => {
        //Next callback
        const cart = response.cart;
        const products = response.products;

        this.store.dispatch(
          addToCart({
            products: response.products,
            selectedCurrency: this.currencyConfig.plpCurrency,
          })
        );

        this.cookieService.set(APP_CONSTANTS.COOKIE_KEYS.CART_COUNT, products.length + '', {
          path: '/',
          domain: environment.cookieDomain,
        });

        this.sharedService.updateItemCount(products.length);
        this.sharedService.updateCartCount(products.length);
        this.trashModel = true;
        this.loaderService.triggerLoading.emit(false);
      },
      error => {
        //Error callback
        console.error('Inside cartPlus error caught in component', error);
      }
    );
  }

  getUserWishlist() {
    this.loggedInStatus = this.authService.loggedIn;

    if (this.loggedInStatus) {
      const observable = this.productService.getWishlist().subscribe(result => {
        observable.unsubscribe();

        if (!result.list || !result.list.length) return;

        this.isInWishlist = result.list.some(({ product_id }) => +this.productId === +product_id);
      });
    }
  }

  addToCartClick(productId) {
    if (this.isNegativePrice()) {
      this.dialogService.open(MessageDialogComponent, { message: 'This product is unavailable' });
    }
    else {
      this.loaderService.triggerLoading.emit(true);
      this.segmentService.ProductAdded(this.productData, this.currentLanguage, this.currency);
      this.addToCartV2(productId);
    }
  }

  isNegativePrice(): boolean {
    if (this.productData.is_discount === 1 && this.productData.discounted_price < 0) return true;
    else if (this.productData.is_discount === 0 && this.productData.price < 0) return true;

    return false;
  }

  closePopup() {
    this.trashModel = false;
  }

  viewShoppingBag() {
    this.router.navigate(['/cart/view-cart']);
  }

  ClickedOut(event) {
    if (event.target.className === 'modal product-shopping-popup') {
      this.trashModel = false;
    }
  }

  checkPriceDrop() {
    if (this.authService.loggedIn) {
      this.priceDropService.checkProductPriceDrop(this.productId).subscribe(response => {
        if (response?.status && response?.message === 'Price reduction subcscription found')
          this.followedPriceDrop = true;
        else this.followedPriceDrop = false;
      });
    }
  }

  openPopup(isSignIn: boolean) {
    const { imgix_image_url } = this.productData;

    this.dialogService
      .open(LoginRegisterDialogComponent, {
        isDefaultDialog: true,
        isSignIn,
        prdImg: imgix_image_url,
        location: 'Product Detail Page - Follow Price Drop',
      })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        if (wasClosedByTheUser) return;

        this.followPriceDrop();
      });
  }

  followPriceDrop() {
    if (this.authService.loggedIn) {
      this.priceDropService.subscribeProductPriceDrop({ product_id: this.productData.id }).subscribe(response => {
        if (response.status) {
          this.followedPriceDrop = true;
          this.segmentTrackPriceDrop(
            'Product Price Reduction Followed',
            'Product Detail Page - Follow Price Reduction'
          );
        }
      });
    }
    else {
      this.openPopup(true);
    }
  }

  unfollowPriceDrop() {
    this.priceDropService.unsubscribeProductPriceDrop(this.productData.id).subscribe(response => {
      if (response.status) {
        this.followedPriceDrop = false;
        this.segmentTrackPriceDrop(
          'Product Price Reduction Unfollowed',
          'Product Detail Page - Follow Price Reduction'
        );
      }
    });
  }

  segmentTrackPriceDrop(event: string, location: string) {
    this.segmentService.priceDrop(event, this.productData, this.router.url, location);
  }

  ngOnDestroy(): void {
    this.metaService.setPageIndex();
  }
}
