import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { LoaderService } from '@services/app/loader.service';
import { UserData } from '@schemas/user.interface';
import { AccountService } from '@services/account.service';
import { SegmentService } from '@services/segment.service';
import { UniversalService } from '@services/universal.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addShippingAddress } from 'src/app/state/actions/checkout.actions';
import { addCountries } from 'src/app/state/actions/country.actions';
import { ProductService } from '@services/product.service';
import { CheckoutService } from '@services/checkout/checkout.service';
import { specialCharValidator } from '@shared/utils/special-char-validation';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss', '../checkout-view/checkout-view.component.scss'],
})
export class ShippingAddressComponent implements OnInit {
  public addressList: any;
  public countries: any = null;
  public countryPhoneCodes: any = null;
  public shippingForm = new FormGroup({});
  public billingForm = new FormGroup({});
  public user: any;
  public selectedCountry = 1;
  public selectedPhoneCode = 0;
  public showBilling = false;
  public trashModel = false;
  public shippingModel = false;
  public errorMessage: string | null | undefined;
  public shippingAddress$: Observable<any>;
  public countries$: Observable<any>;
  public countriesWise = [];
  public edittedId = 0;
  public selectedAddress = 0;
  public addAddress = true;
  public deleteModel = false;
  public popUpHeading = '';
  public popUpAddressId = 0;
  public verificationMessage =
    'We attempted to validate your address and we were not able to find a valid result. Please verify address fields, look for any potential misspellings or errors and correct the information provided.';
  public message = '';
  public address = null;
  public billingAddress = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private loaderService: LoaderService,
    private router: Router,
    private _checkoutService: CheckoutService,
    public segmentService: SegmentService,
    public universalService: UniversalService,
    public productService: ProductService,
    public store: Store<any>
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserData().getValue() as UserData;
    this.setupShippingForm();
    this.loadAddress();
    this.productService.getCountryWiseShipping().subscribe(({ list }) => (this.countriesWise = list));
    this.accountService.getCountriesReal().subscribe(({ countrylist }) => {
      this.countries = countrylist;
      this.store.dispatch(addCountries({ countries: countrylist }));
    });
    this.userService.getallCountryPhoneCode().subscribe(countryPhoneCodes => {
      this.countryPhoneCodes = countryPhoneCodes;
    });
    this.shippingAddress$ = this.store.select('shippingAddressReducer');
    this.countries$ = this.store.select('countryReducer');
  }

  private loadAddress() {
    if (this.user) {
      this.loaderService.triggerLoading.emit(true);
      this.userService.getUserDeliveryAddress(this.user.id).subscribe(address => {
        this.addressList = address;
        const defaultAddress = this.addressList
          ? this.addressList
            .filter(v => v.default_address === 'yes')
            .map(function (v) {
              v.country = v.country_id;

              return v;
            })
          : [{}];

        if (this.addressList?.length) {
          this.addAddress = false;
        }

        if (defaultAddress.length) {
          this.selectedAddress = defaultAddress[0].id;
          this.addAddress = false;
        }

        if (!address || !address.length) {
          this.addAddress = true;
        }

        if (!this.selectedAddress && this.addressList?.length) {
          this.selectedAddress = this.addressList[this.addressList.length - 1].id;
        }

        this.loaderService.triggerLoading.emit(false);
      });
    }
  }

  deleteAddress() {
    this.loaderService.triggerLoading.emit(true);
    this.userService.removeAddress(this.popUpAddressId).subscribe(() => {
      this.loadAddress();
      this.deleteModel = false;
      this.loaderService.triggerLoading.emit(false);
    });
  }

  openDeletePopUp(id: any) {
    this.popUpAddressId = id;
    this.deleteModel = true;
    this.popUpHeading = 'Are you sure you want to delete this address?';
  }

  editAddress(id) {
    this.segmentService.trackOnePageUser('delivery_button_click', { label: 'edit_address' });
    const editableAddress = this.addressList
      ? this.addressList
        .filter(v => v.id === id)
        .map(function (v) {
          if (!v.country) v.country = v.country_id;

          return v;
        })
      : [{}];

    if (editableAddress.length) {
      this.edittedId = editableAddress[0].id;
      this.selectedAddress = 0;
      this.selectedCountry = editableAddress[0].country_id;
      this.shippingForm.patchValue({
        fname: editableAddress[0].fname,
        lname: editableAddress[0].lname,
        address_1: editableAddress[0].address_1,
        address_2: editableAddress[0].address_2,
        state: editableAddress[0].state,
        city: editableAddress[0].city,
        pin_code: editableAddress[0].pin_code,
        country: editableAddress[0].country_id,
        phonecode: editableAddress[0].phone_code
          ? editableAddress[0].phone_code
          : 0,
        mobile_no: editableAddress[0].mobile_no,
        company: editableAddress[0].company,
      });
      this.addAddress = true;
    }
    else {
      this.edittedId = 0;
    }
  }

  private setupShippingForm(): void {
    this.shippingForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      address_1: ['', Validators.required],
      address_2: [''],
      company: [''],
      phonecode: ['', Validators.required],
      mobile_no: ['', Validators.required],
      pin_code: ['', Validators.required],
      city: ['', [Validators.required, specialCharValidator()]],
      state: [''],
      country: ['', Validators.required],
    });
  }

  private setupBillingForm(): void {
    this.billingForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      address_1: ['', Validators.required],
      address_2: [''],
      company: [''],
      phonecode: ['', Validators.required],
      mobile_no: ['', Validators.required],
      pin_code: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],
    });
  }

  toggleBilling() {
    this.showBilling = !this.showBilling;

    if (this.showBilling) {
      this.segmentService.trackOnePageUser('billing_button_click', { label: 'add_billing' });
      this.setupBillingForm();
    }
    else {
      this.segmentService.trackOnePageUser('billing_button_click', { label: 'remove_billing' });
    }
  }

  onChangeCountry($event, formTrack) {
    this.segmentService.trackOnePageUser(formTrack, { label: 'country' });
  }

  onChangePhoneCode($event, formTrack) {
    this.segmentService.trackOnePageUser(formTrack, { label: 'phonecode' });
  }

  onShippingBlur($event) {
    if (this.shippingForm.get($event.target.id).valid) {
      this.segmentService.trackOnePageUser('delivery_form_fields', { label: $event.target.id });
    }
  }

  onBillingBlur($event) {
    if (this.billingForm.get($event.target.id).valid) {
      this.segmentService.trackOnePageUser('billing_form_fields', { label: $event.target.id });
    }
  }

  selectedAddressChange() {
    if (this.selectedAddress) {
      this.segmentService.trackOnePageUser('delivery_button_click', {
        label: 'change_selected_address',
      });
      this.addAddress = false;
    }
  }

  addNewAddress() {
    this.addAddress = true;
    this.selectedAddress = 0;
    this.edittedId = 0;
    this.setupShippingForm();
    this.segmentService.trackOnePageUser('delivery_button_click', { label: 'add_new_address' });
  }

  useAddress(): void {
    this.segmentService.trackOnePageUser('delivery_button_click', {
      label: 'use_existing_address',
    });

    if (this.selectedAddress) {
      const address = this.addressList
        .filter(v => v.id === this.selectedAddress)
        .map(function (v) {
          if (!v.country) v.country = v.country_id;

          return v;
        });

      this.store.dispatch(
        addShippingAddress({
          shippingAddres: {
            ...address[0],
            countryWiseTax: this.countriesWise.find(country => address[0].country_id === country.id),
          },
          billingAddress: address[0],
        })
      );
      this.loaderService.triggerLoading.emit(false);
      this.addAddress = false;
      this.paymentStep();
    }
  }

  submitForm() {
    this.segmentService.trackOnePageUser('delivery_button_click', { label: 'delivery_next' });

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (this.showBilling && this.billingForm && this.billingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      this.billingForm.markAllAsTouched();
      this.scrollToError();
    }
    else if (this.shippingForm && !this.shippingForm.invalid) {
      const formData = this.shippingForm.getRawValue();

      this.loaderService.triggerLoading.emit(true);

      const addressData = {
        ...formData,
      };

      const billingFormData = this.showBilling
        ? this.billingForm.getRawValue()
        : this.shippingForm.getRawValue();

      const billingData = {
        ...billingFormData,
      };

      this.address = addressData;
      this.billingAddress = billingData;

      let billingSuccess = false;
      let shippingSuccess = false;

      this.userService.verifyAddress(addressData).subscribe(
        response => {
          if (response.message === 'success') {
            if (!this.edittedId) {
              this.userService.addDeliveryAddress(addressData).subscribe(
                response => {
                  if (response.status === 'error') {
                    this.message = response.message;
                    this.trashModel = true;
                    this.loaderService.triggerLoading.emit(false);
                  }
                  else {
                    this.address.id = response.id;
                    const addressId = response.id;

                    this.selectedAddress = response.id;
                    this.userService.setDefaultAddress(addressId).subscribe(() => {
                      shippingSuccess = true;
                      this.closeLoader(billingSuccess, shippingSuccess);
                    });
                  }
                },
                error => {
                  console.log(error);
                  this.message = this.verificationMessage;
                  this.trashModel = true;
                  this.loaderService.triggerLoading.emit(false);
                  this.errorMessage = error.message;
                }
              );
            }
            else {
              this.address.id = this.edittedId;
              this.userService.updateAddress(this.edittedId, addressData).subscribe(
                response => {
                  if (response.status === 'error') {
                    this.message = response.message;
                    this.trashModel = true;
                    this.loaderService.triggerLoading.emit(false);
                  }
                  else {
                    const currentAddress = this.addressList
                      .filter(v => v.id === this.edittedId)
                      .map(function (v) {
                        return v;
                      });

                    if (currentAddress[0].default_address != 'yes') {
                      this.userService.setDefaultAddress(this.edittedId).subscribe(() => {
                        shippingSuccess = true;
                        this.selectedAddress = this.edittedId;
                        this.closeLoader(billingSuccess, shippingSuccess);
                      });
                    }
                    else {
                      shippingSuccess = true;
                      this.selectedAddress = this.edittedId;
                      this.closeLoader(billingSuccess, shippingSuccess);
                    }
                  }
                },
                error => {
                  console.log(error);
                  this.message = this.verificationMessage;
                  this.trashModel = true;
                  this.loaderService.triggerLoading.emit(false);
                  this.errorMessage = error.message;
                }
              );
            }

            this.userService.addBillingAddress(this.user.id, billingData).subscribe(
              response => {
                if (response.status === 'error') {
                  this.loaderService.triggerLoading.emit(false);
                }
                else {
                  this.billingAddress.id = response.id;
                  billingSuccess = true;
                  this.closeLoader(billingSuccess, shippingSuccess);
                }
              },
              error => {
                console.log(error);
                this.loaderService.triggerLoading.emit(false);
                this.errorMessage = error.message;
              }
            );
          }
          else {
            this.message = this.verificationMessage;
            this.trashModel = true;
          }
        },
        error => {
          console.log(error);
          this.message = this.verificationMessage;
          this.trashModel = true;
          this.loaderService.triggerLoading.emit(false);
          this.errorMessage = error.message;
        }
      );
    }
    else {
      this.shippingForm.markAllAsTouched();
      this.scrollToError();
    }
  }

  private closeLoader(billingSuccess, shippingSuccess): void {
    if (billingSuccess && shippingSuccess) {
      this.store.dispatch(
        addShippingAddress({
          shippingAddres: {
            ...this.address,
            countryWiseTax: this.countriesWise.find(country => this.shippingForm.getRawValue().country === country.id),
          },
          billingAddress: this.billingAddress,
        })
      );

      this.loaderService.triggerLoading.emit(false);
      this.addAddress = false;
      this.setupShippingForm();
      this.loadAddress();
      this.paymentStep();
    }
  }

  public scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  public scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }

  public paymentStep() {
    const responseConfig = this._checkoutService.paymentAvailability('klarna', this.selectedAddress).toPromise();

    responseConfig.then(config => {
      const isKlarnaShow = config.status && config.status == 'success'
        ? false
        : true;

      this._checkoutService.setKlarnaIssue(isKlarnaShow);
      this.segmentService.trackOnePageUser('Checkout Step Completed', {
        step: 2,
        step_name: 'Shipping',
        shipping_method: 'dhl',
      });
      this.router.navigate(['/checkout/payment-method']);
    });
  }

  hidePupUp() {
    this.trashModel = false;
  }

  hideDeletePopUp() {
    this.deleteModel = false;
  }

  openShippingInfo() {
    this.shippingModel = true;
  }

  hideShipPop() {
    this.shippingModel = false;
  }
}
