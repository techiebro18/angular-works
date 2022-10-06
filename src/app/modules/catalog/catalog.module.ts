import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { TvbLayoutModule } from '../layout/tvb-layout.module';
import { ListingViewComponent } from './pages/listing-view/listing-view.component';
import { NgAisModule } from 'angular-instantsearch';
import { SharedModule } from '@shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetailViewComponent } from './pages/product-detail-view/product-detail-view.component';
import { ImagesCarouselComponent } from '@shared/components/images-carousel/images-carousel.component';
import { HttpClient } from '@angular/common/http';
import { ListingProductsComponent } from './components/listing-products/listing-products.component';
import { RefinmentListComponent } from '../catalog/components/custom-instant-search/refinment-list/refinment-list.component';
import { PlpPaginationComponent } from '../catalog/components/custom-instant-search/app-pagination/app-pagination.component';
import { PriceFilterListComponent } from '../catalog/components/custom-instant-search/price-filter-list/price-filter-list.component';
import { DiscountFilterListComponent } from '../catalog/components/custom-instant-search/discount-filter-list/discount-filter-list.component';
import { RangeSliderComponent } from '../catalog/components/custom-instant-search/range-slider/range-slider.component';
import { CreatealertComponent } from '../catalog/components/createalert/createalert.component';
import { SortByComponent } from '../catalog/components/custom-instant-search/sort-by/sort-by.component';
import { ClearRefinementsComponent } from '../catalog/components/custom-instant-search/clear-refinements/clear-refinements.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NumericMenuComponent } from './components/custom-instant-search/numeric-menu/numeric-menu.component';
import { ConditionDialogComponent } from './components/dialogs/condition-dialog/condition-dialog.component';
import { SellerVisionComponent } from '@shared/components/seller-vision/seller-vision.component';
import { ConditionFilterListComponent } from './components/custom-instant-search/condition-filter-list/condition-filter-list.component';
import { CatalogDictionaryPipe } from '@shared/pipes/catalog-dictionary.pipe';
import { ListingViewElkComponent } from './pages/listing-view-elk/listing-view-elk.component';
import { FiltersSectionComponent } from './components/search/filters-section/filters-section.component';
import { FilterBoxComponent } from './components/search/filters-section/filter-box/filter-box.component';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductDetailViewComponent,
    ImagesCarouselComponent,
    ListingViewComponent,
    ListingProductsComponent,
    RefinmentListComponent,
    PlpPaginationComponent,
    PriceFilterListComponent,
    DiscountFilterListComponent,
    RangeSliderComponent,
    CreatealertComponent,
    SortByComponent,
    ClearRefinementsComponent,
    NumericMenuComponent,
    ConditionDialogComponent,
    SellerVisionComponent,
    ConditionFilterListComponent,
    ListingViewElkComponent,
    FiltersSectionComponent,
    FilterBoxComponent,
  ],
  providers: [CatalogDictionaryPipe],
  imports: [
    CommonModule,
    TvbLayoutModule,
    NgAisModule,
    CarouselModule,
    SharedModule,
    NgxSliderModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    ListingViewComponent,
    ProductDetailViewComponent,
    SortByComponent,
    ListingProductsComponent,
    RefinmentListComponent,
    ClearRefinementsComponent,
    CreatealertComponent,
    PlpPaginationComponent,
    PriceFilterListComponent,
    DiscountFilterListComponent,
    RouterModule,
    SellerVisionComponent,
  ],
})
export class CatalogModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
