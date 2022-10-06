import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CheckoutService } from '@services/checkout/checkout.service';
import { removeDiscount } from 'src/app/state/actions/cart.actions';
import { removeShippingAddress } from 'src/app/state/actions/checkout.actions';
@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss'],
})
export class CheckoutHeaderComponent implements OnInit {
  public trashModel = false;
  constructor(
    private router: Router,
    private _checkoutService: CheckoutService,
    public store: Store<any>
  ) {}

  ngOnInit(): void {}

  openPopUp() {
    this.trashModel = true;
  }

  stayCheckout() {
    this.trashModel = false;
  }

  returnToBag() {
    this.clearInformartion();
    this.router.navigate(['/cart/view-cart']);
  }

  clearInformartion() {
    this._checkoutService.setOrderId(null);
    this._checkoutService.setKlarnaIssue(false);
    this.store.dispatch(removeShippingAddress(null));
    this.store.dispatch(removeDiscount({ discount: 0 }));
  }
}
