import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileService } from '@services/mobile.service';
import { map } from 'rxjs/operators';
import { Output } from '@angular/core';
import { AppService } from '@services/app/app.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'tvb-discount-filter-list',
  templateUrl: './discount-filter-list.component.html',
  styleUrls: ['./discount-filter-list.component.scss', '../custom-instant-search.scss'],
})
export class DiscountFilterListComponent implements OnInit {
  // TVB options
  @Input() public filter: any;
  @Input() public isCollapsed = false;

  @Output() toggleChanged: EventEmitter<string> = new EventEmitter();

  selectedCurrency = 'EUR';
  isHidden = false;
  platform$: Observable<string>;
  items: any;
  discountFilter: any;

  constructor(private mobileService: MobileService, private route: ActivatedRoute, public _appService: AppService) {
    this.platform$ = this.mobileService.isMobile$.pipe(map(isMobile => (isMobile
      ? 'Mobile'
      : 'Desktop')));
  }

  ngOnInit(): void {
    this.discountFilter = this.route.snapshot.queryParamMap.get('discount');
    const currentAppConfiguaration = this._appService.getAppConfigurationValue();

    if (currentAppConfiguaration != null) {
      this.selectedCurrency = currentAppConfiguaration.currencyCode;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.toggleChanged.emit('discount');
    }
  }
}
