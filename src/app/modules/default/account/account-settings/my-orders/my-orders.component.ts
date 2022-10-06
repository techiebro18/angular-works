import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@services/order.service';
import { LoaderService } from '@services/app/loader.service';
import { environment } from '@environments/environment';
import { UserService } from '@services/user.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { UserData } from '@schemas/user.interface';
import { MetaService } from '@services/app/meta.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isBrowser: any;
  orders: any;
  ordersLength: number;
  ordersRecent: any;
  ordersRecentLength: number;
  orderRecent: any;
  baseUrlImage = environment.baseUrlImage;
  _loggedUserId: number;
  userRoleId: number;
  orderDetailSeo: any;
  public recentOrdersTab = true;
  public previousOrderTab = true;

  constructor(
    private _orderServices: OrderService,
    private _router: Router,
    private loaderService: LoaderService,
    private userService: UserService,
    private metaService: MetaService,
    private spinnerService: NgxSpinnerService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit() {
    this.metaService.getStaticPageMeta('account/my-orders', '', 'My Orders');
    this.orderDetailSeo = '/account/order-detail';
    this.spinnerService.show();
    const user = this.userService.getUserData().getValue();

    if (user) {
      this.userService
        .getUserV2(user.id)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(
          data => {
            if (data.message === 'User Id exists.') {
              const userData: UserData = data.user['user'][0];

              this.userRoleId = userData.role_id;
              this._loggedUserId = userData.id;
              this.getOrdersList(userData.id);
            }
          },
          error => {
            this.loaderService.triggerLoading.emit(false);
          }
        );
    }
    else {
      this.loaderService.triggerLoading.emit(false);
    }
  }

  getOrdersList(_loggedUserId): void {
    this._orderServices.getOrdersList(_loggedUserId).subscribe(orders => {
      this.ordersRecent = orders.ordersRecent;
      this.ordersRecentLength = orders.ordersRecent.length;
      this.orders = orders.orders;
      this.ordersLength = orders.orders.length;
    });
  }

  goToDetails(orderId): void {
    this._router.navigate([this.orderDetailSeo + '/', orderId]);
  }

  public showHideRecentOrderTab() {
    this.recentOrdersTab = this.recentOrdersTab ? false : true;
  }

  public showHidePreviousOrderTab() {
    this.previousOrderTab = this.previousOrderTab ? false : true;
  }
}
