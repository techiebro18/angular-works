import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellersComponent } from './sellers.component';
import { ProductUploadGuard } from '@core/guards/product-upload.guard';

const routes: Routes = [
  {
    path: '', // sellers /
    component: SellersComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'product-add',
        loadChildren: () => import('./product-add/product-add.module').then(m => m.ProductAddModule),
        canActivate: [ProductUploadGuard],
      },
      {
        path: '',
        redirectTo: 'product-add',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'product-add',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellersRoutingModule {}
