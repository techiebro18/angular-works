import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeViewComponent } from './pages/home-view/home-view.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopoverComponent } from './components/popover/popover.component';
import { AZDesignersComponent } from './pages/azdesigners/azdesigners.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { OrderSuccessDetailComponent } from './pages/order-success/order-detail/order-success-detail.component';
import { OrderSuccessDetailMobileComponent } from './pages/order-success/order-detail-mobile/order-success-detail-mobile.component';
import { SellersAuthGuard } from '@core/guards/sellers-auth.guard';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SignupComponent } from './components/signup/signup.component';
import { TvbLayoutModule } from '../layout/tvb-layout.module';
import { CatalogModule } from '../catalog/catalog.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { HelpAndSupportComponent } from './static/help-and-support/help-and-support.component';
import { CommunityCareComponent } from './static/help-and-support/community-care/community-care.component';
import { MoreInfoComponent } from './static/help-and-support/authenticity/more-info/more-info.component';
import { AuthProcessComponent } from './static/help-and-support/authenticity/auth-process/auth-process.component';
import { PricesAndPaymentsComponent } from './static/help-and-support/payment/prices-and-payments/prices-and-payments.component';
import { PayingInstallmentsComponent } from './static/help-and-support/payment/paying-installments/paying-installments.component';
import { ShippingComponent } from './static/help-and-support/delivery/shipping/shipping.component';
import { TrackingComponent } from './static/help-and-support/delivery/tracking/tracking.component';
import { CarrierComponent } from './static/help-and-support/delivery/carrier/carrier.component';
import { QualityGuaranteeComponent } from './static/help-and-support/delivery/quality-guarantee/quality-guarantee.component';
import { ProSellersComponent } from './static/help-and-support/returns/pro-sellers/pro-sellers.component';
import { PrivateSellersComponent } from './static/help-and-support/returns/private-sellers/private-sellers.component';
import { RefundsComponent } from './static/help-and-support/returns/refunds/refunds.component';
import { ReturnPolicyForGiftsComponent } from './static/help-and-support/returns/return-policy-for-gifts/return-policy-for-gifts.component';
import { TermsAndConditionsComponent } from './static/help-and-support/terms-and-conditions/terms-and-conditions.component';
import { InfoDataProcessorComponent } from './static/help-and-support/privacy-policy/info-data-processor/info-data-processor.component';
import { CookiePolicyComponent } from './static/help-and-support/privacy-policy/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './static/help-and-support/privacy-policy/privacy-policy.component';
import { CareersComponent } from './static/careers/careers.component';
import { AzstylesComponent } from './pages/azstyles/azstyles.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { ProductSpotlightComponent } from './pages/home-view/we-love/product-spotlight/product-spotlight.component';
import { CampaignCardComponent } from './pages/home-view/campaigns/campaign-card/campaign-card.component';
import { MembersAccordionComponent } from './pages/home-view/campaigns/community-member/members-accordion/members-accordion.component';
import { ForYourBudgetComponent } from './pages/home-view/for-your-budget/for-your-budget/for-your-budget.component';
import { NewArrivalsComponent } from './pages/home-view/campaigns/new-arrivals/new-arrivals.component';
import { PopularArticlesComponent } from './pages/home-view/the-archive/popular-articles/popular-articles.component';

const HELP_AND_SUPPORT_COMPONENTS = [
  HelpAndSupportComponent,
  CommunityCareComponent,
  AuthProcessComponent,
  MoreInfoComponent,
  PricesAndPaymentsComponent,
  PayingInstallmentsComponent,
  ShippingComponent,
  TrackingComponent,
  CarrierComponent,
  QualityGuaranteeComponent,
  ProSellersComponent,
  PrivateSellersComponent,
  RefundsComponent,
  ReturnPolicyForGiftsComponent,
  TermsAndConditionsComponent,
  PrivacyPolicyComponent,
  InfoDataProcessorComponent,
  CookiePolicyComponent,
];

@NgModule({
  declarations: [
    DefaultComponent,
    HomeViewComponent,
    PopoverComponent,
    AZDesignersComponent,
    OrderSuccessComponent,
    OrderSuccessDetailComponent,
    OrderSuccessDetailMobileComponent,
    SignupComponent,
    ForgotPasswordComponent,
    CareersComponent,
    FaqComponent,
    HowItWorksComponent,
    ...HELP_AND_SUPPORT_COMPONENTS,
    AzstylesComponent,
    IntroSectionComponent,
    ProductSpotlightComponent,
    CampaignCardComponent,
    MembersAccordionComponent,
    ForYourBudgetComponent,
    NewArrivalsComponent,
    PopularArticlesComponent,
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    MatIconModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CarouselModule,
    TvbLayoutModule,
    CatalogModule,
    NgxPaginationModule,
  ],
  providers: [SellersAuthGuard],
  // exports: [
  //   HelpAndSupportComponent,
  // ],
})
export class DefaultModule {}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
