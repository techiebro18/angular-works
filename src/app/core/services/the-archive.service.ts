import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Article } from '@schemas/article';
import { ArticleDetail } from '@schemas/article-detail';

@Injectable({
  providedIn: 'root',
})
export class TheArchiveService {
  constructor(private http: HttpClient) {}

  public getArticles(category: string): Observable<Array<Article>> {
    return this.http.get<Array<Article>>(`${environment.API_V2_URL}blogs/active`);
  }
  public getWeekArticle(): Observable<any> {
    return this.http.get<any>(`${environment.API_V2_URL}blogs/week`);
  }

  public getArticle(url_id: string): Observable<ArticleDetail> {
    return this.http.get<ArticleDetail>(`${environment.API_V2_URL}blogs/${url_id}`);
  }

  public getCategories(): Observable<any> {
    return this.http.get(`${environment.API_V2_URL}blogs/activeCategory`);
  }

  public getSelectedArticles(articles_id: string): Observable<Array<Article>> {
    return this.http.get<Array<Article>>(`${environment.API_V2_URL}blogs/articles/${articles_id}`);
  }
}
