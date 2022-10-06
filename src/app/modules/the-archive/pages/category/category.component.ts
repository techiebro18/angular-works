import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public url_category: string;

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.url_category = this.route.snapshot.paramMap.get('url_category');
    this.addMetaTags();
  }

  addMetaTags() {
    this.metaService.getListingPageMeta('the-archive', null, null);
    this.meta.addTags([
      {
        property: 'og:url',
        content: `${environment.baseRemoteUrl}/the-archive/${this.url_category}`,
      },
      {
        property: 'twitter:url',
        content: `${environment.baseRemoteUrl}/the-archive/${this.url_category}`,
      },
    ]);
  }
}
