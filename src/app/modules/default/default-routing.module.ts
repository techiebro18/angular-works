import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes, UrlSegment } from '@angular/router';
import { DefaultComponent } from './default.component';
import { HomeViewComponent } from './pages/home-view/home-view.component';
import { AZDesignersComponent } from './pages/azdesigners/azdesigners.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { SignupComponent } from './components/signup/signup.component';
import { ImagesCarouselComponent } from '../../shared/components/images-carousel/images-carousel.component';
import { listingViewRoutes } from '../catalog/pages/listing-view/listing-view-routing';
import { listingViewElkRoutes } from '../catalog/pages/listing-view-elk/listing-view-elk-routing';
import { staticRoutes } from './static/static-routing';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { HelpAndSupportComponent } from './static/help-and-support/help-and-support.component';
import { AzstylesComponent } from './pages/azstyles/azstyles.component';
import { AppGuard } from '@core/guards/app.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AppGuard],
    children: [
      {
        path: 'gallery',
        component: ImagesCarouselComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [AppGuard],
      },
      {
        path: '',
        component: HomeViewComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'azdesigners',
        component: AZDesignersComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'azstyles',
        component: AzstylesComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'ordersuccess/:id',
        component: OrderSuccessComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'faq',
        component: FaqComponent,
        canActivate: [AppGuard],
      },
      {
        path: 'how-it-works',
        component: HowItWorksComponent,
        canActivate: [AppGuard],
      },
      {
        matcher: (url: UrlSegment[]) => {
          if (url.length > 0 && ['account', 'konto', 'compte', 'cuenta'].includes(url[0].path)) {
            return { consumed: [url[0]] };
          }

          return null;
        },
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      },
      {
        matcher: (url: UrlSegment[]) => {
          if (
            url.length > 0
            && [
              // English
              // Danish
              // German
              // Swedish
              // French
              // Spanish
              // Italian
              ...[
                'customer-care',
                'kundeservice',
                'kundendienst',
                'kundtjänst',
                'service-clientèle',
                'atención-cliente',
                'servizio-clienti',
              ],
              ...[
                'authenticity',
                'autenticitet',
                'authentizität',
                'äkthet',
                'authenticité',
                'autenticidad',
                'autenticità',
              ],
              ...['payment', 'betaling', 'zahlung', 'betalning', 'paiement', 'pago', 'pagamento'],
              ...['delivery', 'levering', 'versand', 'leverans', 'livraison', 'entrega', 'consegna'],
              ...['returns', 'retur', 'retouren', 'returer', 'retours', 'devoluciones', 'resi'],
              ...[
                'terms-and-conditions',
                'handelsbetingelser',
                'allgemeine-geschäftsbedingungen',
                'allmänna-villkor',
                'conditions-générales',
                'términos-condiciones',
                'termini-condizioni',
              ],
              ...[
                'privacy-policy',
                'privatlivspolitik',
                'datenschutzbestimmungen',
                'integritetspolicy',
                'politique-de-confidentialité',
                'política-privacidad',
                'politica-privacy',
              ],
            ].includes(url[0].path)
          ) {
            return { consumed: [url[0]] };
          }

          return null;
        },
        component: HelpAndSupportComponent,
        canActivate: [AppGuard],
      },
      ...staticRoutes,
      ...listingViewElkRoutes,
      ...listingViewRoutes,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

  // Temporary solution until "The Archive" is migrated to Angular
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
  ],
})
export class DefaultRoutingModule {}
