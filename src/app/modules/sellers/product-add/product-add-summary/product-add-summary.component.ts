import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApproval } from '@schemas/product/product-approval';
import { NgxSpinnerService } from 'ngx-spinner';
import { StepsService } from '@services/app/steps.service';
import { ProductApprovalService } from '@services/product-approval.service';
import { ProductService } from '@services/product.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { CategoryTypes } from '@shared/enums/category-types.enum';
import { SegmentProductUploadStatusEnum, SegmentProductUploadStepNameEnum } from '@shared/enums/segment.enum';
import '@shared/utils/array.extensions';
import '@shared/utils/string.extensions';
import { finalize } from 'rxjs/operators';
import { UploadConfirmationDialogComponent } from '../dialogs/upload-confirmation-dialog/upload-confirmation-dialog.component';
import { CONDITIONS_MAP } from '../product-add-general/product-add-general.component';
import { ProductAddStepsEnum } from '../product-add.component';

@Component({
  selector: 'tvb-product-add-summary',
  templateUrl: './product-add-summary.component.html',
  styleUrls: ['./product-add-summary.component.scss'],
})
export class ProductAddSummaryComponent implements OnInit {
  public submitted = false;
  public productInformationForm: FormGroup | undefined;
  public productApproval: any = null;
  public countries: any = null;
  public sizes: any = null;
  public colors: any = null;
  public currencies: any = null;
  public errorMessage: string | null | undefined;
  public user: any = null;
  public isValid = false;
  public priceOnSite = 0;
  public priceForYou = 0;
  public material: string = undefined;
  public size: number = undefined;

  private readonly categoriesWithSize = [CategoryTypes.Shoes, CategoryTypes.Clothing, CategoryTypes.Bag];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productApprovalService: ProductApprovalService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private productService: ProductService,
    private dialogService: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private segmentService: SegmentService,
    private stepsService: StepsService
  ) {
    this.dateAdapter.setLocale('en-US');
    this.setupForm();
  }

  ngOnInit(): void {
    this.spinnerService.show();

    const existingProductApprovalId = this.route.snapshot.paramMap.get('id');
    const user: any = this.userService.getUserData().getValue();

    this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.SUMMARY);
    this.stepsService.setStashItem('productApprovalId', existingProductApprovalId);
    this.segmentService.track(SegmentProductUploadStatusEnum.STARTED, {
      step: 4,
      step_name: SegmentProductUploadStepNameEnum.STEP_4,
    });

    if (user) {
      this.userService
        .getUserV2(user.id)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(
          userInfoResponse => {
            if (userInfoResponse.message === 'User Id exists.') {
              this.user = userInfoResponse.user.user[0];
              this.loadData();

              this.productApprovalService
                .get(existingProductApprovalId)
                .pipe(
                  finalize(() => {
                    this.spinnerService.hide();
                  })
                )
                .subscribe(productApprovalData => {
                  this.productApproval = productApprovalData;
                  this.getSize();
                });
            }
          },
          () => {
            this.spinnerService.hide();
          }
        );
    }
    else {
      this.spinnerService.hide();
    }

    this.productInformationForm.get('termsAndConditions').valueChanges.subscribe(checked => {
      if (checked && !this.isAnyPhotoUploaded()) {
        this.errorMessage = 'Please upload at least one photo of your product in order to start selling with us';
      }
      else {
        this.errorMessage = null;
      }
    });
  }

  public async submitForm(): Promise<void> {
    this.submitted = true;

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (this.productInformationForm && !this.productInformationForm.invalid) {
      this.spinnerService.show();

      this.dialogService.open(UploadConfirmationDialogComponent, {
        panelClass: 'seller-contact-confirmation-dialog',
        disableClose: true,
      });

      const productApprovalData = {
        ...this.productApproval,
        regular_price: this.productApproval['regular_price_' + this.productApproval.base_currency],
        approval_status: 'pending',
        commission_user: this.user.id,
        commission_user_emailid: this.user.email,
        stock: 1,
        category_id: this.productApproval.categories.map((category: any) => category.id).join(','),
      };

      const productApprovalDTOObject = this.productApprovalService.toDTO(productApprovalData);

      productApprovalDTOObject.size = null;
      productApprovalDTOObject.shoes_size_id = null;

      this.productApprovalService.update(this.productApproval.id, productApprovalDTOObject).subscribe(
        () => {
          this.sendSegmentTrack();
          this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.SUMMARY);
          this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.SUMMARY);
          this.stepsService.broadcastModelChanges();
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          this.errorMessage = error.message;
          this.scrollToTop();
        }
      );
    }
    else {
      this.scrollToError();
      this.isValid = true;
    }
  }

  public async loadData(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.spinnerService.show();
      const productApproval = await this.productApprovalService.get(productId).toPromise();

      if (productApproval) {
        this.productApproval = productApproval;
        this.countries = await this.productApprovalService.getCountries('EU').toPromise();
        this.populateForm();
        this.setupStepsStatus();
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
        this.router.navigate(['/sellers/product-add/general']);
      }
    }

    this.productService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  private sendSegmentTrack(): void {
    this.segmentService.track(SegmentProductUploadStatusEnum.COMPLETED, {
      brand: this.productApproval.brand_name,
      parent_category: this.productApproval.parent_category,
      category: this.getSubcategoriesNames(this.productApproval),
      condition: this.getCondition(),
      color: this.getColor(),
      material: this.getMaterialName(),
      currency: this.productApproval.base_currency,
      price: this.getPriceOnSite(),
      description: this.productApproval.description,
      images_count: this.getImageCount(),
      step: 4,
      step_name: SegmentProductUploadStepNameEnum.STEP_4,
    });
  }

  private getImageCount(): number {
    return this.productApproval?.media_entities?.length + 1;
  }

  private populateForm(): void {
    this.productInformationForm.patchValue({
      termsAndConditions: this.user.tos,
    });
  }

  private setupForm(): void {
    const formAttributes = {
      termsAndConditions: [false, Validators.requiredTrue],
    };

    this.productInformationForm = this.formBuilder.group(formAttributes);
  }

  public scrollToTop(): void {
    (function smoothScroll(): void {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  public backToPreviousPage(): void {
    this.router.navigate(['/sellers/product-add/images', this.productApproval.id]);
  }

  public scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }

  public scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  public getHeight(): number | null {
    return +this.productApproval?.measurement?.split('x').map(x => +x.replace('cm', ''))[0] || null;
  }

  public getWidth(): number | null {
    return +this.productApproval?.measurement?.split('x').map(x => +x.replace('cm', ''))[1] || null;
  }

  public getDepth(): number | null {
    return +this.productApproval?.measurement?.split('x').map(x => +x.replace('cm', ''))[2] || null;
  }

  public getMaterialName(): string {
    return this.productApproval?.material.filter(x => x.lang === 'en')[0]?.value;
  }

  public getPriceForYou(): number {
    return this.productApproval?.cost.filter(x => x.currency === this.productApproval.base_currency)[0]?.value;
  }

  public getPriceOnSite(): number {
    return this.productApproval?.regular_price.filter(x => x.currency === this.productApproval.base_currency)[0]?.value;
  }

  public getCondition(): string {
    return CONDITIONS_MAP[this.productApproval?.condition_rating]?.toLowerCase();
  }

  public shouldShowSize(): boolean {
    return this.categoriesWithSize.includes(this.productApproval?.main_category?.toUpperCase());
  }

  public getSize(): void {
    switch (this.productApproval?.main_category?.toUpperCase()) {
    case CategoryTypes.Clothing:
      this.productApprovalService.getSizes('clothingsizes').subscribe(sizes => {
        this.size = sizes.find(x => x.id === this.productApproval.clothing_size_id).size;
      });
      break;
    case CategoryTypes.Shoes:
      this.productApprovalService.getSizes('shoesizes').subscribe(sizes => {
        this.size = sizes.find(x => x.id === this.productApproval.shoes_size_id).size;
      });
      break;
    case CategoryTypes.Bag:
      this.productApprovalService.getSizes('bagsizes').subscribe(sizes => {
        this.size = sizes.find(x => x.id === this.productApproval.bag_size_id).size;
      });
      break;
    default:
      break;
    }
  }

  public getColor(): string {
    return this.productApproval?.color?.replace('["', '').replace('"]', '');
  }

  public shouldShowBagMeasurements(): boolean {
    return this.productApproval?.main_category?.toUpperCase() === CategoryTypes.Bag;
  }

  public shouldShowJewelryMeasurements(): boolean {
    return this.productApproval?.main_category?.toUpperCase() === CategoryTypes.Jewelry;
  }

  public getSubcategoriesNames(product: ProductApproval): string {
    return product?.categories.map(c => c.name.replace('-', ' ').capitalize()).makeString('', ', ', '', '.');
  }

  public disableStartSellingButton(): boolean {
    return (
      (this.productInformationForm.controls.termsAndConditions.errors
        && this.productInformationForm.controls.termsAndConditions.errors.required)
      || !this.isAnyPhotoUploaded()
    );
  }

  private isAnyPhotoUploaded(): boolean {
    return this.productApproval?.productUpload || this.productApproval?.media_entities.length > 0;
  }

  private setupStepsStatus(): void {
    this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.SUMMARY);
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.SUMMARY);
    this.stepsService.unmarkIndexAsCompleted(ProductAddStepsEnum.SUMMARY);

    if (this.isAnyPhotoUploaded()) {
      this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.INFO);
      this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.INFO);
      this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.INFO);

      this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.PICTURES);
      this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.PICTURES);
      this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.PICTURES);
    }

    this.stepsService.broadcastModelChanges();
  }
}
