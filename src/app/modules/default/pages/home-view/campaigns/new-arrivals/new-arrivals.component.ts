import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tvb-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
})
export class NewArrivalsComponent implements OnInit {
  @Input() numOfProducts: any;

  constructor() {}

  ngOnInit(): void {}
}
