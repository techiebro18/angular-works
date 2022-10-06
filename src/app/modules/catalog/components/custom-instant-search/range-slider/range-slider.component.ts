import { Component, Inject, Input, LOCALE_ID, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRange } from 'instantsearch.js/es/connectors';
import { ChangeContext, Options, PointerType } from '@angular-slider/ngx-slider';
import { AppService } from '@services/app/app.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'tvb-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent extends BaseWidget {
  // instance options
  @Input() public attribute: string;
  @Input() public min: number;
  @Input() public max: number;
  @Input() public precision = 0;
  @Input() public pips: boolean;
  @Input() public tooltips: boolean;

  appConfig;

  minValue = 50;
  maxValue = 200;
  options: Options = {
    floor: 0,
    ceil: 250,
  };
  selectedValues = {
    min: '0',
    max: '250',
  };

  public state: {
    start: number[]; // start[0] as the minimum value and start[1] as the maximum value.
    range: {
      min: number;
      max: number;
    };
    refine: Function;
    widgetParams: object;
  };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    @Inject(LOCALE_ID) private locale: string,
    private appService: AppService
  ) {
    super('RangeSlider');

    this.appService.getAppConfigurationObservable().subscribe(appConfig => {
      this.appConfig = appConfig;
    });
  }

  ngOnInit(): void {
    this.createWidget(connectRange, {
      // instance options
      attribute: this.attribute,
      min: this.min,
      max: this.max,
      precision: this.precision,
      pips: this.pips,
      tooltips: this.tooltips,
    });
    super.ngOnInit();
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.state.refine([changeContext.value, changeContext.highValue]);
  }

  formatValue(value) {
    return formatCurrency(
      value,
      this.locale,
      this.appConfig.currencySymbol,
      this.appConfig.currencyCode
    );
  }
}
