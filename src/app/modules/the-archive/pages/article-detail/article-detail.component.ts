import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { ArticleDetail } from '@schemas/article-detail';
import { TheArchiveService } from '@services/the-archive.service';
import { SegmentService } from '@services/segment.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleDetailComponent implements OnInit {
  public Article: ArticleDetail = null;
  public id_url: string;
  public url_share: string;
  public img_url_share: string;
  public env = environment;
  public baseUrl = environment.baseRemoteUrl;
  public imagrUrl = environment.IMGIX_UPLOADS_URL;
  products: any = [];

  constructor(
    private theArchiveService: TheArchiveService,
    private segment: SegmentService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.route.paramMap.subscribe(params => {
      this.id_url = params.get('description');
      this.url_share = `${environment.baseRemoteUrl}/the-archive/${this.id_url}`;
      this.loadArticle();
    });
  }

  loadArticle(): void {
    this.theArchiveService.getArticle(this.id_url).subscribe(data => {
      this.Article = data;
      this.img_url_share = `${environment.IMGIX_UPLOADS_URL}archive/${this.Article.featured_image}/${this.Article.feature_img_extension}&amp;description=${this.Article.post_title}&amp;url=${this.url_share}`;
      this.getProducts();
      this.addMetaTags(this.Article);
    });
  }

  getProducts() {
    const products = this.Article.sections.filter(x => x.type === 'product');

    products.forEach(item => {
      item.product_detail.forEach(product => {
        if (!this.products.find(x => x.id == product.id)) this.products.push(product);
      });
    });
  }

  addMetaTags(article: ArticleDetail) {
    this.meta.addTags([
      { name: 'description', content: article.meta_description },
      { property: 'og:title', content: article.meta_title },
      { property: 'og:description', content: article.meta_description },
      {
        property: 'og:image',
        content: `${environment.IMGIX_UPLOADS_URL}archive/${this.Article.featured_image}/large/${this.Article.feature_img_extension}`,
      },
      { property: 'og:url', content: this.url_share },
      {
        property: 'twitter:title',
        content: `${article.meta_title} | ${this.Article.category.cat_meta_title}`,
      },
      { property: 'twitter:description', content: article.meta_description },
      { property: 'twitter:url', content: this.url_share },
    ]);
    this.segment.pageView({ name: 'article.meta_title', page_category: 'Archive' });
  }
}
