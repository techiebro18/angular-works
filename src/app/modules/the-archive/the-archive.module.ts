import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheArchiveRoutingModule } from './the-archive-routing.module';
import { TheArchiveComponent } from './the-archive.component';
import { SpotlightComponent } from './components/spotlight/spotlight.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { CategoryComponent } from './pages/category/category.component';
import { SharedModule } from '@shared/shared.module';
import { TvbLayoutModule } from '../layout/tvb-layout.module';

@NgModule({
  declarations: [
    TheArchiveComponent,
    SpotlightComponent,
    HomeComponent,
    ArticleComponent,
    MenuComponent,
    ArticleDetailComponent,
    CategoryComponent,
  ],
  imports: [CommonModule, TheArchiveRoutingModule, TvbLayoutModule, SharedModule],
  exports: [],
})
export class TheArchiveModule {}
