import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AccordionTopic } from '@shared/components/accordion/accordion.component';
import { filter } from 'rxjs/operators';
import { CommunityCareComponent } from './community-care/community-care.component';
import { MoreInfoComponent } from './authenticity/more-info/more-info.component';
import { AuthProcessComponent } from './authenticity/auth-process/auth-process.component';
import { PricesAndPaymentsComponent } from './payment/prices-and-payments/prices-and-payments.component';
import { PayingInstallmentsComponent } from './payment/paying-installments/paying-installments.component';
import { ShippingComponent } from './delivery/shipping/shipping.component';
import { TrackingComponent } from './delivery/tracking/tracking.component';
import { CarrierComponent } from './delivery/carrier/carrier.component';
import { QualityGuaranteeComponent } from './delivery/quality-guarantee/quality-guarantee.component';
import { ProSellersComponent } from './returns/pro-sellers/pro-sellers.component';
import { PrivateSellersComponent } from './returns/private-sellers/private-sellers.component';
import { RefundsComponent } from './returns/refunds/refunds.component';
import { ReturnPolicyForGiftsComponent } from './returns/return-policy-for-gifts/return-policy-for-gifts.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InfoDataProcessorComponent } from './privacy-policy/info-data-processor/info-data-processor.component';
import { CookiePolicyComponent } from './privacy-policy/cookie-policy/cookie-policy.component';

export interface MenuOption {
  title: string;
  iconPath: string;
  routePath: string;
  active: boolean;
  topics: AccordionTopic[];
}

@Component({
  selector: 'tvb-help-and-support',
  templateUrl: './help-and-support.component.html',
  styleUrls: ['./help-and-support.component.scss'],
})
export class HelpAndSupportComponent implements OnInit {
  activeMenuOption: MenuOption = undefined;
  menuOptions: MenuOption[] = [];
  private iconsBasePath = 'assets/images/icons/help_and_support';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.initMenuOptions();
  }

  ngOnInit(): void {
    // This is only for the first time the component is initiated
    this.setActiveMenuOption(this.router.url.replace('/', ''));

    // This is for subsequent times the route points to this component
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.setActiveMenuOption(event.url.replace('/', ''));
    });
  }

  private setActiveMenuOption(activeRoute: string) {
    if (this.activeMenuOption) {
      this.activeMenuOption.active = false;
    }

    this.activeMenuOption = this.menuOptions.find(_ => _.routePath === activeRoute) || this.menuOptions[0];
    this.activeMenuOption.active = true;
  }

  private initMenuOptions(): void {
    this.menuOptions = [
      {
        title: 'Community Care',
        iconPath: `${this.iconsBasePath}/community_care.svg`,
        routePath: 'customer-care',
        active: false,
        topics: [
          {
            active: true,
            title: 'help_and_support.community_care.title',
            component: CommunityCareComponent,
          },
        ],
      },
      {
        title: 'help_and_support.authenticity.title',
        iconPath: `${this.iconsBasePath}/authenticity.svg`,
        routePath: 'authenticity',
        active: false,
        topics: [
          {
            active: true,
            title: 'help_and_support.authenticity.auth_process.title',
            component: AuthProcessComponent,
          },
          {
            active: false,
            title: 'help_and_support.authenticity.more_info.title',
            component: MoreInfoComponent,
          },
        ],
      },
      {
        title: 'help_and_support.payment.title',
        iconPath: `${this.iconsBasePath}/payment.svg`,
        routePath: 'payment',
        active: false,
        topics: [
          {
            active: true,
            title: 'help_and_support.payment.prices_and_payments.title',
            component: PricesAndPaymentsComponent,
          },
          {
            active: false,
            title: 'help_and_support.payment.paying_in_installments.title',
            component: PayingInstallmentsComponent,
          },
        ],
      },
      {
        title: 'Delivery',
        iconPath: `${this.iconsBasePath}/delivery.svg`,
        routePath: 'delivery',
        active: false,
        topics: [
          {
            active: true,
            title: 'help_and_support.delivery.shipping.title',
            component: ShippingComponent,
          },
          {
            active: false,
            title: 'help_and_support.delivery.tracking.title',
            component: TrackingComponent,
          },
          {
            active: false,
            title: 'help_and_support.delivery.carrier.title',
            component: CarrierComponent,
          },
          {
            active: false,
            title: 'help_and_support.delivery.quality_guarantee.title',
            component: QualityGuaranteeComponent,
          },
        ],
      },
      {
        title: 'help_and_support.returns.title',
        iconPath: `${this.iconsBasePath}/returns.svg`,
        routePath: 'returns',
        active: false,
        topics: [
          {
            active: true,
            title: 'help_and_support.returns.pro_sellers.title',
            component: ProSellersComponent,
          },
          {
            active: false,
            title: 'help_and_support.returns.pvt_sellers.title',
            component: PrivateSellersComponent,
          },
          {
            active: false,
            title: 'help_and_support.returns.refunds.title',
            component: RefundsComponent,
          },
          {
            active: false,
            title: 'help_and_support.returns.return_policy.title',
            component: ReturnPolicyForGiftsComponent,
          },
        ],
      },
      {
        title: 'help_and_support.terms_conditions.title',
        iconPath: `${this.iconsBasePath}/terms_and_conditions.svg`,
        routePath: 'terms-and-conditions',
        active: false,
        topics: [
          {
            active: true,
            title: 'help_and_support.terms_conditions.subtitle',
            component: TermsAndConditionsComponent,
          },
        ],
      },
      {
        title: 'help_and_support.privacy_policy.title',
        iconPath: `${this.iconsBasePath}/privacy_policy.svg`,
        routePath: 'privacy-policy',
        active: false,
        topics: [
          {
            active: true,
            title: 'INFORMATION ABOUT DATA PROCESSOR',
            component: InfoDataProcessorComponent,
          },
          {
            active: false,
            title: 'help_and_support.privacy_policy.title',
            component: PrivacyPolicyComponent,
          },
        ],
      },
    ];
  }
}
