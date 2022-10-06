import { Component, Inject, Input, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectClearRefinements } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'tvb-clear-refinements',
  templateUrl: './clear-refinements.component.html',
  styleUrls: ['./clear-refinements.component.scss'],
})
export class ClearRefinementsComponent extends BaseWidget {
  public state: {
    // render options
    hasRefinements: boolean;
    refine: Function;
    createURL: Function;
    widgetParams: object;
  };

  @Input() public cssClass: any = 'btn secondary tvb-button clear-refinement-btn';
  @Input() isDesktopButton = false;

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('ClearRefinements');
  }

  ngOnInit() {
    this.createWidget(connectClearRefinements, {
      // instance options
    });
    super.ngOnInit();
  }
}
