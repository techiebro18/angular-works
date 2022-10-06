import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { SegmentService } from '@services/segment.service';

@Component({
  selector: 'app-checkout-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class CheckoutLoginComponent implements OnInit {
  @ViewChild('loginTabs', { static: false }) loginTabs?: TabsetComponent;
  loginEvent = false;
  constructor(private authService: AuthService, private router: Router, public segmentService: SegmentService) {}

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.segmentService.trackOnePageUser('Checkout Step Completed', {
        step: 1,
        step_name: 'Login',
        login_method: 'Already Signed In',
      });
      this.router.navigate(['/checkout/shipping-address']);
      console.log('already logged in');
    }
  }

  public loginEventClick(event): void {
    this.loginEvent = event;
  }

  public onLoginNavigationClick(): void {
    this.loginTabs.tabs[1].active = true;
  }
}
