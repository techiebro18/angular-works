import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { AuthService } from '@services/auth.service';
import { MenuService } from '@services/common/menu.service';
import { UniversalService } from '@services/universal.service';
import { UserService } from '@services/user.service';
import { BehaviorSubject } from 'rxjs';
import { FilterService } from '@services/common/filter.service';
import { DialogService } from '@services/app/dialog.service';
import { LoginRegisterDialogComponent } from '../../dialogs/login-register-dialog/login-register-dialog.component';
import algoliasearch from 'algoliasearch/lite';
import { SegmentService } from '@services/segment.service';
import { SearchBoxComponent } from '../../custom-instant-search/app-search-box/app-search-box.component';
import '@shared/utils/string.extensions';
import { Menu } from '@schemas/app.interface';
import { ScreenDetectorService } from '@services/app/screen-detector.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  baseUrl = environment.baseUrl;
  baseRemoteUrl = '';
  wishListSeo: any;
  accountSeo: any;
  viewCartSeo: any;
  bagCatImageSeo: any;
  accCatImageSeo: any;
  accCatImageSeoSec: any;
  clothingCatImageSeo: any;
  clothingCatImageSeoSec: any;
  jewelCatImageSeoFirst: any;
  jewelCatImageSeoSec: any;
  shoeCatImageSeo: any;
  checkoutSeo: any;
  menuItems: Array<any> = undefined;
  isMenuOpen = false;
  menuArchive: Array<Menu> = [];
  public env = environment;
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() cartItemCount: any;

  @ViewChild('searchBarSlider', { static: false }) private SearchBox?: SearchBoxComponent;
  @ViewChild('searchButtonText', { static: false }) private searchButtonText: ElementRef;

  public user$: BehaviorSubject<UserData | null>;
  public instantsearchConfig = {
    indexName: environment.INSTANT_SEARCH_INDEX_NAME_DESIGNER,
    searchClient: algoliasearch(environment.INSTANT_SEARCH_APP_ID, environment.INSTANT_SEARCH_SEARCH_API_KEY),
    hitsPerPage: 8,
  };

  constructor(
    public menuService: MenuService,
    private _router: Router,
    public authService: AuthService,
    private _appService: AppService,
    private userService: UserService,
    private universalService: UniversalService,
    private dialogService: DialogService,
    public _FilterService: FilterService,
    private segmentService: SegmentService,
    private renderer2: Renderer2,
    private screenSizeDetector: ScreenDetectorService
  ) {
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    // default values
    this.accountSeo = 'account';
    this.wishListSeo = 'wishlist';
    this.viewCartSeo = 'cart/view-cart';
    this.bagCatImageSeo = 'fendi-baguette';
    this.accCatImageSeo = 'accessories/wallets';
    this.accCatImageSeoSec = 'accessories/sunglasses';
    this.clothingCatImageSeo = 'clothing/tops';
    this.clothingCatImageSeoSec = 'clothing/outerwear';
    this.shoeCatImageSeo = 'shoes/sandals';
    this.jewelCatImageSeoFirst = 'jewelry/necklaces';
    this.jewelCatImageSeoSec = 'jewelry/earrings';
    this.checkoutSeo = 'checkout';
    this.baseRemoteUrl = this.universalService.getApplicationUrl();

    const currentSubDomain = this._appService.getCurrentSubDomain(null);

    this.applyRouting(currentSubDomain);

    this.menuService.menuList$.subscribe(value => {
      this.menuItems = value.map(menuItem => ({
        ...menuItem,
        name: menuItem.name.toLowerCase(),
      }));
    });
    this.getArchiveMenuSection();
    this.isMobile$ = this.screenSizeDetector.isMobile;
  }

  applyRouting(currentSubDomain): void {
    switch (currentSubDomain) {
    case 'uk':
    case '':
    default:
      this.accountSeo = 'account';
      this.checkoutSeo = 'checkout';
      this.wishListSeo = `${this.accountSeo}/wishlist`;
      this.bagCatImageSeo = 'fendi-baguette';
      this.accCatImageSeo = 'accessories/wallets';
      this.accCatImageSeoSec = 'accessories/sunglasses';
      this.shoeCatImageSeo = 'shoes/sandals';
      this.clothingCatImageSeo = 'clothing/tops';
      this.clothingCatImageSeoSec = 'clothing/outerwear';
      this.jewelCatImageSeoFirst = 'jewelry/necklaces';
      this.jewelCatImageSeoSec = 'jewelry/earrings';
      break;
    case 'de':
      this.accountSeo = 'konto';
      this.checkoutSeo = 'checkout';
      this.wishListSeo = `${this.accountSeo}/wunschzettel`;
      this.bagCatImageSeo = 'fendi-baguette';
      this.accCatImageSeo = 'zubehr/portemonnaies';
      this.accCatImageSeoSec = 'zubehr/sonnenbrillen';
      this.shoeCatImageSeo = 'schuhe/sandals';
      this.clothingCatImageSeo = 'kleidung/tops';
      this.clothingCatImageSeoSec = 'kleidung/outerwear';
      this.jewelCatImageSeoFirst = 'der-schmuck/halsketten';
      this.jewelCatImageSeoSec = 'der-schmuck/ohrringe';
      break;
    case 'dk':
      this.accountSeo = 'konto';
      this.checkoutSeo = 'checkout';
      this.wishListSeo = `${this.accountSeo}/favoritter`;
      this.bagCatImageSeo = 'fendi-baguette';
      this.accCatImageSeo = 'tilbehr/punge';
      this.accCatImageSeoSec = 'tilbehr/solbriller';
      this.shoeCatImageSeo = 'sko/sandaler';
      this.clothingCatImageSeo = 'tj/toppe';
      this.clothingCatImageSeoSec = 'tj/overtj';
      this.jewelCatImageSeoFirst = 'smykker/halskaeder';
      this.jewelCatImageSeoSec = 'smykker/reringe';
      break;
    case 'se':
      this.accountSeo = 'konto';
      this.checkoutSeo = 'kolla-upp';
      this.wishListSeo = `${this.accountSeo}/önskelista`;
      this.bagCatImageSeo = 'fendi-baguette';
      this.accCatImageSeo = 'accessoarer/plnbcker';
      this.accCatImageSeoSec = 'accessoarer/solglasgon';
      this.shoeCatImageSeo = 'skor/sandaler';
      this.clothingCatImageSeo = 'klder/toppar';
      this.clothingCatImageSeoSec = 'klder/ytterklder';
      this.jewelCatImageSeoFirst = 'smycken/halsband';
      this.jewelCatImageSeoSec = 'smycken/rhngen';
      break;
    case 'es':
      this.accountSeo = 'cuenta';
      this.checkoutSeo = 'checkout';
      this.wishListSeo = `${this.accountSeo}/lista-de-deseos`;
      this.accCatImageSeo = 'accesorios/pequea-marroquinera';
      this.accCatImageSeoSec = 'accesorios/gafas-de-sol';
      this.shoeCatImageSeo = 'zapatos/sandalias';
      this.clothingCatImageSeo = 'ropa/tops';
      this.clothingCatImageSeoSec = 'ropa/ropa-exterior';
      this.jewelCatImageSeoFirst = 'joyas/collares';
      this.jewelCatImageSeoSec = 'joyas/pendientes';
      break;
    case 'fr':
      this.accountSeo = 'compte';
      this.checkoutSeo = 'paiement';
      this.wishListSeo = `${this.accountSeo}/wishlist`;
      this.accCatImageSeo = 'accessoires/petite-maroquinerie';
      this.accCatImageSeoSec = 'accessoires/lunettes-de-soleil';
      this.shoeCatImageSeo = 'chaussures/sandales';
      this.clothingCatImageSeo = 'vtements/tops';
      this.clothingCatImageSeoSec = 'vtements/vtements-d-extrieur';
      this.jewelCatImageSeoFirst = 'bijoux/colliers';
      this.jewelCatImageSeoSec = 'bijoux/boucles-d-oreilles';
      break;
    case 'it':
      this.accountSeo = 'account';
      this.checkoutSeo = 'checkout';
      this.wishListSeo = `${this.accountSeo}/lista-desideri`;
      break;
    }
  }

  openPopup(isSignIn: boolean): void {
    const href = this._router.url;

    if (href === '/checkout' || href === '/' + this.checkoutSeo || href === '/login' || href === '/login-signup') {
      this._router.navigateByUrl('login');
    }
    else {
      this._FilterService.applyCreateAlert(true);
      this.dialogService
        .open(LoginRegisterDialogComponent, { isDefaultDialog: true, isSignIn })
        .afterClosed()
        .subscribe(() => {});
    }
  }

  showSearchBarSlider(isOpen = true): void {
    this.isMenuOpen = isOpen;
    this.SearchBox?.toggleShowInOut(isOpen);
  }

  closeMenu(): void {
    const dropdowns = document.getElementsByClassName('dropdown-menu');

    for (let i = 0; i < dropdowns.length; i++) {
      const dropdown = dropdowns[i] as HTMLElement;

      dropdown.style.display = 'none';
    }
  }

  activeMenu(): void {
    const dropdowns = document.getElementsByClassName('dropdown-menu');

    for (let i = 0; i < dropdowns.length; i++) {
      const dropdown = dropdowns[i] as HTMLElement;

      dropdown.style.display = '';
    }
  }

  getArchiveMenuSection(): void {
    this.menuService.getArchiveMenuSection().subscribe(data => {
      if (data.message === 'success') this.menuArchive = data.list.content;
    });
  }

  public trackSegmentEvent(): void {
    this.segmentService.track('Button Clicked', { label: 'sell_an_item' });
  }
}
