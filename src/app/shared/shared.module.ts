import { AccordionComponent } from '@shared/components/accordion/accordion.component';
import { AppDialogComponent } from './components/app-dialog/app-dialog.component';
import { AppShellNoRenderDirective } from './directives/app-shell-no-render.directive';
import { AppShellRenderDirective } from './directives/app-shell-render.directive';
import { CamelToSentenceCasePipe } from './pipes/camel-to-sentence-case.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ClickOutsideDirective } from './directives/click-outside-directive';
import { CommonModule } from '@angular/common';
import { DragDirective } from '@shared/directives/dragDrop.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClient } from '@angular/common/http';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MakeOfferButtonComponent } from './components/make-offer-button/make-offer-button.component';
import { MakeOfferDialogComponent } from './components/make-offer-dialog/make-offer-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { PDPWishlistIconComponent } from './components/pdp-wishlist-icon/pdp-wishlist-icon.component';
import { PaginationService } from 'ngx-pagination';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ProductDetailsHeadingComponent } from './components/product-details-heading/product-details-heading.component';
import { ProductDetailsTabsComponent } from './components/product-details-tabs/product-details-tabs.component';
import { Replace } from './pipes/replace.pipe';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ShippingboxComponent } from './components/shippingbox/shippingbox.component';
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TvbBadgeComponent } from './components/tvb-badge/tvb-badge.component';
import { TvbDialogComponent } from './components/tvb-dialog/tvb-dialog.component';
import { TvbImgFallbackDirective } from './directives/tvb-img-fallback.directive';
import { TvbSellerInformationComponent } from './components/tvb-seller-information/tvb-seller-information.component';
import { TvbStepsComponent } from './components/tvb-steps/tvb-steps.component';
import { UserBioComponent } from './components/user-bio/user-bio.component';
import { ViewCartPopupComponent } from './components/view-cart-popup/view-cart-popup.component';
import { VintageBarDroppableZoneComponent } from './components/vintage-bar-droppable-zone/vintage-bar-droppable-zone.component';
import { WishlistButtonComponent } from './components/wishlist-button/wishlist-button.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MycurrencyPipe } from './custom.currencypipe';
import { SellerCancelDialogComponent } from './components/seller-cancel-dialog/seller-cancel-dialog.component';
import { ShowcaseComponent } from '@shared/components/showcase/showcase.component';
import { CatalogDictionaryPipe } from '@shared/pipes/catalog-dictionary.pipe';

const TVB_DIRECTIVES = [AppShellNoRenderDirective, AppShellRenderDirective, ClickOutsideDirective, DragDirective];
const TVB_COMPONENTS = [
  AppDialogComponent,
  CarouselComponent,
  CheckboxComponent,
  ImageUploaderComponent,
  LoaderComponent,
  MakeOfferButtonComponent,
  MakeOfferDialogComponent,
  MultipleSelectComponent,
  PDPWishlistIconComponent,
  PlaceholderComponent,
  ProductDetailsHeadingComponent,
  ProductDetailsTabsComponent,
  ShippingboxComponent,
  TvbBadgeComponent,
  TvbDialogComponent,
  TvbImgFallbackDirective,
  TvbSellerInformationComponent,
  TvbStepsComponent,
  UserBioComponent,
  ViewCartPopupComponent,
  VintageBarDroppableZoneComponent,
  WishlistButtonComponent,
  ZoomComponent,
  SideMenuComponent,
  AccordionComponent,
  MenuBarComponent,
  SellerCancelDialogComponent,
  ShowcaseComponent,
];
const TVB_PIPES = [CamelToSentenceCasePipe, Replace, SafeHtmlPipe, FilterPipe, MycurrencyPipe, CatalogDictionaryPipe];
const MATERIAL_MODULES = [
  MatSnackBarModule,
  MatStepperModule,
  MatRadioModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
];
const THIRD_PARTY_MODULES = [...MATERIAL_MODULES, NgSelectModule];

@NgModule({
  declarations: [TVB_COMPONENTS, TVB_DIRECTIVES, TVB_PIPES],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ...THIRD_PARTY_MODULES,
  ],
  exports: [
    ...THIRD_PARTY_MODULES,
    ...TVB_COMPONENTS,
    ...TVB_DIRECTIVES,
    ...TVB_PIPES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
    PaginationService,
  ],
})
export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
