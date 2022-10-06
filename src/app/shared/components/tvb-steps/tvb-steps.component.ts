import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface StepItem {
  index?: number;
  id?: string;
  label?: string;
  icon?: string;
  url?: string;
  queryParams?: any;
  spotlight?: boolean; // Whether the step is the current active
  visible?: boolean; // // Whether the step should be shown on the page
  completed?: boolean; // Whether the step was completed successfully
  disabled?: boolean; // Whether should set the step as unclickable and with disabled style
  visited?: boolean; // // Whether the user entered the step but did not complete it
  available?: boolean; // // Whether the step is available to be visited
}

@Component({
  selector: 'tvb-steps',
  templateUrl: './tvb-steps.component.html',
  styleUrls: ['./tvb-steps.component.scss'],
})
export class TvbStepsComponent implements OnInit {
  @Input() steps: StepItem[] = null; // An array of menuitems.
  @Input() activeIndex = 0; // Index of the current active step.
  @Input() readonly = true; // Whether the items are clickable or not.
  @Input() innerTextVisible?: boolean = false; // Whether to show the text inside the circle.
  @Input() style: string = null; // Inline style of the component.
  @Input() styleClass: string = null; // Style class of the component.
  @Output() stepClicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  itemClick(event: any, item: StepItem, index: number): void {
    if (this.readonly || item.disabled) {
      return;
    }

    this.activeIndex = index;

    for (let i = 0; i < this.steps.length; i++) {
      this.steps[i].spotlight = i === index;
    }

    this.stepClicked.emit(item);
  }
}
