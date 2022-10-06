import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfiguration } from '@schemas/app.interface';
import { SearchService } from '@services/search/search.service';

@Component({
  selector: 'tvb-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss'],
})
export class FilterBoxComponent implements OnInit {
  @Input() filterName: string;
  @Input() title: string;
  @Input() inputPlaceholder: string;
  @Input() options: any[] = [];
  @Input() appConfig: AppConfiguration;
  @Input() isQuickSearchable = false;
  @Output() toggleSectionOption: EventEmitter<{ name: string; value: string }> = new EventEmitter();
  isExpanded = true;
  quickSearchResultOptions: any[] = [];
  visibleOptions: any[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.visibleOptions = this.options;
  }

  toggleSection(): void {
    this.isExpanded = !this.isExpanded;
  }

  onToggleSectionOption(optionName: string, optionValue: string): void {
    this.toggleSectionOption.emit({ name: optionName, value: optionValue });
  }

  shouldBeCheckboxChecked(filterName: string, itemValue: string): boolean {
    if (!itemValue) return false;

    const filterValues = this.searchService.searchRequest.value.filters.filter(
      filter => filter.field === filterName.toLowerCase()
    );

    return !!filterValues.find(filter => filter.value.toLowerCase() === itemValue.toLowerCase());
  }

  onQuickSearch(term: string) {
    this.quickSearchResultOptions = this.options.filter((option: any) =>
      option[this.filterName + '_url_' + this.appConfig.languageShortName].toLowerCase().includes(term.toLowerCase())
    );

    this.visibleOptions =
      !!term && this.quickSearchResultOptions?.length > 0 ? this.quickSearchResultOptions : this.options;
  }
}
