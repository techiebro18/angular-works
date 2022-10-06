import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-total-order-value',
  templateUrl: './total-order-value.component.html',
  styleUrls: ['./total-order-value.component.scss'],
})
export class TotalOrderValueComponent implements OnInit {
  currency = 'USD';
  value = 0;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select('appReducer').subscribe(({ currency }) => (this.currency = currency));
    this.store.select('cartReducer').subscribe(state => {
      if (!state.products.length) {
        this.value = 0;

        return;
      }

      state.products.forEach(({ catalog }) => {
        let price = 0;

        if (catalog.is_discount == 1 && catalog.discount_price.length)
          price = catalog.discount_price.find(({ currency }) => currency === 'EUR').value;
        else if (catalog.regular_price.length)
          price = catalog.regular_price.find(({ currency }) => currency === 'EUR').value;
        else price = 0;

        this.value += price ?? 0;
      });
    });
  }
}
