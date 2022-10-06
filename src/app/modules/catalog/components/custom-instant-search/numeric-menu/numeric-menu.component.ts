import { Component, EventEmitter, Inject, Input, OnInit, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { MobileService } from '@services/mobile.service';
import { map } from 'rxjs/operators';
import { Output } from '@angular/core';
import { AppService } from '@services/app/app.service';
import connectNumericMenu from 'instantsearch.js/es/connectors/numeric-menu/connectNumericMenu';

@Component({
  selector: 'tvb-numeric-menu',
  templateUrl: './numeric-menu.component.html',
  styleUrls: ['./numeric-menu.component.scss'],
})
export class NumericMenuComponent extends BaseWidget {
  @Input() public items: any;
  @Input() public attribute: string;
  @Input() public autoHideContainer = false;

  public state: {
    createURL: Function;
    currentRefinement: string;
    items: {
      label: string;
      value: string;
      isRefined: boolean;
    }[];
    hasNoResults: boolean;
    refine: Function;
    widgetParams: object;
  }; // Rendering options

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('NumericMenu');
  }

  ngOnInit() {
    this.createWidget(connectNumericMenu, {
      // instance options
      attribute: this.attribute,
      items: this.items,
    });
    super.ngOnInit();
  }

  onChangeNumericMenu(value, i) {
    this.state.refine(value);
    this.state.items.forEach(function (el, i) {
      this.state.items[i].isRefined = false;
    });
    this.state.items[i].isRefined = true;
  }
}
