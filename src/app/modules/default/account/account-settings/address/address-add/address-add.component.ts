import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { ProductService } from '@services/product.service';
import { ProductApprovalService } from '@services/product-approval.service';
import { LoaderService } from '@services/app/loader.service';
import { specialCharValidator } from '@shared/utils/special-char-validation';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss'],
})
export class AddressAddComponent implements OnInit {
  addressFormGroup: FormGroup = {} as FormGroup;
  public submitted = false;
  public disabled = true;
  public myDetailsForm: FormGroup | undefined;
  public countries: any = null;
  public currencies: any = null;
  public errorMessage: string | null | undefined;
  public countryPhoneCodes: any = null;
  public addressDetails: any = null;
  public addressId: any = null;
  trashModel: boolean;
  popUpHeading: string;
  displayButton: boolean;
  public isValid = true;
  public selectedCountry = 1;
  public selectedPhoneCode = 0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private productApprovalService: ProductApprovalService,
    private _activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  public loadData(): void {
    this.loaderService.triggerLoading.emit(true);
    this.addressId
      = this._activatedRoute.snapshot.paramMap.get('id') !== null
        ? parseInt(this._activatedRoute.snapshot.paramMap.get('id'))
        : null;
    this.productApprovalService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.userService.getallCountryPhoneCode().subscribe(countryPhoneCodes => {
      this.countryPhoneCodes = countryPhoneCodes;
    });

    if (parseInt(this._activatedRoute.snapshot.paramMap.get('id'))) {
      this.userService
        .getDeliveryAddress(parseInt(this._activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(addressDetail => {
          this.addressDetails = addressDetail;
          this.addressFormGroup.patchValue({
            salutation: addressDetail[0].salutation,
            fname: addressDetail[0].fname,
            lname: addressDetail[0].lname,
            email_id: addressDetail[0].email_id,
            address_type: addressDetail[0].address_type,
            address_1: addressDetail[0].address_1,
            address_2: addressDetail[0].address_2,
            state: addressDetail[0].state,
            city: addressDetail[0].city,
            pin_code: addressDetail[0].pin_code,
            country: addressDetail[0].country_id,
            phonecode: addressDetail[0].phone_code
              ? addressDetail[0].phone_code
              : 0,
            mobile_no: addressDetail[0].mobile_no,
            company: addressDetail[0].company,
          });
          this.loaderService.triggerLoading.emit(false);
        });
    }
    else {
      this.loaderService.triggerLoading.emit(false);
    }
  }

  createForm(): void {
    this.addressFormGroup = this.formBuilder.group({
      salutation: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      address_type: [''],
      address_1: ['', Validators.required],
      address_2: [''],
      state: [''],
      city: ['', [Validators.required, specialCharValidator()]],
      pin_code: ['', Validators.required],
      country: ['', Validators.required],
      phonecode: ['', Validators.required],
      mobile_no: ['', Validators.required],
      company: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.errorMessage) {
      this.errorMessage = null;
    }

    if (this.addressFormGroup && !this.addressFormGroup.invalid) {
      const formData = this.addressFormGroup.getRawValue();

      this.loaderService.triggerLoading.emit(true);
      const addressData = {
        ...formData,
      };

      if (parseInt(this._activatedRoute.snapshot.paramMap.get('id'))) {
        this.userService
          .updateAddress(parseInt(this._activatedRoute.snapshot.paramMap.get('id')), addressData)
          .subscribe(
            response => {
              this.loadData();
              this.openPopUp('Record updated');
              this.loaderService.triggerLoading.emit(false);
            },
            error => {
              console.log(error);
              this.loaderService.triggerLoading.emit(false);
              this.errorMessage = error.message;
            }
          );
      }
      else {
        this.userService.addDeliveryAddress(addressData).subscribe(
          response => {
            if (response.status === 'error') {
              this.openPopUp(response.message);
              this.loaderService.triggerLoading.emit(false);
            }
            else {
              this.loadData();
              this.openPopUp('Record added');
              this.loaderService.triggerLoading.emit(false);
            }
          },
          error => {
            console.log(error);
            this.loaderService.triggerLoading.emit(false);
            this.errorMessage = error.message;
          }
        );
      }
    }
    else {
      this.isValid = false;
      this.scrollToError();
    }
  }

  openPopUp(heading: string): void {
    this.trashModel = true;
    this.popUpHeading = heading;
  }

  hidePupUp(): void {
    this.trashModel = false;
    this.displayButton = true;
  }
  reloadItems(): void {
    this.trashModel = false;
    this.displayButton = true;
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
}
