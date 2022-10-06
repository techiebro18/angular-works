import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { environment } from '@environments/environment';
import { AppGuard } from '@core/guards/app.guard';

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
    canActivate: [AppGuard],
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [AppGuard],
  },
  {
    path: 'sellers',
    loadChildren: () => import('./modules/sellers/sellers.module').then(m => m.SellersModule),
    canActivate: [AppGuard],
  },
  {
    path: 'the-archive',
    loadChildren: () => import('./modules/the-archive/the-archive.module').then(m => m.TheArchiveModule),
    canActivate: [AppGuard],
  },
  {
    path: 'community',
    loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule),
    canActivate: [AppGuard],
  },
  {
    path: 'public/chanel-flap-bag',
    redirectTo: 'chanel-flap-bags',
  },
  {
    path: 'da/home',
    redirectTo: '',
  },
  {
    path: 'chanel-flap-bag',
    redirectTo: 'chanel-flap-bags',
  },
  {
    path: 'dior-saddle-bag',
    redirectTo: 'dior-saddle-bags',
  },
  {
    path: 'new-arrivals',
    redirectTo: 'new-in',
  },
  {
    path: 'public/:param1/:param2',
    redirectTo: '',
  },
  {
    path: 'public/:param1',
    redirectTo: '',
  },
  {
    path: 'public',
    redirectTo: '',
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'showroom',
    redirectTo: '',
  },
  {
    path: '',
    loadChildren: () => import('./modules/default/default.module').then(m => m.DefaultModule),
  },
  // Trying to access any none existing route should redirect to home page
  {
    path: '**',
    redirectTo: '',
  },
];
const host = typeof window !== 'undefined' ? window.location.host : '';
const subdomain = host.split('.')[0];

if (subdomain == 'dk') {
  routes.unshift({
    path: 'shop/bags',
    redirectTo: 'shop/tasker',
  });
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 115],
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
  ],
})
export class AppRoutingModule {}
