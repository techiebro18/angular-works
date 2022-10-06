import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectPagination } from 'instantsearch.js/es/connectors';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.scss'],
})
export class PlpPaginationComponent extends BaseWidget {
  public state: {
    pages: number[];
    currentRefinement: number;
    nbHits: number;
    nbPages: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    refine: Function;
    createURL: Function;
    widgetParams: Function;
  };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private scroll: ViewportScroller
  ) {
    super('Pagination');
  }
  ngOnInit() {
    this.createWidget(connectPagination, {
      // instance options
    });
    super.ngOnInit();
  }

  clickFunction(page) {
    this.state.refine(page);
    this.scroll.scrollToPosition([0, 0]);
  }

  incrementClick() {
    this.state.refine(this.state.currentRefinement + 1);
    this.scroll.scrollToPosition([0, 0]);
  }

  decrementClick() {
    this.state.refine(this.state.currentRefinement - 1);
    this.scroll.scrollToPosition([0, 0]);
  }
}
