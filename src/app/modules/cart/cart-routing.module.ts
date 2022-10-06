import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './components/cartview/cart-view.compnent';
import { CartMainComponent } from './components/cartmain/cart-main.compnent';

const routes: Routes = [
  {
    path: 'view-cart', // cart/
    component: CartMainComponent,
    children: [
      {
        path: '',
        component: CartViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
