import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../default/default.module';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './components/cartview/cart-view.compnent';
import { CartMainComponent } from './components/cartmain/cart-main.compnent';
import { TvbLayoutModule } from '../layout/tvb-layout.module';

@NgModule({
  declarations: [CartMainComponent, CartViewComponent],
  exports: [],
  imports: [
    CommonModule,
    CartRoutingModule,
    TvbLayoutModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class CartModule {}
