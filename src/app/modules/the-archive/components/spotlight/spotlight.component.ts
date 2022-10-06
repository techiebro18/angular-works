import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '@environments/environment';
import { Article } from '@schemas/article';
import { TheArchiveService } from '@services/the-archive.service';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpotlightComponent implements OnInit {
  public Archives: Array<Article> = new Array<Article>();
  public env = environment;

  constructor(private theArchiveService: TheArchiveService) {}

  ngOnInit(): void {
    this.loadArchive();
  }

  loadArchive(): void {
    this.theArchiveService.getArticles(null).subscribe(data => {
      this.Archives = data;
      this.Archives = this.Archives.sort((a, b) => (a.updated_at < b.updated_at
        ? -1
        : 1)).filter(
        x => x.featured_image != null
      );
      this.Archives = this.Archives.slice(this.Archives.length - 6, this.Archives.length);
      this.Archives = this.Archives.sort((a, b) => (a.updated_at > b.updated_at
        ? -1
        : 1));
    });
  }
}
