import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '@schemas/user.interface';
import { UserService } from '@services/user.service';
import { StepItem } from '@shared/components/tvb-steps/tvb-steps.component';
import { BehaviorSubject } from 'rxjs';
import { StepsService } from '@services/app/steps.service';
import { AddressInfo } from '../../checkout/interfaces/address.interface';
import { UserInfoResponse } from '@schemas/auth.interface';

export enum ProductAddStepsEnum {
  INFO,
  PICTURES,
  GET_PAID,
  SUMMARY,
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  public steps$: BehaviorSubject<StepItem[]>;
  public user: UserData;
  public currentIndex$: BehaviorSubject<number>;
  public stepItems: StepItem[] = [];
  public currentStepIndex = 0;
  public isAddressVerified = true; // TODO: set this prop to true when then back-end verify address feature is working properly

  constructor(private userService: UserService, private stepsService: StepsService, private router: Router) {}

  ngOnInit(): void {
    const userSnapshot = this.userService.getUserData().getValue();

    this.userService.getUserV2(userSnapshot.id).subscribe((userInfoResponse: UserInfoResponse) => {
      this.user = userInfoResponse?.user?.user[0] || userSnapshot;
    });

    this.steps$ = this.stepsService.getModel();
    this.currentIndex$ = this.stepsService.getCurrentStepIndex();

    // TODO: this code must be uncommented when then back-end verify address feature is working properly
    // const user: UserData = this.user$.getValue();
    // const userDeliveryAddress: DeliveryAddress = (await this.userService.getUserDeliveryAddress(user.id).toPromise())[0];
    // const userAddressToBeVerified: AddressInfo = {
    //   fname: user.first_name,
    //   lname: user.last_name,
    //   address_1: userDeliveryAddress.address_1,
    //   address_2: userDeliveryAddress.address_2,
    //   city: userDeliveryAddress.city,
    //   country: userDeliveryAddress.country_id,
    //   state: userDeliveryAddress.state,
    //   pin_code: userDeliveryAddress.pin_code,
    //   is_default: userDeliveryAddress.default_address === 'yes',
    //   phonecode: user.phone_code,
    //   mobile_no: user.mobile_no,
    //   email_id: user.email,
    //   company: user.company,
    // };
    //
    // this.isAddressVerified = await this.isAddressValid(userAddressToBeVerified);

    this.stepItems = [
      {
        index: ProductAddStepsEnum.INFO,
        id: '/sellers/product-add/general',
        label: 'INFORMATION',
        spotlight: true,
        disabled: false,
        completed: false,
        available: true,
      },
      {
        index: ProductAddStepsEnum.PICTURES,
        id: '/sellers/product-add/images',
        label: 'PICTURES',
        spotlight: false,
        disabled: true,
        completed: false,
        available: false,
      },
      {
        index: ProductAddStepsEnum.GET_PAID,
        id: '/sellers/product-add/get-paid',
        label: 'GET PAID',
        spotlight: false,
        disabled: true,
        completed: false,
        available: false,
      },
      {
        index: ProductAddStepsEnum.SUMMARY,
        id: '/sellers/product-add/summary',
        label: 'CONFIRMATION',
        spotlight: false,
        disabled: true,
        completed: false,
        available: false,
      },
    ];
    this.stepsService.setModel(this.stepItems);
    this.stepsService.broadcastModelChanges();
    this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.INFO);

    // Subscribing to these BehaviorSubjcets <tvb-steps> can be updated every time its values changes.
    this.currentIndex$.subscribe(currentIndex => {
      for (let i = 0; i < this.stepItems.length; i++) {
        this.stepItems[i].spotlight = i === currentIndex;
      }
    });

    this.steps$.subscribe(model => (this.stepItems = model));
  }

  handleStepClick(data: StepItem): void {
    const productApprovalId = this.stepsService.getStashItem('productApprovalId');

    this.stepsService.setCurrentStepIndex(data.index);

    switch (data.index) {
      case ProductAddStepsEnum.INFO:
        this.router.navigate([`/sellers/product-add/general/${productApprovalId}`]);
        break;
      case ProductAddStepsEnum.PICTURES:
        this.router.navigate([`/sellers/product-add/images/${productApprovalId}`]);
        break;
      case ProductAddStepsEnum.GET_PAID:
        this.router.navigate([`/sellers/product-add/get-paid/${productApprovalId}`]);
        break;
      case ProductAddStepsEnum.SUMMARY:
        this.router.navigate([`/sellers/product-add/summary/${productApprovalId}`]);
        break;
      default:
        this.router.navigate(['/sellers/product-add/general']);
        break;
    }
  }

  private async isAddressValid(addressData: AddressInfo): Promise<boolean> {
    try {
      const result = await this.userService.verifyAddress(addressData).toPromise();

      return result.message === 'success' || result;
    }
    catch (ex) {
      return false;
    }
  }

  shouldShowSteps(): boolean {
    return !this.router.url.includes('verify-account');
  }
}
