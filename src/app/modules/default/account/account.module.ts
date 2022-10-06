import { NgModule } from '@angular/core';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ItemsForSaleComponent } from './account-settings/my-items/items-for-sale/items-for-sale.component';
import { DraftItemsComponent } from './account-settings/my-items/draft-items/draft-items.component';
import { PendingItemsComponent } from './account-settings/my-items/pending-items/pending-items.component';
import { RefusedItemsComponent } from './account-settings/my-items/refused-items/refused-items.component';
import { SoldItemsComponent } from './account-settings/my-items/sold-items/sold-items.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { OrdersComponent } from './account-settings/orders/orders.component';
import { AddressComponent } from './account-settings/address/address.component';
import { AccountDetailsComponent } from './account-settings/account-details/account-details.component';
import { EmailNotificationsComponent } from './account-settings/email-notifications/email-notifications.component';
import { WaitlistComponent } from './account-settings/waitlist/waitlist.component';
import { PriceDropComponent } from './account-settings/dialogs/price-drop/price-drop.component';
import { GetPaidComponent } from './account-settings/get-paid/get-paid.component';
import { AddressAddComponent } from './account-settings/address/address-add/address-add.component';
import { SoldItemTravelLineComponent } from './account-settings/my-items/sold-items/sold-item-travel-line/sold-item-travel-line.component';
import { SearchCriteriaComponent } from './account-settings/dialogs/search-criteria/search-criteria.component';
import { DateRangePickerComponent } from '@shared/components/date-range-picker/date-range-picker.component';
import { ProductItemEditDialogComponent } from './account-settings/dialogs/product-item-edit-dialog/product-item-edit-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WaitlistProductsComponent } from './account-settings/waitlist-products/waitlist-products.component';
import { NgAisModule } from 'angular-instantsearch';
import { MyOrdersComponent } from './account-settings/my-orders/my-orders.component';
import { MyOrdersDetailsComponent } from './account-settings/my-orders-details/my-orders-details.component';
import { OrderDetailComponent } from './account-settings/my-orders-details/order-detail/order-detail.component';
import { PayoutDetailsComponent } from './account-settings/my-financials/payouts/payout-details/payout-details.component';
import { MyFinancialsComponent } from './account-settings/my-financials/my-financials.component';
import { TransactionsComponent } from './account-settings/my-financials/transactions/transactions.component';
import { PayoutsComponent } from './account-settings/my-financials/payouts/payouts.component';
import { TransactionDetailComponent } from './account-settings/my-financials/transactions/transaction-detail/transaction-detail.component';
import { TvbLayoutModule } from '../../layout/tvb-layout.module';
import { CatalogModule } from '../../catalog/catalog.module';
import { ResellForFreeDialogComponent } from './account-settings/dialogs/resell-for-free-dialog/resell-for-free-dialog.component';
import { MyWishlistComponent } from './account-settings/my-wishlist/my-wishlist.component';
import { MyOffersComponent } from './account-settings/my-offers/my-offers.component';
import { OfferAuthGuard } from '@core/guards/offer-auth.guard';
import { CounterOfferDialogComponent } from '@shared/components/counter-offer-dialog/counter-offer-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OffersHistoryComponent } from './account-settings/my-offers/offers-history/offers-history.component';
import { OffersHistoryRowComponent } from './account-settings/my-offers/offers-history/offers-history-row/offers-history-row.component';
import { OffersButtonsBarComponent } from './account-settings/my-offers/offers-button-bar/offers-buttons-bar.component';
import { PriceDropReductionsComponent } from './account-settings/price-drop-reductions/price-drop-reductions.component';
import { OffersHistoryDialogComponent } from './account-settings/my-offers/offers-history-dialog/offers-history-dialog.component';
import { CounterOfferFormComponent } from './account-settings/counter-offer-form/counter-offer-form.component';
import { MyItemsDeleteDialogComponent } from './account-settings/dialogs/my-items-delete-dialog/my-items-delete-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AcceptTermsComponent } from './account-settings/accept-terms/accept-terms.component';
import { MyAgreementsComponent } from './account-settings/my-agreements/my-agreements.component';

const OFFERS_COMPONENTS = [
  MyOffersComponent,
  CounterOfferDialogComponent,
  OffersHistoryComponent,
  OffersHistoryRowComponent,
  OffersButtonsBarComponent,
  OffersHistoryDialogComponent,
  CounterOfferFormComponent,
];

const MY_ITEMS_COMPONENTS = [
  ItemsForSaleComponent,
  DraftItemsComponent,
  PendingItemsComponent,
  RefusedItemsComponent,
  SoldItemsComponent,
  MyItemsDeleteDialogComponent,
];

@NgModule({
  declarations: [
    ...OFFERS_COMPONENTS,
    ...MY_ITEMS_COMPONENTS,
    AccountSettingsComponent,
    OrdersComponent,
    AddressComponent,
    AccountDetailsComponent,
    EmailNotificationsComponent,
    WaitlistComponent,
    PriceDropComponent,
    GetPaidComponent,
    AddressAddComponent,
    SoldItemTravelLineComponent,
    SearchCriteriaComponent,
    DateRangePickerComponent,
    ProductItemEditDialogComponent,
    WaitlistProductsComponent,
    MyOrdersComponent,
    MyOrdersDetailsComponent,
    OrderDetailComponent,
    PayoutDetailsComponent,
    MyFinancialsComponent,
    TransactionsComponent,
    PayoutsComponent,
    TransactionDetailComponent,
    ResellForFreeDialogComponent,
    MyWishlistComponent,
    PriceDropReductionsComponent,
    AcceptTermsComponent,
    MyAgreementsComponent,
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
    DragDropModule,
    NgAisModule,
    CatalogModule,
    TvbLayoutModule,
    NgxPaginationModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSpinnerModule,
  ],
  providers: [OfferAuthGuard],
})
export class AccountModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
