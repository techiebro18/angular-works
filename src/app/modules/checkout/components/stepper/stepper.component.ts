import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input() path = 'login';

  public checkout = {
    paymentMethod: null,
    order: null,
    shippingAddress: null,
  };

  constructor(public authService: AuthService, private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select('checkoutReducer').subscribe(state => {
      this.checkout = state;
    });
  }

  isActiveRoute(route) {
    const routes = ['login', 'shipping-address', 'payment-method', 'review-order'];

    const currentPathIndex = routes.indexOf(this.path);
    const routeIndex = routes.indexOf(route);

    return routeIndex < currentPathIndex;
  }
}
