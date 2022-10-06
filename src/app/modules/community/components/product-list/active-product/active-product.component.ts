import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import * as algoliasearch from 'algoliasearch/lite';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { UserData } from '@schemas/user.interface';
import { LocalStorageService } from '@services/local-storage.service';
import { AuthService } from '@services/auth.service';
import {
  communityPLPConfiguration,
  getCategoryName,
  getCategorySlug,
  getPathFromURL,
} from '../../../../catalog/pages/listing-view/plp-configuaration';
import {
  PLPConfiguration,
  PlpCurrencyData,
  PlpRouteInfo,
  PlpRouteParams,
  PlpRouteStaticData,
} from '../../../../catalog/pages/listing-view/plp-definitions';
import { history as historyRouter } from '../../../../catalog/pages/listing-view/routers';
import { PlpService } from '@services/plp.service';
import { AppService } from '@services/app/app.service';
import { MetaService } from '@services/app/meta.service';
import { UniversalService } from '@services/universal.service';
import { MemberBio } from '@schemas/community/member-bio';

@Component({
  selector: 'app-active-product',
  templateUrl: './active-product.component.html',
  styleUrls: ['./active-product.component.scss'],
})
export class ActiveProductComponent implements OnInit {
  @Input() public member: MemberBio;

  public routeParamMap$: Observable<PlpRouteParams>;
  public routeData$: Observable<PlpRouteStaticData>;
  public currencyConfiguration$: Observable<PlpCurrencyData>;
  public pathData$: Observable<PlpRouteInfo>;

  public topname: string;
  public topdescription: string;
  public bottomname: string;
  public bottomdescription: string;
  public onDestroy$ = new Subject();
  public isPDP = false;
  public productId: number;
  public user$: BehaviorSubject<UserData | null>;
  public instantsearchConfig = {
    //TODO: change index based on sortBy param for default sortBy
    indexName: environment.INSTANT_SEARCH_INDEX_NAME,
    searchClient: algoliasearch(environment.INSTANT_SEARCH_APP_ID, environment.INSTANT_SEARCH_SEARCH_API_KEY),
    routing: {
      router: historyRouter({
        createURL: ({ qsModule, routeState, location }) => {
          const pathName = getPathFromURL(this.universalService.getApplicationPathname());

          const baseUrl = `${location.origin}${pathName}`;

          const categoryPath = routeState.category ? `${getCategorySlug(routeState.category)}/` : '';

          const subCategoryPath = routeState.subCategory ? `${getCategorySlug(routeState.subCategory)}/` : '';
          const search = routeState.search ? routeState.search : '';
          const { params } = this.activatedRoute.snapshot;
          const stylesSeoUrl = params.styles_seo_url
            ? `${getCategorySlug(decodeURIComponent(params.styles_seo_url))}/`
            : '';
          const queryParameters = {} as any;

          if (routeState.query) {
            queryParameters.query = encodeURIComponent(routeState.query);
          }

          if (routeState.page !== 1) {
            queryParameters.page = routeState.page;
          }

          if (routeState.colors) {
            queryParameters.color = routeState.colors.map(encodeURIComponent);
          }

          if (routeState.selectedCategories) {
            queryParameters.category = routeState.selectedCategories.map(encodeURIComponent);
          }

          if (routeState.selectedSubCategories) {
            queryParameters.sub = routeState.selectedSubCategories.map(encodeURIComponent);
          }

          if (routeState.selectedDesigners) {
            queryParameters.brand = routeState.selectedDesigners.map(encodeURIComponent);
          }

          if (routeState.shoesSize) {
            queryParameters.shoes = routeState.shoesSize.map(encodeURIComponent);
          }

          if (routeState.clothingSize) {
            queryParameters.clothing = routeState.clothingSize.map(encodeURIComponent);
          }

          if (routeState.style) {
            queryParameters.style = routeState.style.map(encodeURIComponent);
          }

          if (routeState.discount) {
            queryParameters.discount = encodeURIComponent(routeState.discount);
          }

          if (routeState.priceRange) {
            queryParameters.price = encodeURIComponent(routeState.priceRange);
          }

          if (routeState.condition) {
            queryParameters.condition = encodeURIComponent(routeState.condition);
          }

          const queryString = qsModule.stringify(queryParameters, {
            addQueryPrefix: true,
            arrayFormat: 'repeat',
          });

          //category/subcategory => when both exists ,, should never be ""/subcategory
          if (stylesSeoUrl && categoryPath == '') {
            this.plpService.lastOpenedUrl.next(`${baseUrl}/${stylesSeoUrl}${queryString}`);

            return `${baseUrl}/${stylesSeoUrl}${queryString}`;
          }
          else if (search != '') {
            this.plpService.lastOpenedUrl.next(`${baseUrl}/${search}${queryString}`);

            return `${baseUrl}/${search}${queryString}`;
          }
          else if (categoryPath == '') {
            this.plpService.lastOpenedUrl.next(`${baseUrl}/${queryString}`);

            return `${baseUrl}/${queryString}`;
          }
          else {
            this.plpService.lastOpenedUrl.next(`${baseUrl}/${categoryPath}${subCategoryPath}${queryString}`);

            return `${baseUrl}/${categoryPath}${subCategoryPath}${queryString}`;
          }
        },
        parseURL: () => {
          const { params, queryParams } = this.activatedRoute.snapshot;
          const routeCategory = getCategoryName(decodeURIComponent(params.parent_category_seo_url || ''));
          const subCategory = getCategoryName(decodeURIComponent(params.child_category_seo_url || ''));
          const search = params.search_query ? params.search_query : '';
          const stylesSeoUrl = getCategoryName(decodeURIComponent(params.styles_seo_url || ''));
          const {
            query = '',
            page,
            color = [],
            category = [],
            sub = [],
            brand = [],
            shoes = [],
            clothing = [],
            style = [],
            discount = '',
            price = '',
            condition = '',
          } = queryParams;
          // color is not an array when there's a single value.
          const allColors = [].concat(color);
          const allSelectedCategories = [].concat(category);
          const allSelectedSubCategories = [].concat(sub);
          const allSelectedDesigners = [].concat(brand);
          const allShoesSizes = [].concat(shoes);
          const allStyle = [].concat(style);
          const allClothingSizes = [].concat(clothing);

          const parentCategory = routeCategory ? [].concat(routeCategory) : undefined;
          const childCategory = subCategory ? [].concat(subCategory) : undefined;
          const stylesUrl = stylesSeoUrl ? [].concat(stylesSeoUrl) : undefined;

          return {
            query: decodeURIComponent(query),
            search: search,
            page,
            colors: allColors.map(decodeURIComponent),
            selectedCategories: allSelectedCategories.map(decodeURIComponent),
            selectedSubCategories: allSelectedSubCategories.map(decodeURIComponent),
            selectedDesigners: allSelectedDesigners.map(decodeURIComponent),
            shoesSize: allShoesSizes.map(decodeURIComponent),
            style: allStyle.map(decodeURIComponent),
            discount: decodeURIComponent(discount) + ':',
            clothingSize: allClothingSizes.map(decodeURIComponent),
            category: parentCategory,
            subCategory: childCategory,
            stylesUrl: stylesUrl,
            priceRange: decodeURIComponent(price).replace('-', ':'),
            condition: decodeURIComponent(condition) + ':',
          };
        },
      }),

      stateMapping: this.simpleMapping(),
    },
  };

  public plpConfig$: Observable<PLPConfiguration>;
  loggedInStatus: boolean;
  constructor(
    private plpService: PlpService,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private metaService: MetaService,
    private universalService: UniversalService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUserData();
    this.isPDP = false;
    this.productId = 0;
    this.activatedRoute.queryParams.pipe(filter(params => params.pdp)).subscribe(params => {
      this.productId = params.pdp;
      this.isPDP = true;
    });
    this.loggedInStatus = this.authService.loggedIn;
    // read the routes params
    this.routeParamMap$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        return of({
          parent_category_seo_url: params.get('parent_category_seo_url'),
          child_category_seo_url: params.get('child_category_seo_url'),
          designer_seo_url: params.get('designer_seo_url'),
          discover_seo_url: params.get('discover_seo_url'),
          seller_seo_url: params.get('seller_seo_url'),
          styles_seo_url: params.get('styles_seo_url'),
          search_query: params.get('search_query'),
        });
      })
    );

    // read path static data
    this.routeData$ = this.activatedRoute.data.pipe(
      switchMap(data => {
        return of({
          plpFor: data.plpFor,
          plpLanguage: data.language,
        });
      })
    );

    this.currencyConfiguration$ = this.appService.getAppConfigurationObservable().pipe(
      switchMap(appConfig => {
        if (appConfig) {
          return of({
            plpCurrency: appConfig.currencyCode,
            plpCurrencySymbol: appConfig.currencySymbol,
          });
        }
        else {
          return of({
            plpCurrency: 'USD',
            plpCurrencySymbol: '$',
          });
        }
      })
    );

    this.pathData$ = combineLatest([
      this.routeParamMap$,
      this.routeData$,
      this.currencyConfiguration$,
      this.user$,
    ]).pipe(
      switchMap(([paramMapO, data, currency, user]) =>
        of({
          routeParams: paramMapO,
          staticData: data,
          currencyInfo: currency,
          userData: user,
        } as PlpRouteInfo)
      )
    );

    let toTake = 1000;

    this.activatedRoute.queryParams.forEach(v => {
      if (v.hasOwnProperty('utm_source')) {
        toTake = 1;

        return;
      }
    });
    this.plpConfig$ = this.pathData$.pipe(take(toTake)).pipe(
      switchMap(plpRouteInfo => {
        let userToken = this.localStorageService.getItem('ajs_anonymous_id');

        if (this.loggedInStatus) {
          userToken = plpRouteInfo.userData.id + '';
        }

        const plpConfigObject = this.getPLPConfigurationObject(plpRouteInfo);

        plpConfigObject.searchParameters.userToken = userToken;

        return of(plpConfigObject);
      })
    );
  }

  public getPLPConfigurationObject(plpRouteInfo: PlpRouteInfo): PLPConfiguration {
    const languageSuffix = this.getCurrentPLPLanguageSuffix();

    plpRouteInfo.staticData.plpLanguage = languageSuffix;

    this.plpService.isWriteToURL.next(false);
    this.plpService.lastOpenedUrl.pipe(take(1)).subscribe((lastURL: string) => {
      this.plpService.isWriteToURL.next(true);
    });

    return communityPLPConfiguration(
      plpRouteInfo.staticData.plpLanguage,
      plpRouteInfo.currencyInfo.plpCurrency,
      plpRouteInfo.currencyInfo.plpCurrencySymbol,
      this.member.user_id,
      plpRouteInfo.routeParams.parent_category_seo_url,
      plpRouteInfo.routeParams.child_category_seo_url
    );
  }

  getBottomData(plpRouteInfo: PlpRouteInfo) {
    this.plpService.getTopBottomDesc(plpRouteInfo).subscribe(
      data => {
        this.topname = data.list.translatedTitle ?? data.list.name;
        this.bottomname = data.list.translatedSubTitle ?? data.list.sub_title;
        this.topdescription = data.list.translatedContent ?? data.list.description;
        this.bottomdescription = data.list.translatedSubContent ?? data.list.sub_description;
      },
      error => {
        console.log(error);
      }
    );
  }

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

  simpleMapping() {
    return {
      stateToRoute: uiState => {
        //read refinementList keys, check with startsWith and use it to work with all languages
        const language = this.getCurrentPLPLanguageSuffix();
        let currency = 'USD';
        const appConfig = this.appService.getAppConfigurationValue();

        if (appConfig && appConfig.currencyCode) {
          currency = appConfig.currencyCode;
        }

        const parentCategoryKey = `parent_category_${language}.url`;
        const childCategoryKey = `category_${language}.url`;
        const brandsNameKey = `brands_name_${language}`;
        const colorKey = `color_${language}`;
        const styleKey = `styles_seo_url_${language}`;
        const discountKey = 'discount_percentage';
        const priceKey = `discounted_price_${currency}`;
        const shoesSizeKey = 'shoes_size';
        const clothingSizeKey = 'clothing_size';
        const conditionKey = 'condition_rating';

        // parent category route
        let parantCategory = undefined;

        if (
          uiState.refinementList
          && uiState.refinementList[parentCategoryKey]
          && uiState.refinementList[parentCategoryKey][0].length > 0
        ) {
          parantCategory = uiState.refinementList[parentCategoryKey][0];
        }

        // if parent category is not set in the uiState, get it from the url if exists
        const { params } = this.activatedRoute.snapshot;

        if (parantCategory == undefined) {
          parantCategory = getCategoryName(decodeURIComponent(params.parent_category_seo_url || ''));

          if (parantCategory == '') parantCategory = undefined;
        }

        // Child category route
        let childCategory = undefined;

        if (
          uiState.refinementList
          && uiState.refinementList[childCategoryKey]
          && uiState.refinementList[childCategoryKey][0].length > 0
        ) {
          childCategory = uiState.refinementList[childCategoryKey][0];
        }

        // if childCategory is not set in the uiState, get it from the url if exists
        if (childCategory == undefined) {
          childCategory = getCategoryName(decodeURIComponent(params.child_category_seo_url || ''));

          if (childCategory == '') childCategory = undefined;
        }

        this.plpService.isWriteToURL.next(true);

        return {
          query: uiState.query,
          search: params.search_query,
          page: uiState.page,
          // category and subCategory to be added in the routeParam and in the queryParam
          category: parantCategory,
          subCategory: childCategory,
          // color filter to be added as queryParam
          colors: uiState.refinementList && uiState.refinementList[colorKey],
          style: uiState.refinementList && uiState.refinementList[styleKey],
          discount: uiState.numericMenu && uiState.numericMenu[discountKey]?.replace(':', ''),
          // all selected ParentCategories filter to be added as queryParam, because paths supports only one main category
          selectedCategories: uiState.refinementList && uiState.refinementList[parentCategoryKey],
          // all selected subCategories filter to be added as queryParam, because paths supports only one sub category
          selectedSubCategories: uiState.refinementList && uiState.refinementList[childCategoryKey],
          // all selected designers filter to be added as queryParam
          selectedDesigners: uiState.refinementList && uiState.refinementList[brandsNameKey],
          // all selected shoewsSize filter to be added as queryParam
          shoesSize: uiState.refinementList && uiState.refinementList[shoesSizeKey],
          // all selected clothingSize filter to be added as queryParam
          clothingSize: uiState.refinementList && uiState.refinementList[clothingSizeKey],
          //discounted_price_USD
          priceRange: uiState.range && uiState.range[priceKey]?.replace(':', '-'),
          condition: uiState.numericMenu && uiState.numericMenu[conditionKey]?.replace(':', ''),
          writeToURL: this.plpService.isWriteToURL.getValue(),
        };
      },
      routeToState: routeState => {
        // We get the routeState generated from parsing the URL ,, we prepare and return the instantSearch uiState
        // console.log("****** routeToState *******", routeState);
        // Paths are handled with Angular Route , so parent_category, child_category etc should not be taken from the route
        // Only take the query the other refinments and page
        const language = this.getCurrentPLPLanguageSuffix();
        let currency = 'USD';
        const appConfig = this.appService.getAppConfigurationValue();

        if (appConfig && appConfig.currencyCode) {
          currency = appConfig.currencyCode;
        }

        const parentCategoryKey = `parent_category_${language}.url`;
        const childCategoryKey = `category_${language}.url`;
        const brandsNameKey = `brands_name_${language}`;
        const colorKey = `color_${language}`;
        const styleKey = `styles_seo_url_${language}`;
        const discountKey = 'discount_percentage';
        const conditionKey = 'condition_rating';
        const priceKey = `discounted_price_${currency}`;
        const shoesSizeKey = 'shoes_size';
        const clothingSizeKey = 'clothing_size';

        return {
          query: routeState.query,
          page: routeState.page,
          refinementList: {
            [colorKey]: routeState.colors,
            [styleKey]: routeState.style,
            [parentCategoryKey]: routeState.selectedCategories,
            [childCategoryKey]: routeState.selectedSubCategories,
            [brandsNameKey]: routeState.selectedDesigners,
            [shoesSizeKey]: routeState.shoesSize,
            [clothingSizeKey]: routeState.clothingSize,
          },
          range: {
            [priceKey]: routeState.priceRange,
          },
          numericMenu: {
            [discountKey]: routeState.discount,
            [conditionKey]: routeState.condition,
          },
        };
      },
    };
  }
}
