import { NgModule } from '@angular/core';
import { ProductAddRoutingModule } from './product-add-routing.module';
import { ProductAddGeneralComponent } from './product-add-general/product-add-general.component';
import { ProductAddImagesComponent } from './product-add-images/product-add-images.component';
import { ProductAddComponent } from './product-add.component';
import { SharedModule } from '@shared/shared.module';
import { ProductAddVerificationFieldsComponent } from './product-add-verification-fields/product-add-verification-fields.component';
import { UploadConfirmationDialogComponent } from './dialogs/upload-confirmation-dialog/upload-confirmation-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../default/default.module';
import { HttpClient } from '@angular/common/http';
import { ProductAddSummaryComponent } from './product-add-summary/product-add-summary.component';
import { ProductAddGetPaidComponent } from './product-add-get-paid/product-add-get-paid.component';

@NgModule({
  declarations: [
    ProductAddGeneralComponent,
    ProductAddImagesComponent,
    ProductAddComponent,
    ProductAddVerificationFieldsComponent,
    ProductAddSummaryComponent,
    ProductAddGetPaidComponent,
    UploadConfirmationDialogComponent,
  ],
  imports: [
    ProductAddRoutingModule,
    SharedModule,
    DragDropModule,
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
export class ProductAddModule {}
