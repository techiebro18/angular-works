import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScreenDetectorService } from '@services/app/screen-detector.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { UserService } from '@services/user.service';
import { filter, startWith } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserData } from '@schemas/user.interface';
import { MetaService } from '@services/app/meta.service';
import { OfferService } from '@services/account/offer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLogged$: BehaviorSubject<UserData | null>;
  siteUrl = '';
  userRoleId: number;
  pageTitle: string;
  pageSubTitle: string;
  expandOffersMenu = false;
  expandMyItemsMenu = false;
  expandAcceptTermsMenu = false;
  isUserOpenToOffers: boolean;
  openAccountMenu = false;
  userRolesEnum = UserRolesEnum;

  constructor(
    private screenSizeDetector: ScreenDetectorService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService,
    public offerService: OfferService,
    private renderer: Renderer2
  ) {
    this.userLogged$ = this.userService.getUserData();
  }

  async ngOnInit(): Promise<void> {
    const offerGlobalStatus = (await this.offerService.isGlobalOfferParamEnabled().toPromise()).data;

    this.offerService.setOfferGlobalStatus(offerGlobalStatus);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe(() => {
        const route = this.getChild(this.activatedRoute);

        route.data.subscribe(data => {
          this.pageTitle = data.title;
          this.pageSubTitle = data.subTitle;
        });
      });

    this.isMobile$ = this.screenSizeDetector.isMobile;
    this.siteUrl = 'https://' + environment.demainUrl + '/';
    const user = this.userService.getUserData().getValue();

    if (user) {
      this.isUserOpenToOffers = (await firstValueFrom(this.offerService.isUserOpenToOffers(user.id)))?.data;
      this.userService.getUserV2(user.id).subscribe(data => {
        if (data.message === 'User Id exists.') {
          const userData: UserData = data.user?.user[0];

          this.userRoleId = userData.role_id;
        }
      });
    }

    this.metaService.getStaticPageMeta('account', '', 'My Account');
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }
    else {
      return activatedRoute;
    }
  }

  toggleOffersMenu(): void {
    this.expandOffersMenu = !this.expandOffersMenu;
  }

  toggleMyItemsMenu(): void {
    this.expandMyItemsMenu = !this.expandMyItemsMenu;
  }

  toggleAcceptTermsMenu(): void {
    this.expandAcceptTermsMenu = !this.expandAcceptTermsMenu;
  }

  openMyAccountMenu(open: boolean): void {
    this.openAccountMenu = open;

    if (open) this.renderer.addClass(document.getElementById('footerMain'), 'displayNone');
    else this.renderer.removeClass(document.getElementById('footerMain'), 'displayNone');
  }
}
