import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuService } from '@services/common/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { LoginRegisterDialogComponent } from '../dialogs/login-register-dialog/login-register-dialog.component';
import { TopSettingsDialogComponent } from '../dialogs/top-settings-dialog/top-settings-dialog.component';
//for search-bar
import { Product, Style } from '@schemas/product.interface';
import { LocalStorageService } from '@services/local-storage.service';
import { UniversalService } from '@services/universal.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AppConfiguration } from '@schemas/app.interface';
import { AuthService } from '@services/auth.service';
import { SharedService } from '@services/common/shared.service';
import { UserService } from '@services/user.service';
import { BehaviorSubject } from 'rxjs';
import { SegmentService } from '@services/segment.service';
import { UserData } from '@schemas/user.interface';
import algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public user$: BehaviorSubject<UserData | null>;
  public isShow = false;
  public isCancelButton = false;
  public selectedMenuName = '';
  public transitionMinus = false;
  public transitionPlus = false;
  public selectedCountry = 'United States';
  public selectedLanguage = 'English (US)';
  public selectedCurrency = 'USD';
  public accountSeo: any;

  @Input() useTextBoxAsCTA = false;

  //for search-bar
  searchString = '';
  styleList: Style[] = [];
  designerList: any[] = [];
  userId = 0;
  cartItemCount = 0;
  myAccountMenu = false;
  @ViewChild('searchValue', { static: false }) inputSearch: ElementRef;

  form = new FormGroup({
    searchValues: new FormControl(''),
  });

  public instantsearchConfig = {
    indexName: environment.INSTANT_SEARCH_INDEX_NAME_DESIGNER,
    searchClient: algoliasearch(environment.INSTANT_SEARCH_APP_ID, environment.INSTANT_SEARCH_SEARCH_API_KEY),
    hitsPerPage: 8,
  };

  constructor(
    public menuService: MenuService,
    private _router: Router,
    private dialogService: DialogService,
    private elRef: ElementRef,
    public _appService: AppService,
    private localStorageService: LocalStorageService,
    private universalService: UniversalService,
    public authService: AuthService,
    private userService: UserService,
    private _sharedService: SharedService,
    public segmentService: SegmentService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.clearFormSearchValue();
    this.setLanguageAndCurrency();

    this._appService.getAppConfigurationObservable().subscribe((appConfig: AppConfiguration | null) => {
      if (appConfig != null) {
        this.updateconfigDetails(appConfig);
      }
    });

    this.accountSeo = 'account';
    const currentSubDomain = this._appService.getCurrentSubDomain(null);

    if (currentSubDomain == '' || currentSubDomain == 'uk') {
      this.accountSeo = 'account';
    }
    else if (currentSubDomain == 'de') {
      this.accountSeo = 'konto';
    }
    else if (currentSubDomain == 'dk') {
      this.accountSeo = 'konto';
    }
    else if (currentSubDomain == 'se') {
      this.accountSeo = 'konto';
    }
  }

  public setLanguageAndCurrency() {
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();

    if (currentAppConfiguaration != null) {
      this.selectedCurrency = currentAppConfiguaration.currencyCode;
      this.selectedLanguage = currentAppConfiguaration.languageName;
      this.selectedCountry = currentAppConfiguaration.countryName;
    }
  }

  public updateconfigDetails(_fullConfigObject: AppConfiguration): void {
    this.selectedCurrency = _fullConfigObject.currencyCode;
    this.selectedLanguage = _fullConfigObject.languageName;
    this.selectedCountry = _fullConfigObject.countryName;
  }

  clearFormSearchValue(): void {
    this.form.setValue({ searchValues: '' });
  }

  isMobile = () => window.matchMedia('(max-width: 992px)').matches;

  openCloseNav(isShow: any): void {
    const isMob = this.isMobile();

    this.myAccountMenu = false;
    this.transitionMinus = true;
    this.transitionPlus = false;
    this.form.setValue({ searchValues: '' });

    if (isShow) {
      this.renderer.removeClass(document.body, 'noScroll');
      this.isShow = false;
    }
    else {
      this.renderer.addClass(document.body, 'noScroll');
      this.isShow = true;
    }
  }

  onKeyMobile(value: any, key: any) {
    if (value) {
      this.isCancelButton = true;
    }
    else {
      this.isCancelButton = false;
      this.clearFormSearchValue();
    }

    const charCode = key.which
      ? key.which
      : key.keyCode;
    const productConfig = {} as Product;

    if (this.localStorageService.getItem('user') != null) {
      this.userId = JSON.parse(this.localStorageService.getItem('user') as string).id;
    }

    if (this.universalService.isBrowser) {
      productConfig.currency_id = this.localStorageService.getItem('config')
        ? JSON.parse(this.localStorageService.getItem('config') as string).currencyID
        : 11;
      productConfig.language_id = this.localStorageService.getItem('config')
        ? JSON.parse(this.localStorageService.getItem('config') as string).languageID
        : 1;
      productConfig.user_id = this.userId != null
        ? this.userId
        : null;
    }

    this.searchString = value;

    if (this.searchString != '' && this.searchString.length >= 3) {
      if (charCode >= 65 && charCode <= 90) {
        fromEvent(this.inputSearch.nativeElement, 'keyup')
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
              this.menuService.searchForDesigner(this.searchString, productConfig).subscribe(desginerdata => {
                this.designerList = desginerdata;
              });
              this.menuService.searchForStyle(this.searchString, productConfig).subscribe(styledata => {
                this.styleList = styledata;
              });
            })
          )
          .subscribe();
      }
    }
    else {
      this.styleList = [];
      this.designerList = [];
    }
  }
  cancelButton() {
    this.selectedMenuName = '';
    this.isCancelButton = false;
    this.clearFormSearchValue();
  }

  backButton() {
    this.selectedMenuName = '';
    this.transitionPlus = false;
    this.transitionMinus = true;
  }

  showChildMenu(id: string) {
    this.selectedMenuName = id;
    this.transitionPlus = true;
    this.transitionMinus = false;
  }

  openMyAccountMenu(open: boolean) {
    this.myAccountMenu = open;
    this.transitionPlus = open;
    this.transitionMinus = !open;
  }

  openPopup(isSignIn: boolean) {
    this.dialogService
      .open(LoginRegisterDialogComponent, { isDefaultDialog: true, isSignIn })
      .afterClosed()
      .subscribe(() => {});
  }

  public openSettingPopup() {
    this.dialogService.open(TopSettingsDialogComponent, {
      isDefaultDialog: true,
      isWithHeader: false,
    });
  }

  goToMotherpage(url: string | undefined): void {
    this._router.navigate([url]);
    window.location.replace(url as string);
  }
  brandNavigate(categoryname: any) {
    if (categoryname == null) {
      // return false;
    }
    else {
      const url = categoryname;

      window.location.replace('/designer/' + url);
    }
  }

  public logout() {
    this.authService.logoutAPIV2().subscribe(
      data => {
        this.segmentService.SignedOut(this.user$.getValue()?.email);
        this.afterLogoutCleaning();
        this.router.navigate(['/']);
      },
      error => {
        this.afterLogoutCleaning();
      }
    );
  }

  public afterLogoutCleaning() {
    this._appService.disableSettingsPopup(false);
    this.authService.afterLogout();
    this.cartItemCount = 0;
    this._sharedService.updateCartCount(this.cartItemCount);
    this._sharedService.updateItemCount(0);
  }

  public myAccount() {
    this.openCloseNav(true);
    this._router.navigate([this.accountSeo]);
  }

  public navigateTo(page: string) {
    this.openCloseNav(true);
    this.segmentService.track('Button Clicked', { label: page });
    this._router.navigate([page]);
  }

  public trackSegmentEvent(): void {
    this.segmentService.track('Button Clicked', { label: 'sell_an_item' });
  }
}
