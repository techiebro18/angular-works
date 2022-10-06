import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Article } from '@schemas/article';
import { ScreenDetectorService } from '@services/app/screen-detector.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tvb-popular-articles',
  templateUrl: './popular-articles.component.html',
  styleUrls: ['./popular-articles.component.scss'],
})
export class PopularArticlesComponent implements OnInit {
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() articles: Article[];
  env = environment;
  main_article: Article;
  other_articles: Article[];

  constructor(private screenSizeDetector: ScreenDetectorService) {
    this.isMobile$ = this.screenSizeDetector.isMobile;
  }

  ngOnInit(): void {
    this.main_article = this.articles[0];
    this.other_articles = this.articles.slice(1, 5);
  }
}
