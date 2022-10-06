import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '@services/user.service';
import { UserData } from '@schemas/user.interface';
import { DialogService } from '@services/app/dialog.service';
import { UserInfoResponse } from '@schemas/auth.interface';

@Component({
  selector: 'app-product-add-verification-fields',
  templateUrl: './product-add-verification-fields.component.html',
  styleUrls: ['./product-add-verification-fields.component.scss'],
})
export class ProductAddVerificationFieldsComponent implements OnInit {
  public verificationForm: FormGroup = {} as FormGroup;
  public verificationFields: string[] = [];
  public user: UserData;
  public showForm = false;
  private returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    const userSnapshot = this.userService.getUserData().getValue();

    this.userService.getUserV2(userSnapshot.id).subscribe((data: UserInfoResponse) => {
      this.user = data?.user?.user[0] || userSnapshot;
      this.loadData();
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  public async submitForm(): Promise<void> {
    if (this.verificationForm && !this.verificationForm.invalid) {
      const formData = this.verificationForm.getRawValue();
      const formDataUpdate = new FormData();

      this.spinnerService.show();

      for (const image in formData) {
        formDataUpdate.append(image, formData[image]);
      }

      this.userService.verifyPrivateSeller(formDataUpdate).subscribe(() => {
        this.spinnerService.hide();

        this.dialogService.openTvbDialog({
          title: 'Operation success',
          messages: ['Thank you for uploading the requested additional information.'],
        });

        this.dialogService.confirmedTvbDialog().subscribe(confirmed => {
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          }
          else {
            this.router.navigate(['/sellers/product-add/general']);
          }
        });
      });
    }
  }

  public loadData(): void {
    this.spinnerService.show();
    this.userService.getCurrentUserVerificationInformation().subscribe(response => {
      if (response.verification_required) {
        this.verificationFields = response.verification_fields;
        this.setupForm();
      }
      else {
        this.router.navigate(['/sellers/product-add/general']);
      }

      this.spinnerService.hide();
    });
  }

  private setupForm(): void {
    const formAttributes: any = {};

    for (const verificationField of this.verificationFields) {
      const fieldName = verificationField.split('.').join('');

      if (verificationField.includes('document')) {
        formAttributes[fieldName] = ['', Validators.required];
        formAttributes[fieldName + 'back'] = ['', Validators.required];
        this.showForm = true;
      }
    }

    this.verificationForm = this.formBuilder.group(formAttributes);
  }

  public onFileChange($event: File | null, controlName: string): void {
    const data: any = {};

    data[controlName] = $event;
    (this.verificationForm as FormGroup).patchValue(data);
  }
}
