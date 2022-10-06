import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductApproval } from '@schemas/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs/operators';
import { LoaderService } from '@services/app/loader.service';
import { ProductService } from '@services/product.service';
import { Observable, Subscription } from 'rxjs';
import { CommissionRate, ProductApprovalService } from '@services/product-approval.service';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import UserHelper from '@shared/helpers/user-helper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-price-drop',
  templateUrl: './price-drop.component.html',
  styleUrls: ['./price-drop.component.scss'],
})
export class PriceDropComponent implements OnInit, OnDestroy {
  public product: ProductApproval;
  public productDropPriceForm: FormGroup;
  private oldPrice: any = 0;
  public confirmed = false;
  public errorMessage: string;
  private commissionRateSub$: Subscription;
  private user: UserData;

  constructor(
    public dialogRef: MatDialogRef<PriceDropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
    private productApprovalService: ProductApprovalService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.product = this.data?.data?.productData;
    this.setupForm();
    this.user = this.userService.getUserData().getValue();
  }

  ngOnDestroy(): void {
    this.commissionRateSub$?.unsubscribe();
  }

  private setupForm(): void {
    this.oldPrice = this.product.regular_price;
    const currentDiscountPrice = this.product.discount_price
      ? this.product.discount_price
      : this.product.regular_price;

    this.productDropPriceForm = this.fb.group({
      cost_of_good: [this.product.cost_of_good, [Validators.required]],
      regular_price: [currentDiscountPrice, [Validators.required, Validators.max(+currentDiscountPrice)]],
    });
    this.productDropPriceForm
      .get('regular_price')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(
        (value: number) => {
          this.onPriceChange(value);
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = 'Something went wrong, please try again';
        }
      );
  }

  public getCommissionRate(regularPrice: number, currencyCode = 'DKK'): void {
    this.spinnerService.show();

    let commissionRateObs$: Observable<CommissionRate>;

    if (UserHelper.isProfessionalSellerRole(this.user)) {
      commissionRateObs$ = this.productApprovalService.getCommissionRateViaExchange(
        currencyCode,
        regularPrice,
        UserHelper.getUserId(this.user)
      );
    }
    else {
      commissionRateObs$ = this.productApprovalService.getCommissionRateViaExchange(currencyCode, regularPrice);
    }

    this.commissionRateSub$ = commissionRateObs$
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe(
        (commission: CommissionRate) => {
          this.productDropPriceForm?.patchValue({
            cost_of_good: commission[`cost_${currencyCode}`],
          });
        },
        error => {
          this.productDropPriceForm?.patchValue({ cost_of_good: null });
        }
      );
  }

  public onPriceChange($event: any): void {
    if (this.productDropPriceForm) {
      const currencyCode = this.product.base_currency;

      this.getCommissionRate($event, currencyCode);
    }
  }

  public async submitForm(): Promise<void> {
    if (this.productDropPriceForm && !this.productDropPriceForm.invalid && this.product.id) {
      const formData = this.productDropPriceForm.getRawValue();

      this.spinnerService.show();
      const productData = {
        fixed_discount: this.oldPrice - formData.regular_price,
        cost_of_good: formData.cost_of_good,
      };

      this.productService.productPriceDrop(this.product.id, productData).subscribe(
        response => {
          this.confirmed = true;
          this.product.regular_price = formData.regular_price;
          this.product.cost_of_good = formData.cost_of_good;
          this.spinnerService.hide();
        },
        () => {
          this.errorMessage = 'Something went wrong, please try again';
          this.spinnerService.hide();
        }
      );
    }
  }
}
