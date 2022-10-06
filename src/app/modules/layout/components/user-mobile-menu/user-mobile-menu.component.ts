import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { AuthService } from '@services/auth.service';
import { SharedService } from '@services/common/shared.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'tvb-user-mobile-menu',
  templateUrl: './user-mobile-menu.component.html',
  styleUrls: ['./user-mobile-menu.component.scss'],
})
export class UserMobileMenuComponent implements OnInit {
  @Input() user: UserData;
  @Output() itemClicked: EventEmitter<any> = new EventEmitter();
  public userLogged$: BehaviorSubject<UserData | null>;

  expandMyItemsMenu = false;
  expandMyOffersMenu = false;
  expandTermsMenu = false;
  userRolesEnum = UserRolesEnum;

  constructor(
    private renderer: Renderer2,
    public authService: AuthService,
    public segmentService: SegmentService,
    public appService: AppService,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
  ) {
    this.userLogged$ = this.userService.getUserData();
  }

  ngOnInit(): void {}

  closeNav(): void {
    this.renderer.removeClass(document.body, 'noScroll');
    this.itemClicked.emit();
  }

  shouldShowReceivedOffersMenuOption(): boolean {
    return this.user?.role_id == UserRolesEnum.TVB_ADMIN || this.user?.role_id == UserRolesEnum.PROFESSIONAL_SELLER;
  }

  toggleMyItemsMenu(): void {
    this.expandMyItemsMenu = !this.expandMyItemsMenu;
  }

  toggleMyOffersMenu(): void {
    this.expandMyOffersMenu = !this.expandMyOffersMenu;
  }

  toggleTermsMenu(): void {
    this.expandTermsMenu = !this.expandTermsMenu;
  }

  public logout() {
    this.authService.logoutAPIV2().subscribe(
      data => {
        this.segmentService.SignedOut(this.userLogged$.getValue()?.email);
        this.afterLogoutCleaning();
        this.router.navigate(['/']);
      },
      error => {
        this.afterLogoutCleaning();
      }
    );
  }

  public afterLogoutCleaning() {
    this.appService.disableSettingsPopup(false);
    this.authService.afterLogout();
    this.sharedService.updateCartCount(0);
    this.sharedService.updateItemCount(0);
    this.closeNav();
  }
}
