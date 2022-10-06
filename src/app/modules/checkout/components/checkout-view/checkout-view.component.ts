import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppService } from '@services/app/app.service';
import { UserService } from '@services/user.service';
import { UserData } from '@schemas/user.interface';
import { AuthService } from '@services/auth.service';
import { switchMap } from 'rxjs/operators';
import { CheckoutService } from '@services/checkout/checkout.service';
import Order from '@services/checkout/models/order';
import { MetaService } from '@services/app/meta.service';
import { SegmentService } from '@services/segment.service';

@Component({
  selector: 'checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.scss'],
})
export class CheckoutViewComponent implements OnInit {
  public user$: BehaviorSubject<UserData | null>;
  currencyConfig;
  public checkoutState;
  path = 'login';
  router$;

  public checkout$: Observable<any>;
  public currencyConfiguration$: Observable<any>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private appService: AppService,
    private metaService: MetaService,
    public segmentService: SegmentService
  ) {
    this.user$ = this.userService.getUserData();
    this.router$ = this.router.events.subscribe((val: RouterEvent) => {
      if (!val.url) return;

      const path = val.url.split('/checkout/')[1];

      if (path === 'login' && this.authService.loggedIn) {
        this.segmentService.trackOnePageUser('Checkout Step Completed', {
          step: 1,
          step_name: 'Login',
          login_method: 'Already Signed In',
        });
        this.router.navigate(['/checkout/shipping-address']);
      }

      if (this.path === path) return;

      if (!val.url.startsWith('/checkout')) return;

      if (path) this.path = path;
    });
  }

  ngOnInit(): void {
    this.checkout$ = this.store.pipe(select('checkoutReducer'));
    this.checkout$.subscribe(state => {
      this.checkoutState = state;
    });

    this.setInitialCurrency();
    this.metaService.getStaticPageMeta('checkout');
  }

  setInitialCurrency() {
    this.currencyConfiguration$ = this.appService.getAppConfigurationObservable().pipe(
      switchMap((appConfig: any) => {
        const plpCurrency = appConfig
          ? appConfig.currencyCode
          : 'USD';
        const plpCurrencySymbol = appConfig
          ? appConfig.currencySymbol
          : '$';

        return of({ plpCurrency, plpCurrencySymbol });
      })
    );

    this.currencyConfiguration$.subscribe(value => {
      this.currencyConfig = value;
    });
  }

  isActiveRoute(route) {
    const routes = ['login', 'shipping-address', 'payment-method', 'review-order'];

    const currentPathIndex = routes.indexOf(this.path);
    const routeIndex = routes.indexOf(route);

    return routeIndex < currentPathIndex;
  }

  ngOnDestroy() {
    this.router$?.unsubscribe();
  }
}
