import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AddressComponent } from './account-settings/address/address.component';
import { AccountDetailsComponent } from './account-settings/account-details/account-details.component';
import { EmailNotificationsComponent } from './account-settings/email-notifications/email-notifications.component';
import { WaitlistComponent } from './account-settings/waitlist/waitlist.component';
import { WaitlistProductsComponent } from './account-settings/waitlist-products/waitlist-products.component';
import { GetPaidComponent } from './account-settings/get-paid/get-paid.component';
import { AddressAddComponent } from './account-settings/address/address-add/address-add.component';
import { MyOrdersComponent } from './account-settings/my-orders/my-orders.component';
import { MyOrdersDetailsComponent } from './account-settings/my-orders-details/my-orders-details.component';
import { SellersAuthGuard } from '@core/guards/sellers-auth.guard';
import { PayoutDetailsComponent } from './account-settings/my-financials/payouts/payout-details/payout-details.component';
import { MyFinancialsComponent } from './account-settings/my-financials/my-financials.component';
import { TransactionDetailComponent } from './account-settings/my-financials/transactions/transaction-detail/transaction-detail.component';
import { MyWishlistComponent } from './account-settings/my-wishlist/my-wishlist.component';
import { MyOffersComponent } from './account-settings/my-offers/my-offers.component';
import { OfferAuthGuard } from '@core/guards/offer-auth.guard';
import { OffersHistoryComponent } from './account-settings/my-offers/offers-history/offers-history.component';
import { OfferUserPerspectiveEnum } from '@shared/enums/offers.enum';
import { PriceDropReductionsComponent } from './account-settings/price-drop-reductions/price-drop-reductions.component';
import { DraftItemsComponent } from './account-settings/my-items/draft-items/draft-items.component';
import { SoldItemsComponent } from './account-settings/my-items/sold-items/sold-items.component';
import { PendingItemsComponent } from './account-settings/my-items/pending-items/pending-items.component';
import { ItemsForSaleComponent } from './account-settings/my-items/items-for-sale/items-for-sale.component';
import { RefusedItemsComponent } from './account-settings/my-items/refused-items/refused-items.component';
import { AcceptTermsComponent } from './account-settings/accept-terms/accept-terms.component';
import { MyAgreementsComponent } from './account-settings/my-agreements/my-agreements.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent,
    canActivate: [SellersAuthGuard],
    children: [
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'mine-ordrer',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'meine-bestellungen',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'mina-beställningar',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'mes-commandes',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'mis-pedidos',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'i-miei-ordini',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          subTitle: 'view orders',
        },
      },
      {
        path: 'address',
        component: AddressComponent,
        data: {
          title: 'Address Book',
          subTitle: '',
        },
      },
      {
        path: 'address/address-details/:id',
        component: AddressAddComponent,
        data: {
          title: 'Address Details',
          subTitle: '',
        },
      },
      {
        path: 'address/address-add',
        component: AddressAddComponent,
        data: {
          title: 'Address Details',
          subTitle: '',
        },
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'kontodetaljer',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'kontodetails',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'kontouppgifter',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'aperçu-du-compte',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'detalles-cuenta',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'dettagli-account',
        component: AccountDetailsComponent,
        data: {
          title: 'My Details',
          subTitle: null,
        },
      },
      {
        path: 'email-notifications',
        component: EmailNotificationsComponent,
        data: {
          title: 'Notification Settings',
          subTitle: '',
        },
      },
      {
        path: 'waitlist-overview',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'venteliste-oversigt',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'wartelistenübersicht',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'väntelista-översik',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'aperçu-de-la-liste-dattente',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'panorámica-lista-espera',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'riepilogo-lista-attesa',
        component: WaitlistComponent,
        data: {
          title: 'Waitlist',
          subTitle: '',
        },
      },
      {
        path: 'waitlist-overview/products/:id',
        component: WaitlistProductsComponent,
      },
      {
        path: 'get-paid',
        component: GetPaidComponent,
        data: {
          title: 'Get Paid',
          subTitle: 'get_paid_message_1',
        },
      },
      {
        path: 'get-paid/:req_type/:order_id',
        component: GetPaidComponent,
      },
      {
        path: 'order-detail/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: 'ordre-detail/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: 'bestelldetails/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: 'orderdetaljer/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: 'détails-de-la-commande/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: 'detalle-pedido/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: 'dettagli-ordine/:id',
        component: MyOrdersDetailsComponent,
        data: {
          title: 'Order Details',
          subTitle: '',
        },
      },
      {
        path: '',
        redirectTo: 'my-items',
        pathMatch: 'full',
      },
      {
        path: 'my-items/items-for-sale',
        component: ItemsForSaleComponent,
        data: {
          title: 'Items For Sale',
          subTitle: '',
        },
      },
      {
        path: 'my-items/draft',
        component: DraftItemsComponent,
        data: {
          title: 'Draft Items',
          subTitle: '',
        },
      },
      {
        path: 'my-items/items-sold',
        component: SoldItemsComponent,
        data: {
          title: 'Sold Items',
          subTitle: '',
        },
      },
      {
        path: 'my-items/pending',
        component: PendingItemsComponent,
        data: {
          title: 'Pending Items',
          subTitle: '',
        },
      },
      {
        path: 'my-items/refused',
        component: RefusedItemsComponent,
        data: {
          title: 'Refused Items',
          subTitle: '',
        },
      },
      {
        path: 'payout-detail/:id',
        component: PayoutDetailsComponent,
        data: {
          title: 'My Financials',
          subTitle: '',
        },
      },
      {
        path: 'my-financials',
        component: MyFinancialsComponent,
        data: {
          title: 'My Financials',
          subTitle: '',
        },
      },
      {
        path: 'my-financials/transaction-details/:id',
        component: TransactionDetailComponent,
        data: {
          title: 'My Financials',
          subTitle: '',
        },
      },
      {
        path: 'wishlist',
        component: MyWishlistComponent,
        data: {
          title: 'My Wishlist',
          subTitle: '',
        },
      },
      {
        path: 'favoritter',
        component: MyWishlistComponent,
        data: {
          title: 'My Wishlist',
          subTitle: '',
        },
      },
      {
        path: 'lista-de-deseos',
        component: MyWishlistComponent,
        data: {
          title: 'My Wishlist',
          subTitle: '',
        },
      },
      {
        path: 'lista-desideri',
        component: MyWishlistComponent,
        data: {
          title: 'My Wishlist',
          subTitle: '',
        },
      },
      {
        path: 'önskelista',
        component: MyWishlistComponent,
        data: {
          title: 'My Wishlist',
          subTitle: '',
        },
      },
      {
        path: 'wunschzettel',
        component: MyWishlistComponent,
        data: {
          title: 'My Wishlist',
          subTitle: '',
        },
      },
      {
        path: 'my-offers/your-offers',
        pathMatch: 'full',
        component: MyOffersComponent,
        canActivate: [OfferAuthGuard],
        data: {
          title: 'My Offers',
          subTitle: 'Your Offers',
          userPerspective: OfferUserPerspectiveEnum.BUYER,
        },
      },
      {
        path: 'my-offers/received-offers',
        pathMatch: 'full',
        component: MyOffersComponent,
        canActivate: [OfferAuthGuard],
        data: {
          title: 'My Offers',
          subTitle: 'Received Offers',
          userPerspective: OfferUserPerspectiveEnum.SELLER,
        },
      },
      {
        path: 'offers-history',
        component: OffersHistoryComponent,
        data: {
          title: 'Offers History',
          subTitle: '',
        },
        canActivate: [OfferAuthGuard],
      },
      {
        path: 'price-reductions',
        component: PriceDropReductionsComponent,
        data: {
          title: 'Follow Price Reductions',
          subTitle: '',
        },
      },
    ],
  },
  {
    path: 'terms-and-conditions/accept-terms',
    component: AcceptTermsComponent,
    data: {
      title: 'Terms and Conditions',
      subTitle: '',
    },
  },
  {
    path: 'terms-and-conditions/my-agreements',
    component: MyAgreementsComponent,
    data: {
      title: 'My Agreements',
      subTitle: '',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
