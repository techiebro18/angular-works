import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.addMetaTags();
  }

  addMetaTags() {
    this.metaService.getListingPageMeta('the-archive', null, null);
  }
}
