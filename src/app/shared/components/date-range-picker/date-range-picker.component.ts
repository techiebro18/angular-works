import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit, OnChanges {
  @Output() onSelectValue = new EventEmitter<FormGroup>();
  @Input() dates: any;
  form;
  constructor() {
    this.form = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
  }
  ngOnChanges({ dates: { currentValue, previousValue } }: SimpleChanges): void {
    const { fromDate: fromDatePrev, toDate: toDatePrev } = previousValue || {};
    const { fromDate, toDate } = currentValue || {};

    if (fromDatePrev !== fromDate) {
      this.form.patchValue({ fromDate: fromDate || null });
    }

    if (toDatePrev !== toDate) {
      this.form.patchValue({ toDate: toDate || null });
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res => {
      this.onSelectValue.emit(res);
      // this.controlContainer.control.updateValueAndValidity();
    });
  }
}
