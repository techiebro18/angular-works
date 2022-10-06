import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';
import { MakeOfferDialogComponent } from 'src/app/shared/components/make-offer-dialog/make-offer-dialog.component';

@Component({
  selector: 'app-make-offer-button',
  templateUrl: './make-offer-button.component.html',
  styleUrls: ['./make-offer-button.component.scss'],
})
export class MakeOfferButtonComponent implements OnInit {
  @Input() product;
  @Input() language;
  @Input() currency;
  @Input() currencySymbol;
  @Input() offerPercentage;
  @Input() sellerId;
  @Input() position;
  public user$: BehaviorSubject<UserData | null>;
  public user_id: any = null;
  loggedInStatus: any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private dialogService: DialogService,
    public _productService: ProductService,
    public appService: AppService,
    private SpinnerService: NgxSpinnerService,
    private segmentService: SegmentService
  ) {
    this.user$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.loggedInStatus = this.authService.loggedIn;
  }

  openPopup(isSignIn: boolean) {
    this.segmentService.track('Button Clicked', { label: 'make_an_offer' });
    const { id, imgix_image_url } = this.product;

    this.dialogService
      .open(LoginRegisterDialogComponent, {
        isDefaultDialog: true,
        isSignIn,
        prdImg: imgix_image_url,
      })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        if (wasClosedByTheUser) return;
      });
  }

  openOfferPopup() {
    this.segmentService.track('Button Clicked', { label: 'make_an_offer' });
    this.dialogService
      .open(MakeOfferDialogComponent, {
        product: this.product,
        language: this.language,
        currency: this.currency,
        currencySymbol: this.currencySymbol,
        sellerId: this.sellerId,
        offerPercentage: this.offerPercentage,
        position: this.position,
      })
      .afterClosed()
      .subscribe(wasClosedByTheUser => {
        if (wasClosedByTheUser) return;
      });
  }
}
