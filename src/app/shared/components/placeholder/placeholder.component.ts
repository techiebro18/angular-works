import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tvb-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
})
export class PlaceholderComponent implements OnInit {
  constructor() {}

  @Input() rows = 1;

  ngOnInit(): void {}

  rowSequence(rows: number): Array<number> {
    return Array(rows);
  }
}
