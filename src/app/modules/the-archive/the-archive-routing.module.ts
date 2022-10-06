import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { TheArchiveComponent } from './the-archive.component';

const routes: Routes = [
  {
    path: '',
    component: TheArchiveComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: ':description',
        component: ArticleDetailComponent,
      },
      {
        path: 'category/:url_category',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheArchiveRoutingModule {}
