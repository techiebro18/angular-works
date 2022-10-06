import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { LoaderService } from '@services/app/loader.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductApproval } from '@schemas/product/product-approval';
import { ConfigService } from '@services/app/config.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-resell-for-free-dialog',
  templateUrl: './resell-for-free-dialog.component.html',
  styleUrls: ['./resell-for-free-dialog.component.scss'],
})
export class ResellForFreeDialogComponent implements OnInit {
  private productData: {
    price: number;
    currency: string;
    id: string | number;
    name: string;
    commission_user;
    regular_price;
    cost_of_good;
    product_id: string;
    order_id;
    order_item_id;
    base_currency;
  };
  public product: ProductApproval;
  public resellForFreeForm: FormGroup;
  public errorMessage: string;
  public submitted = false;
  public response = false;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private loaderService: LoaderService,
    private configService: ConfigService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productData = this.data?.data;
    this.user = this.userService.getUserData();
    this.setupForm();
  }

  private setupForm(): void {
    const commission = this.configService.resellForFReeTVBComssionPercent;

    this.resellForFreeForm = this.formBuilder.group({
      item: [this.productData.name, Validators.required],
      price_on_site: [this.productData.price, Validators.required],
      tvb_commission: [commission, Validators.required],
      final_price: [this.productData.price, Validators.required],
      tos: [0, Validators.requiredTrue],
    });
  }

  public submitForm(): void {
    this.submitted = true;
    this.loaderService.triggerLoading.emit(true);

    if (!this.resellForFreeForm.invalid) {
      // const formData = this.resellForFreeForm.getRawValue();
      const formData = new FormData();

      formData.append('commission_user', this.productData.commission_user);
      formData.append('regular_price', this.productData.regular_price);
      formData.append('cost_of_good', this.productData.regular_price);
      formData.append('id', this.productData.product_id);
      formData.append('order_id', this.productData.order_id);
      formData.append('order_item_id', this.productData.order_item_id);
      formData.append('user_id', this.user.value.id);
      formData.append('base_currency', this.productData.base_currency);

      this.productService.reSellProduct(formData).subscribe(
        response => {
          this.loaderService.triggerLoading.emit(false);
          this.response = true;
          this.errorMessage = response.message;
        },
        () => {
          this.response = true;
          this.loaderService.triggerLoading.emit(false);
          this.errorMessage = 'Something went wrong , please try again later';
        }
      );
    }
  }
}
