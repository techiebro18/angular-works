import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductAddGeneralComponent } from './product-add-general/product-add-general.component';
import { ProductAddImagesComponent } from './product-add-images/product-add-images.component';
import { ProductAddComponent } from './product-add.component';
import { ProductAddVerificationFieldsComponent } from './product-add-verification-fields/product-add-verification-fields.component';
import { ProductAddSummaryComponent } from './product-add-summary/product-add-summary.component';
import { ProductUploadGuard } from '@core/guards/product-upload.guard';
import { ProductAddGetPaidComponent } from './product-add-get-paid/product-add-get-paid.component';

const PRODUCT_ADD_ROUTING = [
  {
    path: '',
    component: ProductAddComponent,
    children: [
      {
        path: 'general',
        component: ProductAddGeneralComponent,
      },
      {
        path: 'general/:id',
        component: ProductAddGeneralComponent,
        canActivate: [ProductUploadGuard],
      },
      {
        path: 'images/:id',
        component: ProductAddImagesComponent,
        canActivate: [ProductUploadGuard],
      },
      {
        path: 'get-paid/:id',
        component: ProductAddGetPaidComponent,
        canActivate: [ProductUploadGuard],
      },
      {
        path: 'summary/:id',
        component: ProductAddSummaryComponent,
        canActivate: [ProductUploadGuard],
      },
      {
        path: 'verify-account',
        component: ProductAddVerificationFieldsComponent,
      },
      {
        // TODO: path /product-add should redirect to correct route
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRODUCT_ADD_ROUTING)],
  exports: [RouterModule],
})
export class ProductAddRoutingModule {}
