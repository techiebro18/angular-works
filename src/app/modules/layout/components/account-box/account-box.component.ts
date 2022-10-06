import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@services/common/shared.service';
import { AppService } from '@services/app/app.service';
import { AuthService } from '@services/auth.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'tvb-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss'],
})
export class AccountBoxComponent implements OnInit, OnChanges {
  @Input() public open = false;
  @Input() user: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    public authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService,
    public segmentService: SegmentService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    const open: SimpleChange = changes['open'];

    open && this.toogleAccountBox(open.currentValue);
  }

  public toogleAccountBox(open: boolean) {
    this.open = open;
  }

  goTo(url) {
    this.hideAccountBox();
    this.router.navigateByUrl(url);
  }

  public hideAccountBox() {
    this.renderer.addClass(document.getElementById('account_details_link'), 'ignore-click-outside');
    this.callBack.emit();
  }

  logout() {
    const email = this.user.value?.email;

    this.hideAccountBox();
    this.authService.logoutAPIV2().subscribe(
      data => {
        this.segmentService.SignedOut(email);
        this.afterLogoutCleaning();
        this.router.navigate(['/']);
      },
      error => {
        this.afterLogoutCleaning();
        console.log(error);
      }
    );
  }

  public afterLogoutCleaning() {
    this.userService.setUser(null);
    this.appService.disableSettingsPopup(false);
    this.authService.afterLogout();
    this.sharedService.updateCartCount(0);
    this.sharedService.updateItemCount(0);
  }
}
