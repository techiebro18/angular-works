import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileService } from '@services/mobile.service';
import { map } from 'rxjs/operators';
import { Output } from '@angular/core';
import { AppService } from '@services/app/app.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'tvb-price-filter-list',
  templateUrl: './price-filter-list.component.html',
  styleUrls: ['./price-filter-list.component.scss', '../custom-instant-search.scss'],
})
export class PriceFilterListComponent implements OnInit {
  // TVB options
  @Input() public filter: any;
  @Input() public isCollapsed = false;

  @Output() toggleChanged: EventEmitter<string> = new EventEmitter();

  selectedCurrency = 'EUR';
  isHidden = false;
  platform$: Observable<string>;
  items: any;
  priceFilter: any;

  budgetFilter = {
    EUR: [
      { end: 50, label: 'Under €50' },
      { start: 50, end: 300, label: '€50 - €300' },
      { start: 300, end: 500, label: '€300 - €500' },
      { start: 500, end: 1000, label: '€500 - €1000' },
      { start: 1000, label: 'Over €1000' },
    ],
    DKK: [
      { end: 400, label: 'Under DKK 400' },
      { start: 400, end: 2000, label: 'DKK 400 - DKK 2000 ' },
      { start: 2000, end: 4000, label: 'DKK 2000 - DKK 4000' },
      { start: 4000, end: 7500, label: 'DKK 4000 - DKK 7500' },
      { start: 7500, label: 'Over DKK 7500' },
    ],
    USD: [
      { end: 100, label: 'Under $100' },
      { start: 100, end: 400, label: '$100 - $400' },
      { start: 400, end: 600, label: '$400 - $600' },
      { start: 600, end: 1200, label: '$600 - $1200' },
      { start: 1200, label: 'Over $1200' },
    ],
    SEK: [
      { end: 600, label: 'Under SEK 600' },
      { start: 600, end: 2500, label: 'SEK 600 - SEK 2500' },
      { start: 2500, end: 5500, label: 'SEK 2500 - SEK 5500' },
      { start: 5500, end: 9500, label: 'SEK 5500 - SEK 9500' },
      { start: 9500, label: 'Over SEK 9500' },
    ],
    GBP: [
      { end: 50, label: 'Under £50' },
      { start: 50, end: 300, label: '£50 - £300' },
      { start: 300, end: 500, label: '£300 - £500' },
      { start: 500, end: 1000, label: '£500 - £1000' },
      { start: 1000, label: 'Over £1000' },
    ],
  };

  constructor(private mobileService: MobileService, private route: ActivatedRoute, public appService: AppService) {
    this.platform$ = this.mobileService.isMobile$.pipe(map(isMobile => (isMobile
      ? 'Mobile'
      : 'Desktop')));
  }

  ngOnInit(): void {
    this.priceFilter = this.route.snapshot.queryParamMap.get('price');
    const currentAppConfiguaration = this.appService.getAppConfigurationValue();

    if (currentAppConfiguaration != null) {
      this.selectedCurrency = currentAppConfiguaration.currencyCode;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.toggleChanged.emit('price');
    }
  }
}
