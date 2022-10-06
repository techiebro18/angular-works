import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-auth-process',
  templateUrl: './auth-process.component.html',
  styleUrls: ['./auth-process.component.scss'],
})
export class AuthProcessComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('authenticity', 'authenticity_meta_desc', 'Authentication Process');
  }
}
