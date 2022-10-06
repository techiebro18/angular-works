import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { LoaderService } from '@services/app/loader.service';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public addresslist: any;
  public trashModel = false;
  public popUpHeading = '';
  public displayButton = true;
  public popUpAddressId = 0;
  action: string;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('account/address', '', 'Address Book');
    this.loadData();
  }
  private loadData(): void {
    this.loaderService.triggerLoading.emit(true);
    this.userService.getAddressList().subscribe(address => {
      this.addresslist = address;
      this.loaderService.triggerLoading.emit(false);
    });
  }
  removeAddress() {
    this.loaderService.triggerLoading.emit(true);
    this.userService.removeAddress(this.popUpAddressId).subscribe(() => {
      this.loadData();
      this.displayButton = false;
      this.popUpHeading = 'Address deleted';
      this.loaderService.triggerLoading.emit(false);
    });
  }
  setDefaultAddress() {
    this.loaderService.triggerLoading.emit(true);
    this.userService.setDefaultAddress(this.popUpAddressId).subscribe(() => {
      this.loadData();
      this.displayButton = false;
      this.popUpHeading = 'Address is set default';
      this.loaderService.triggerLoading.emit(false);
    });
  }

  openPopUp(id: any, action: string) {
    this.popUpAddressId = id;
    this.trashModel = true;
    this.popUpHeading
      = action === 'delete'
        ? 'Are you sure you want to delete this address?'
        : action === 'set_default'
          ? 'Confirm to set default address'
          : '';
    this.action = action;
  }

  hidePupUp() {
    this.trashModel = false;
    this.displayButton = true;
  }
  reloadItems() {
    this.trashModel = false;
    this.displayButton = true;
  }
}
