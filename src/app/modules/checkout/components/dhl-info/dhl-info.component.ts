import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dhl-info',
  templateUrl: './dhl-info.component.html',
  styleUrls: ['./dhl-info.component.scss'],
})
export class DhlInfoComponent implements OnInit {
  public shippingModal = false;

  constructor() {}

  ngOnInit(): void {}

  openShippingInfo() {
    this.shippingModal = true;
  }

  hideShipPop() {
    this.shippingModal = false;
  }
}
