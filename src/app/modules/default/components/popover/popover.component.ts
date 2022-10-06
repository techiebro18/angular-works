import { Component, Input, OnInit } from '@angular/core';

import { environment } from '@environments/environment';
import { finalize } from 'rxjs/operators';
import { PagesService } from '@services/pages.service';
import { LoaderService } from '@services/app/loader.service';
import { MetaService } from '@services/app/meta.service';
import { LdJsonService } from '@services/app/ld-json.service';
import { UniversalService } from '@services/universal.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() product: any;
  @Input() title: any = null;
  @Input() buttonInside = false;
  @Input() bottomTitle = false;
  @Input() cssClass = 'col-lg-6 col-md-6 col-sm-6 product-box';
  // route params:
  public data: any = null;
  public env = environment;
  baseRemoteUrl = '';

  constructor(private universalService: UniversalService) {}

  ngOnInit(): void {
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
  }
}
