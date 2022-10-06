import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { SharedModule } from '@shared/shared.module';
import { MembersComponent } from './pages/members/members.component';
import { TvbLayoutModule } from '../layout/tvb-layout.module';
import { ActiveProductComponent } from './components/product-list/active-product/active-product.component';
import { CatalogModule } from '../catalog/catalog.module';
import { CardMemberComponent } from './components/product-list/card-member/card-member.component';
import { NgAisModule } from 'angular-instantsearch';
import { SoldItemsComponent } from './components/product-list/sold-items/sold-items.component';

@NgModule({
  declarations: [
    CommunityComponent,
    MembersComponent,
    ActiveProductComponent,
    CardMemberComponent,
    SoldItemsComponent,
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    TvbLayoutModule,
    SharedModule,
    CatalogModule,
    NgAisModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [],
})
export class CommunityModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
