import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SellersRoutingModule } from './sellers-routing.module';
import { SellersComponent } from './sellers.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SellersAuthGuard } from '@core/guards/sellers-auth.guard';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { ProductUploadGuard } from '@core/guards/product-upload.guard';

@NgModule({
  declarations: [SellersComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SellersRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  providers: [SellersAuthGuard, ProductUploadGuard],
})
export class SellersModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
