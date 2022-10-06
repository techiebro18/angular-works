import { Component, OnInit } from '@angular/core';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('authenticity', 'authenticity_meta_desc', 'More Information');
  }
}
