import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Brand } from '@schemas/brand';
import { Category } from '@schemas/category.interface';
import { ProductColor } from '@schemas/product/color.interface';
import { ProductCurrency } from '@schemas/product/currency.interface';
import { ProductMaterial } from '@schemas/product/material.interface';
import { ProductApproval } from '@schemas/product/product-approval';
import { ClothingSize, ShoeSize } from '@schemas/product/sizes.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { StepsService } from '@services/app/steps.service';
import { BrandService } from '@services/brand.service';
import { CategoryService } from '@services/category.service';
import { ProductApprovalService } from '@services/product-approval.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { SegmentProductUploadStatusEnum, SegmentProductUploadStepNameEnum } from '@shared/enums/segment.enum';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import '@shared/utils/array.extensions';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { ProductAddStepsEnum } from '../product-add.component';

export const CONDITIONS_MAP = {
  1: 'NEW, WITH TAGS',
  2: 'EXCELLENT',
  4: 'GOOD, BUT USED',
  5: 'WORN WITH LOVE',
};

enum ErrorOperationEnum {
  CREATE = 'create',
  UPDATE = 'update',
}

@Component({
  selector: 'app-product-add-general',
  templateUrl: './product-add-general.component.html',
  styleUrls: ['./product-add-general.component.scss'],
})
export class ProductAddGeneralComponent implements OnInit, OnDestroy {
  public user;
  public availableCategories: Category[] = [];
  public availableSubcategories: Category[] = [];
  public availableDesigners: Brand[] = [];
  public isFormSubmitted = false;
  public productForm: FormGroup | undefined;
  public productApproval: ProductApproval = null;
  public materials: ProductMaterial[] = null;
  public sizes: any[] = null;
  public colors: ProductColor[] = null;
  public currencies: ProductCurrency[] = null;
  public serialNoDetails = false;
  public productCreateErrorMessage: string | null = null;
  public productUpdateErrorMessage: string | null = null;
  public currentSizeType: string = null;

  // Subscriptions
  private dropdownLoadersSub$: Subscription;
  private submitActionSub$: Subscription;
  private formCategorySub$: Subscription;
  private formPriceSub$: Subscription;
  private commissionRateProSellerSub$: Subscription;
  private commissionRateSub$: Subscription;
  private sizeIdentifierSub$: Subscription;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productApprovalService: ProductApprovalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private brandService: BrandService,
    private translateService: TranslateService,
    private segmentService: SegmentService,
    private stepsService: StepsService
  ) {
    this.user = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.INFO);
    this.startSegmentTrack();
    this.bootstrap();
  }

  startSegmentTrack() {
    this.segmentService.track(SegmentProductUploadStatusEnum.STARTED, {
      step: 1,
      step_name: SegmentProductUploadStepNameEnum.STEP_1,
    });
  }

  public bootstrap(): void {
    this.spinnerService.show();

    this.initForm();

    const categories$ = this.categoryService.getCategories();
    const designers$ = this.brandService.getAllDesigners();
    const materials$ = this.productApprovalService.getMaterials();
    const colors$ = this.productApprovalService.getColors();
    const currencies$ = this.productApprovalService.getCurrencies();
    const sizeIdentifier$ = this.getSizeSubscriber();

    const subscriptions$ = [categories$, designers$, materials$, colors$, currencies$];

    if (sizeIdentifier$) {
      subscriptions$.push(sizeIdentifier$);
    }

    this.dropdownLoadersSub$ = combineLatest(subscriptions$)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe(
        ([categories, designers, materials, colors, currencies, sizes]) => {
          this.availableCategories = categories;
          this.availableDesigners = designers;
          this.materials = materials;
          this.colors = colors;
          this.currencies = currencies;

          if (sizes) {
            this.sizes = sizes;
          }

          this.setupFormTriggers();
          this.loadDataForExistingProductApproval();

          this.spinnerService.hide();
        },
        error => {
          this.showErrorMessage(ErrorOperationEnum.UPDATE, error.message);
        }
      );
  }

  public async submitForm(): Promise<void> {
    this.hideErrorMessage();
    this.isFormSubmitted = true;

    if (this.productForm && this.productForm.valid) {
      this.spinnerService.show();

      const formData = this.productForm.getRawValue();
      const categoryName = this.availableCategories.find(x => x.id === this.productForm.get('category').value).name;

      const productApprovalData = {
        ...this.productApproval, // data from pre-existing ProductApproval object (in case of editing draft)
        ...formData, // all the data of the form
        approval_status: 'draft',
        brand_id: this.productForm.get('brand_id').value, // this is about the select Designer
        category_id: this.productForm.get('subcategories').value, // this is about the selected subcategories
        commission_user_emailid: this.user.getValue()?.email,
        commission_user_type:
          this.user.getValue()?.role_id === UserRolesEnum.PROFESSIONAL_SELLER
            ? 'professional'
            : 'private',
        commission_user: this.user.getValue()?.id,
        commission: 'yes',
        condition_rating: this.productForm.get('condition_rating').value,
        deleted: 'no',
        description: this.productForm.get('description_text').value,
        main_category: categoryName,
        measurement: this.getFormMeasurement(formData),
        parent_category: categoryName,
        ready_for_approval: 'no',
        sku: new Date().getTime(),
        status: 'active',
        stock: 1,
      };

      const productApprovalDTO = this.productApprovalService.toDTO(productApprovalData);
      let submitAction$: Observable<any>;

      if (this.productApproval?.id) {
        submitAction$ = this.productApprovalService.update(this.productApproval.id, productApprovalDTO);
      }
      else {
        submitAction$ = this.productApprovalService.create(productApprovalDTO);
      }

      this.submitActionSub$ = submitAction$.subscribe(
        response => {
          this.sendSegmentTrack(formData);
          this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.INFO);
          this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.INFO);
          this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.PICTURES);
          this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.PICTURES);
          this.stepsService.broadcastModelChanges();
          this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.PICTURES);
          this.router.navigate([`/sellers/product-add/images/${response.data.id}`]);
        },
        error => {
          this.spinnerService.hide();
          this.showErrorMessage(ErrorOperationEnum.UPDATE, error.message);
        }
      );
    }
    else {
      this.scrollToError();
    }
  }

  private sendSegmentTrack(formData: any): void {
    this.segmentService.track(SegmentProductUploadStatusEnum.STEP_COMPLETED, {
      step_name: SegmentProductUploadStepNameEnum.STEP_1,
      step: 1,
      brand: this.availableDesigners.find(b => b.id === formData.brand_id).name,
      parent_category: this.availableCategories.find(c => c.id === formData.category).name,
      category: this.availableSubcategories
        .filter(s => formData.subcategories.includes(s.id))
        .map(_ => _.name)
        .makeString('', ', ', '', '.'),
      condition: CONDITIONS_MAP[formData.condition_rating],
      color: this.colors.find(_ => _.id === formData.color_id).color_en,
      material: this.materials.find(_ => _.id === formData.material_id).name_en,
      currency: formData.base_currency,
      price: formData.regular_price,
      description: formData.description_text,
    });
  }

  private initForm(): void {
    const preferredCurrency = this.user.getValue()?.preferredCurrencyName || 'EUR';

    this.productForm = this.formBuilder.group({
      category: [undefined, Validators.required],
      subcategories: [[]],
      brand_id: [undefined, Validators.required],
      color_id: ['', Validators.required],
      material_id: ['', Validators.required],
      base_currency: [preferredCurrency, Validators.required],
      description_text: ['', Validators.required],
      condition_rating: ['', Validators.required],
      price: [null],
      cost_of_good: [{ value: null, disabled: false }, [Validators.required, Validators.min(1)]],
      regular_price: [{ value: null, disabled: false }, [Validators.required, Validators.min(1)]],
      serial_number: [''],
      measurement_height: [''],
      measurement_width: [''],
      measurement_depth: [''],
    });
  }

  private async setupFormTriggers(): Promise<void> {
    this.formCategorySub$ = this.productForm.get('category').valueChanges.subscribe(newCategoryId => {
      if (newCategoryId) {
        const categoryObj = this.availableCategories.find(c => c.id === newCategoryId);

        this.productForm.get('subcategories').reset();
        this.loadSubcategoriesByCategory(categoryObj.id);
        this.handleSizeIdentifier(categoryObj.name);
        this.handleMeasurementControls(categoryObj.name);
      }
    });

    this.formPriceSub$ = this.productForm
      .get('price')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(
        (value: number) => {
          this.onPriceChange(value);
        },
        error => {
          this.showErrorMessage(ErrorOperationEnum.UPDATE, error.message);
        }
      );
  }

  private async loadDataForExistingProductApproval(): Promise<void> {
    const productApprovalId = this.route.snapshot.paramMap.get('id');

    if (productApprovalId) {
      this.stepsService.setStashItem('productApprovalId', productApprovalId);
      const existingProductApproval: ProductApproval = await this.productApprovalService
        .get(productApprovalId)
        .toPromise();

      this.handleSizeIdentifier(existingProductApproval.main_category);

      if (existingProductApproval) {
        this.productApproval = existingProductApproval;
        this.setupFormForExistingProduct();
        this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.PICTURES);
        this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.PICTURES);

        // That's how we know that if Step 1 and/or Step 2 were already completed in another moment
        if (this.productApproval.image_link || this.productApproval.media_entities?.length > 0) {
          this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.INFO);
          this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.GET_PAID);

          this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.INFO);
          this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.GET_PAID);

          this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.INFO);
          this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.PICTURES);
        }
        else {
          this.stepsService.markIndexAsDisabled(ProductAddStepsEnum.GET_PAID);
          this.stepsService.unmarkIndexAsAvailable(ProductAddStepsEnum.GET_PAID);
          this.stepsService.unmarkIndexAsCompleted(ProductAddStepsEnum.GET_PAID);
          this.stepsService.markIndexAsDisabled(ProductAddStepsEnum.SUMMARY);
          this.stepsService.unmarkIndexAsAvailable(ProductAddStepsEnum.SUMMARY);
          this.stepsService.unmarkIndexAsCompleted(ProductAddStepsEnum.SUMMARY);
        }

        this.stepsService.broadcastModelChanges();

        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
        this.router.navigate(['/sellers/product-add/general']);
      }
    }
    else {
      this.stepsService.unmarkIndexAsCompleted(ProductAddStepsEnum.INFO);
      this.stepsService.unmarkIndexAsCompleted(ProductAddStepsEnum.PICTURES);
      this.stepsService.unmarkIndexAsCompleted(ProductAddStepsEnum.SUMMARY);
      this.stepsService.broadcastModelChanges();
    }
  }

  private async setupFormForExistingProduct(): Promise<void> {
    this.spinnerService.show();

    const category = this.availableCategories.find(x => x.id === this.productApproval.categories_parent_id);

    await this.loadSubcategoriesByCategory(category?.id);
    this.setSizeFormControl();
    this.setMeasurementControls();

    const measurement = this.productApproval.measurement
      ? this.productApproval.measurement.split('x')
      : [];
    const regularPrice = this.regularPriceCurrencyWise(this.productApproval.base_currency);
    const preferredCurrency = this.user.getValue()?.preferredCurrencyName
      ? this.user.getValue()?.preferredCurrencyName
      : 'EUR';
    const sizesIds = this.sizes?.map(s => s.id);

    this.productForm.patchValue({
      brand_id: this.productApproval.brand_id,
      category: category?.id,
      // gets the subcategories of existing ProductApproval only if they are present in the availableSubcategories array,
      subcategories: this.availableSubcategories
        .map(x => x.id)
        .filter(x => this.productApproval.categories.map(y => y.id).includes(x)),
      color_id: this.productApproval.color_id
        ? +this.productApproval.color_id
        : null,
      material_id: this.productApproval.material_id
        ? this.productApproval.material_id
        : null,
      base_currency: this.productApproval.base_currency
        ? this.productApproval.base_currency
        : preferredCurrency,
      description_text: this.productApproval.description,
      condition_rating: this.productApproval.condition_rating,
      cost_of_good: this.costOfGoodCurrencyWise(this.productApproval.base_currency),
      regular_price: regularPrice > 0
        ? regularPrice
        : null,
      serial_number: this.productApproval.serial_number
        ? this.productApproval.serial_number
        : '',
      measurement_height: parseInt(measurement[0] !== undefined
        ? measurement[0].replace('cm', '')
        : '', 10),
      measurement_width: parseInt(measurement[1] !== undefined
        ? measurement[1].replace('cm', '')
        : '', 10),
      measurement_depth: parseInt(measurement[2] !== undefined
        ? measurement[2].replace('cm', '')
        : '', 10),
      handle_drop: this.productApproval.handle_drop,
      shoulder_drop: this.productApproval.shoulder_drop,
      chain_length: this.productApproval.chain_length,
      pandant_measurement: this.productApproval.pandant_measurement,
      ring_size: this.productApproval.ring_size,
      shoes_size_id: sizesIds?.find(x => x === this.productApproval.shoes_size_id),
      bag_size_id: sizesIds?.find(x => x === this.productApproval.bag_size_id),
      clothing_size_id: sizesIds?.find(x => x === this.productApproval.clothing_size_id),
    });
  }

  private async loadSubcategoriesByCategory(categoryId: number): Promise<void> {
    const subs = await this.categoryService.getChildrenCategories(categoryId).toPromise();

    this.availableSubcategories = subs;

    if (subs?.length === 0) {
      this.productForm.get('subcategories').clearValidators();
    }
    else {
      this.productForm.get('subcategories').setValidators([Validators.required]);
    }

    this.productForm.get('subcategories').updateValueAndValidity();

    this.spinnerService.hide();
  }

  private setMeasurementControls(): void {
    if (this.productApproval) {
      switch (this.productApproval.main_category) {
      case 'BAGS':
        this.productForm.patchValue({ handle_drop: [''] });
        this.productForm.patchValue({ shoulder_drop: [''] });
        break;
      case 'JEWELRY':
        this.productForm.patchValue({ chain_length: [''] });
        this.productForm.patchValue({ pandant_measurement: [''] });
        this.productForm.patchValue({ ring_size: [''] });
        break;
      }
    }
  }

  private setSizeFormControl(): void {
    this.currentSizeType = this.getSizeIdentifier('id');

    if (this.currentSizeType) {
      this.productForm[this.currentSizeType] = ['', Validators.required];
    }
  }

  private getSizeIdentifier(identifierType: 'url' | 'id', categoryName?: string): string | undefined {
    if (!categoryName && !this.productApproval) {
      return undefined;
    }

    let sizeIdentifierId;
    let sizeIdentifierUrl;
    const criteria = categoryName || this.productApproval.main_category;

    switch (criteria) {
    case 'CLOTHING':
      sizeIdentifierId = 'clothing_size_id';
      sizeIdentifierUrl = 'clothingsizes';
      break;
    case 'SHOES':
      sizeIdentifierId = 'shoes_size_id';
      sizeIdentifierUrl = 'shoesizes';
      break;
    }

    if (identifierType === 'url') {
      return sizeIdentifierUrl;
    }
    else {
      return sizeIdentifierId;
    }
  }

  private markPriceInputAsInvalid(): void {
    this.productForm.get('cost_of_good').reset();
    this.productForm.get('regular_price').reset();
    this.productForm.get('cost_of_good').markAsTouched();
    this.productForm.get('regular_price').markAsTouched();
    this.productForm.get('cost_of_good').markAsDirty();
    this.productForm.get('regular_price').markAsDirty();
  }

  private setCommissionRate(amount: number, currency: string): void {
    this.spinnerService.show();

    const roleWiseCurrency
      = this.user.getValue()?.role_id === UserRolesEnum.PROFESSIONAL_SELLER && this.user.getValue()?.preferredCurrencyName
        ? this.user.getValue().preferredCurrencyName
        : currency;
    const proSellerUserId
      = this.user.getValue()?.role_id === UserRolesEnum.PROFESSIONAL_SELLER
        ? this.user.getValue().id
        : 0;

    if (proSellerUserId !== 0) {
      this.commissionRateProSellerSub$ = this.productApprovalService
        .getCommissionRates(amount, roleWiseCurrency, proSellerUserId)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(
          (commission: any) => {
            if (this.hasErrorMessage()) {
              this.hideErrorMessage();
            }

            if (!commission || !commission.price || commission.price === 0) {
              this.markPriceInputAsInvalid();
            }
            else {
              this.productForm.patchValue({ cost_of_good: commission.cost });
              this.productForm.patchValue({ regular_price: commission.regular_price });
            }
          },
          error => {
            this.showErrorMessage(ErrorOperationEnum.UPDATE, error.message);
            this.markPriceInputAsInvalid();
          }
        );
    }
    else {
      this.commissionRateSub$ = this.productApprovalService
        .getCommissionRates(amount, roleWiseCurrency)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(
          (commission: any) => {
            if (this.hasErrorMessage()) {
              this.hideErrorMessage();
            }

            this.productForm?.patchValue({ cost_of_good: commission.cost });
            this.productForm?.patchValue({ regular_price: commission.regular_price });
          },
          error => {
            this.showErrorMessage(ErrorOperationEnum.UPDATE, error.message);
            this.productForm?.patchValue({ cost_of_good: null });
          }
        );
    }
  }

  public onPriceChange(value: number): void {
    if (this.productForm) {
      const formData = this.productForm.getRawValue();

      if (formData.base_currency && value >= 0) {
        this.setCommissionRate(value, formData.base_currency);
      }
      else {
        this.productForm.get('cost_of_good').reset();
        this.productForm.get('regular_price').reset();
      }
    }
  }

  public onCurrencyChange($event: any): void {
    if (this.productForm && $event) {
      const formData = this.productForm.getRawValue();

      if (formData.price) {
        const amount = formData.price;
        const currencyCode = this.currencies.find((currency: any) => currency.id === $event.id).code;

        this.setCommissionRate(amount, currencyCode);
      }
    }
  }

  private getSizeSubscriber(categoryName?: string): Observable<any> | void {
    const sizeUrl = this.getSizeIdentifier('url', categoryName);

    if (sizeUrl) {
      return this.productApprovalService.getSizes(sizeUrl);
    }
  }

  public costOfGoodCurrencyWise(currency): number {
    switch (currency) {
    case 'EUR':
      return this.productApproval.cost_of_good_EUR;
    case 'USD':
      return this.productApproval.cost_of_good_USD;
    case 'GBP':
      return this.productApproval.cost_of_good_GBP;
    case 'DKK':
      return this.productApproval.cost_of_good_DKK;
    case 'SEK':
      return this.productApproval.cost_of_good_SEK;
    default:
      return 0;
    }
  }

  public regularPriceCurrencyWise(currency): number {
    switch (currency) {
    case 'EUR':
      return this.productApproval.regular_price_EUR;
    case 'USD':
      return this.productApproval.regular_price_USD;
    case 'GBP':
      return this.productApproval.regular_price_GBP;
    case 'DKK':
      return this.productApproval.regular_price_DKK;
    case 'SEK':
      return this.productApproval.regular_price_SEK;
    default:
      return 0;
    }
  }

  private showErrorMessage(errorType: ErrorOperationEnum, message?: string): void {
    const generalMessage = this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');

    if (errorType === ErrorOperationEnum.CREATE) {
      this.productCreateErrorMessage = message
        ? message
        : generalMessage;
    }
    else {
      this.productUpdateErrorMessage = message
        ? message
        : generalMessage;
    }
  }

  private hideErrorMessage(): void {
    this.productUpdateErrorMessage = null;
    this.productCreateErrorMessage = null;
  }

  private hasErrorMessage(): boolean {
    return !!this.productCreateErrorMessage || !!this.productUpdateErrorMessage;
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

  private getFormMeasurement(formData): string {
    const data = [
      formData.measurement_height + 'cm',
      formData.measurement_width + 'cm',
      formData.measurement_depth + 'cm',
    ]
      .filter(measurement => {
        return !isNaN(parseInt(measurement, 10));
      })
      .join(' x ');

    return data
      ? data
      : ' ';
  }

  private handleSizeIdentifier(categoryName: string): void {
    this.currentSizeType = this.getSizeIdentifier('id', categoryName);
    const sizeIdentifierObs$: Observable<any> | void = this.getSizeSubscriber(categoryName);

    if (this.currentSizeType && sizeIdentifierObs$) {
      this.sizeIdentifierSub$ = sizeIdentifierObs$.subscribe((sizes: ClothingSize[] | ShoeSize[]) => {
        this.sizes = sizes;

        if (this.productForm) {
          if (this.currentSizeType === 'shoes_size_id') {
            this.productForm.addControl('shoes_size_id', new FormControl('', Validators.required));
            this.productForm.removeControl('clothing_size_id');
            this.productForm.patchValue({
              shoes_size_id: null,
            });
          }
          else if (this.currentSizeType === 'clothing_size_id') {
            this.productForm.addControl('clothing_size_id', new FormControl('', Validators.required));
            this.productForm.removeControl('shoes_size_id');
          }
        }
      });
    }
    else {
      this.productForm.removeControl('shoes_size_id');
      this.productForm.removeControl('clothing_size_id');
    }
  }

  private handleMeasurementControls(categoryName: string): void {
    switch (categoryName) {
    case 'BAGS':
      this.productForm.addControl('handle_drop', new FormControl(''));
      this.productForm.addControl('shoulder_drop', new FormControl(''));
      this.productForm.removeControl('chain_length');
      this.productForm.removeControl('pandant_measurement');
      this.productForm.removeControl('ring_size');
      break;
    case 'JEWELRY':
      this.productForm.addControl('chain_length', new FormControl(''));
      this.productForm.addControl('pandant_measurement', new FormControl(''));
      this.productForm.addControl('ring_size', new FormControl(''));
      this.productForm.removeControl('handle_drop');
      this.productForm.removeControl('shoulder_drop');
      break;
    default:
      this.productForm.removeControl('chain_length');
      this.productForm.removeControl('pandant_measurement');
      this.productForm.removeControl('ring_size');
      this.productForm.removeControl('handle_drop');
      this.productForm.removeControl('shoulder_drop');
    }
  }

  showSizeInput(): boolean {
    return (
      !!this.productForm.get('shoes_size_id')
      || !!this.productForm.get('bag_size_id')
      || !!this.productForm.get('clothing_size_id')
    );
  }

  getFormControlNameForSizeField(): string {
    if (this.productForm.get('shoes_size_id')) {
      return 'shoes_size_id';
    }

    if (this.productForm.get('bag_size_id')) {
      return 'bag_size_id';
    }

    if (this.productForm.get('clothing_size_id')) {
      return 'clothing_size_id';
    }

    return '';
  }

  public showErrorMsg(fieldName: string): boolean {
    if (!this.productForm) {
      return false;
    }

    return (
      this.productForm
      && this.productForm.get(fieldName).errors
      && this.productForm.get(fieldName).errors.required
      && (this.isFormSubmitted || this.productForm.get(fieldName).touched)
    );
  }

  ngOnDestroy(): void {
    this.dropdownLoadersSub$?.unsubscribe();
    this.submitActionSub$?.unsubscribe();
    this.formCategorySub$?.unsubscribe();
    this.formPriceSub$?.unsubscribe();
    this.commissionRateProSellerSub$?.unsubscribe();
    this.commissionRateSub$?.unsubscribe();
    this.sizeIdentifierSub$?.unsubscribe();
  }
}
