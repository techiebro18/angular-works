import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '@environments/environment';
import { Article } from '@schemas/article';
import { TheArchiveService } from '@services/the-archive.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  @Input() category: string;
  public Articles: Array<Article> = new Array<Article>();
  public env: any = environment;
  WeekArticle: Article;

  constructor(private theArchiveService: TheArchiveService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.theArchiveService.getArticles(this.category).subscribe(data => {
      this.Articles = data;
      this.Articles = this.Articles.sort((a, b) => (a.updated_at < b.updated_at
        ? -1
        : 1)).filter(
        x => x.featured_image != null
      );

      if (this.category != null && this.category != '')
        this.Articles = this.Articles.filter(x => x.category.seo_url == this.category);
      else this.Articles = this.Articles.slice(0, this.Articles.length - 6);

      this.Articles = this.Articles.sort((a, b) => (a.updated_at > b.updated_at
        ? -1
        : 1));
    });
    this.theArchiveService.getWeekArticle().subscribe(data => {
      this.WeekArticle = data.week_article;
    });
  }
}
