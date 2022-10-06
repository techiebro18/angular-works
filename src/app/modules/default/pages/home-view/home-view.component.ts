import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { finalize, take } from 'rxjs/operators';
import { PagesService } from '@services/pages.service';
import { LoaderService } from '@services/app/loader.service';
import { MetaService } from '@services/app/meta.service';
import { LdJsonService } from '@services/app/ld-json.service';
import { AppService } from '@services/app/app.service';
import { AppConfiguration } from '@schemas/app.interface';
import { UniversalService } from '@services/universal.service';
import { ProductService, WishlistObjectIdsResponseModel, WishlistProductId } from '@services/product.service';
import { UserService } from '@services/user.service';
import { BehaviorSubject, EMPTY, Observable, concatMap } from 'rxjs';
import { UserData } from '@schemas/user.interface';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { HomepageSection } from '@shared/models/homepage-section.interface';
import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';
import { MemberBioService } from '@services/community/member-bio.service';
import { MemberBio } from '@schemas/community/member-bio';
import { TheArchiveService } from '@services/the-archive.service';
import { Article } from '@schemas/article';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit {
  // route params:
  data: any = null;
  env = environment;
  userSnapshot$: BehaviorSubject<UserData | null>;
  appConfig: AppConfiguration;
  // campaigns section
  campaignsShowcaseData: { items: HomepageSection[] } = { items: [] };
  // we-love section
  readonly defaultWishlistUserId = 31; // Wishlist items must come from user 'ml@thevintagebar.com'
  weLoveShowcaseData: {
    items: ProductSearchResponseModel[];
    saleBadge: boolean;
    currencyCode: string;
  } = {
    items: [],
    saleBadge: false,
    currencyCode: 'EUR',
  };
  users: Array<MemberBio> = new Array<MemberBio>();
  communityMembersSection: Array<HomepageSection> = new Array<HomepageSection>();
  theArchiveSection: Array<HomepageSection> = new Array<HomepageSection>();
  numOfProducts = <any>'';
  public config$: BehaviorSubject<AppConfiguration | null>;
  articles: Article[];

  constructor(
    private loaderService: LoaderService,
    private ldJsonService: LdJsonService,
    private metaService: MetaService,
    private pagesService: PagesService,
    private appService: AppService,
    private universalService: UniversalService,
    private productService: ProductService,
    private userService: UserService,
    private memberBioService: MemberBioService,
    private archiveService: TheArchiveService
  ) {}

  ngOnInit(): void {
    this.userSnapshot$ = this.userService.getUserData();
    this.config$ = this.appService.getAppConfigurationBehavior();
    this.appService
      .getAppConfigurationBehavior()
      .subscribe((newValue: AppConfiguration) => (this.appConfig = newValue));

    this.appService
      .getAppConfigurationObservable()
      .pipe(take(1))
      .subscribe((appConfig: AppConfiguration | null) => {
        if (appConfig != null) {
          this.metaService.getStaticPageMeta('home');
          this.ldJsonService.getForHome();
        }
      });
    this.pagesService
      .getHome()
      .pipe(
        finalize(() => {
          this.loaderService.triggerLoading.emit(false);
        })
      )
      .subscribe({
        next: (pageData: any) => {
          this.data = pageData;

          if (this.universalService.isBrowser) {
            const userAgentString = navigator.userAgent;
            let safariAgent = userAgentString.indexOf('Safari') > -1;
            const chromeAgent = userAgentString.indexOf('Chrome') > -1;

            // Discard Safari since it also matches Chrome
            if (chromeAgent && safariAgent) safariAgent = false;

            if (safariAgent) {
              this.data.slider.image_url = this.data.slider.image_url_jpg;
              this.data.slider.extension = this.data.slider.extension_jpg;
              this.data.home.map(data => {
                data.image_url = data.image_url_jpg;
                data.extension = data.extension_jpg;

                return data;
              });
            }
          }
        },
        error: () => {
          this.loaderService.triggerLoading.emit(false);
        },
      });

    // WE LOVE section
    this.userService.getUserData().subscribe(user => this.refreshLoggedUserWishlistItems(user?.id));
    this.getSaleBadgeState();
    this.loadWeLoveProducts();
    this.loadCampaigns();
    this.loadCommunityMembers();
    this.loadTheArchive();
    this.getApprovedProducts();
  }

  loadCommunityMembers() {
    this.pagesService
      .getHomePageSections('community_member', 'en')
      .subscribe((response: ApiResponseModel<HomepageSection[]>) => {
        if (response.data) {
          this.communityMembersSection = response.data;
          const users_id = this.communityMembersSection.map(x => x.title).join(',');

          this.memberBioService.getUsers(users_id).subscribe(users => {
            this.getUsersInfo(users);
          });
        }
      });
  }

  loadTheArchive() {
    this.pagesService
      .getHomePageSections('the_archive', 'en')
      .subscribe((response: ApiResponseModel<HomepageSection[]>) => {
        if (response.data) {
          this.theArchiveSection = response.data;
          const articles_id = this.theArchiveSection.map(x => x.title).join(',');

          this.archiveService.getSelectedArticles(articles_id).subscribe(articles => {
            this.theArchiveSection.forEach(x => {
              articles.find(e => e.id?.toString() === x.title).sort = x.sort_order;
            });
            articles.sort(function (a, b) {
              return a.sort - b.sort;
            });
            this.articles = articles;
          });
        }
      });
  }

  getUsersInfo(users: MemberBio[]) {
    users.forEach(user => {
      this.productService.getSellerInfo(user.id).subscribe(data => {
        user.listedItems = data;
        this.productService.getSellerSoldItems(user.id).subscribe(data => {
          user.totalItemsSold = data;
          const section = this.communityMembersSection.find(x => x.title === user.id.toString());

          user.cover_image = `${this.env.UPLOADS_IMGIX_URL}dynamic/homepage/${section?.image_url}.${section?.extension}`;
          user.sort = section.sort_order;
          this.users.push(user);
        });
      });
    });
  }

  loadCampaigns() {
    this.pagesService
      .getHomePageSections('campaign', this.appConfig?.languageShortName)
      .subscribe((response: ApiResponseModel<HomepageSection[]>) => {
        this.campaignsShowcaseData.items = response.data;
      });
  }

  getWishlistProductIDsByUserOb$(userId: number): Observable<ProductSearchResponseModel[]> {
    return this.productService.getWishlistProductIDsByUser(userId).pipe(
      concatMap((objectIds: WishlistObjectIdsResponseModel) => {
        if (!objectIds || !objectIds.list || objectIds.list.length === 0) {
          return EMPTY;
        }

        const queryString = objectIds.list
          .slice(0, 10)
          .reduce((previousValue: string, currentValue: WishlistProductId, currentIndex: number) => {
            if (currentIndex < objectIds.list.length - 1) return previousValue + currentValue.product_id + '&id=';
            else return previousValue + currentValue.product_id;
          }, 'id=');

        return this.productService.search(queryString);
      })
    );
  }

  loadWeLoveProducts(): void {
    this.getWishlistProductIDsByUserOb$(this.defaultWishlistUserId).subscribe(
      (response: ProductSearchResponseModel[]) => {
        this.weLoveShowcaseData.items = response;
        this.weLoveShowcaseData.currencyCode = this.appConfig.currencyCode;
      }
    );
  }

  refreshLoggedUserWishlistItems(userId: number): void {
    if (userId) {
      this.getWishlistProductIDsByUserOb$(userId).subscribe((products: ProductSearchResponseModel[]) =>
        this.productService.updateUserWishlistRecords(products)
      );
    }
  }

  private getSaleBadgeState(): void {
    this.appService.getAppSetting('sale-badge').subscribe((data: any) => {
      if (data.message === 'success') {
        this.weLoveShowcaseData.saleBadge = data.model.status == 'active';
      }
    });
  }

  getApprovedProducts(): void {
    const currentTimeStamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const toTimeStamp = currentTimeStamp - 24 * 60 * 60 * 1000;
    const fromTimeStamp = toTimeStamp - 24 * 60 * 60 * 1000;
    const fromTimeStampSecond = (fromTimeStamp / 1000).toFixed(0); //Converted in seconds
    const toTimeStampSecond = (toTimeStamp / 1000).toFixed(0); //Converted in seconds

    const timestamps = {
      from: fromTimeStampSecond,
      to: toTimeStampSecond,
    };

    this.productService.getApprovedProducts(timestamps).subscribe((res: any) => {
      this.numOfProducts = res > 0 ? new Intl.NumberFormat('de-DE').format(res) : 1.063;
    });
  }
}
