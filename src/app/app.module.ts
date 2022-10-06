import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JsonLdModule } from 'ngx-seo';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
import { environment } from '@environments/environment';
import { SharedModule } from './shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TransferHttpCacheModule } from '@nguniversal/common';
import { translateBrowserLoaderFactory } from './shared/loaders/translate-browser.loader';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouteReuseStrategy } from '@angular/router';
import { AppRouteReuseStrategy } from '@core/app-router-reuse-strategy';
import { SellersModule } from './modules/sellers/sellers.module';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { checkoutReducer } from './state/reducers/checkout.reducer';
import { appReducer } from './state/reducers/app.reducer';
import { cartReducer } from './state/reducers/cart.reducer';
import { countryReducer } from './state/reducers/country.reducer';
import { AppGuard } from './core/guards/app.guard';

declare global {
  interface Window {
    analytics: any;
    consentManagerConfig: any;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    SocialLoginModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxSpinnerModule,
    JsonLdModule,
    SellersModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    RecaptchaModule,
    RecaptchaFormsModule,
    ModalModule.forRoot(),
    MatProgressSpinnerModule,
    MatProgressBarModule,
    StoreModule.forRoot({
      appReducer,
      checkoutReducer,
      cartReducer,
      countryReducer,
    }),
    /*StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: false, // Does not pause recording actions and state changes when the extension window is not open
    }),*/
  ],
  providers: [
    ...httpInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FACEBOOK_CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    CookieService,
    BsModalService,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },
    AppGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
