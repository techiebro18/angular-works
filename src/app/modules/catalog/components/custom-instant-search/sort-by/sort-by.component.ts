import { AfterViewChecked, Component, DoCheck, Inject, Input, OnChanges, forwardRef } from '@angular/core';
import { FilterService } from '@services/common/filter.service';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSortBy } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'tvb-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
})
export class SortByComponent extends BaseWidget {
  // instance options
  @Input() public items: { value: string; label: string }[];

  public state: {
    options: { label: string; value: string }[];
    currentRefinement: string;
    hasNoResults: boolean;
    refine: Function;
    widgetParams: object;
  };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private filterService: FilterService
  ) {
    super('SortBy');
  }

  ngOnInit(): void {
    this.createWidget(connectSortBy, {
      // instance options
      items: this.items,
    });
    super.ngOnInit();
  }

  updateState = (state, isFirstRendering) => {
    if (isFirstRendering) {
      return Promise.resolve(null).then(() => {
        this.state = state;
        this.loadSortBy();
      });
    }

    return null;
  };

  loadSortBy() {
    this.filterService?.sortBy.subscribe(data => {
      if (data) {
        this.state.currentRefinement = data;
        this.state.refine(data);
      }
    });
  }

  onchangeSortBy(event) {
    // ignore filter/search event
    if (event) {
      this.filterService.setSortBy(event);
      this.state.refine(event);
    }
  }
}
