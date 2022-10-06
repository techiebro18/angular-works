import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { MetaService } from '@services/app/meta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
})
export class CareersComponent implements OnInit {
  // route params:
  public env = environment;
  constructor(private _router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('careers', 'careers_meta_desc', 'Careers');
  }
}
