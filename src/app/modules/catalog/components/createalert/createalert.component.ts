import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterRecordNew } from '@schemas/product.interface';
import { UserData } from '@schemas/user.interface';
import { AppService } from '@services/app/app.service';
import { DialogService } from '@services/app/dialog.service';
import { AuthService } from '@services/auth.service';
import { FilterService } from '@services/common/filter.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';
import { SegmentWaitlistItemModel } from './../../../../core/services/segment.service';

@Component({
  selector: 'app-createalert',
  templateUrl: './createalert.component.html',
  styleUrls: ['./createalert.component.scss'],
})
export class CreatealertComponent implements OnInit, OnDestroy {
  public onDestroy$ = new Subject();

  public filterList: FilterRecordNew = {
    category: [],
    subcategory: [],
    designer: [],
    style: [],
    color: [],
    shoes_size: [],
    bag_size: [],
    cloth_size: [],
    style_seo_url: null,
    designer_seo_url: null,
    parent_category_seo_url: null,
    child_category_seo_url: null,
    discover_seo_url: null,
  };
  public parent_category_seo_url: any = null;
  public child_category_seo_url: any = null;
  public style_seo_url: any = null;
  public designer_seo_url: any = null;
  public user$: BehaviorSubject<UserData | null>;
  public isPopupActive = false;
  modalRef: BsModalRef;
  routeData$: any;
  public langauge: any;
  public plpFor: any;
  disabled: boolean;
  activeCreateAlert: boolean;
  errorAlert: boolean;
  user_id: any = 0;
  currentAppConfiguaration: any;

  errorMsg: any;
  @ViewChild('createAlertPopup') createAlertPopup: TemplateRef<any>;
  enableCreateAlert = false;
  loggedInStatus: boolean;

  constructor(
    private modalService: BsModalService,
    private dialogService: DialogService,
    public authService: AuthService,
    private userService: UserService,
    public _FilterService: FilterService,
    private router: Router,
    public _activatedRoute: ActivatedRoute,
    public appService: AppService,
    private SpinnerService: NgxSpinnerService,
    private segmentService: SegmentService
  ) {
    this.user$ = this.userService.getUserData();
  }
  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      if (data != undefined) {
        this.user_id = data.id;
      }
    });
    this.routeData$ = this._activatedRoute.data.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.plpFor = data.plpFor;
      this.langauge = data.language;
    });
    this._FilterService.selectedFilterListObservable.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      if (data != undefined && data != null) {
        this.filterList = data;
        this.addUrlParameterToFilter();
      }
    });
    this.addUrlParameterToFilter();
    this._FilterService.selectedFilterList(this.filterList);
  }
  addUrlParameterToFilter() {
    if (this.plpFor == APP_CONSTANTS.PLP_ROUTES.SHOP) {
      this.filterList.parent_category_seo_url = this._activatedRoute.snapshot.paramMap.get('parent_category_seo_url');
    }
    else if (this.plpFor == APP_CONSTANTS.PLP_ROUTES.CHILD_CATEGORY) {
      this.filterList.parent_category_seo_url = this._activatedRoute.snapshot.paramMap.get('parent_category_seo_url');
      this.filterList.child_category_seo_url = this._activatedRoute.snapshot.paramMap.get('child_category_seo_url');
    }
    else if (this.plpFor == APP_CONSTANTS.PLP_ROUTES.STYLE_MOTHERPAGE) {
      this.filterList.style_seo_url = this._activatedRoute.snapshot.paramMap.get('style_seo_url');
    }
    else if (this.plpFor == APP_CONSTANTS.PLP_ROUTES.DESIGNER) {
      this.filterList.designer_seo_url = this._activatedRoute.snapshot.paramMap.get('designer_seo_url');
      this.filterList.parent_category_seo_url = this._activatedRoute.snapshot.paramMap.get('parent_category_seo_url');
      this.filterList.child_category_seo_url = this._activatedRoute.snapshot.paramMap.get('child_category_seo_url');
    }
    else if (this.plpFor == APP_CONSTANTS.PLP_ROUTES.DISCOVER) {
      this.filterList.discover_seo_url = this._activatedRoute.snapshot.paramMap.get('discover_seo_url');
      this.filterList.parent_category_seo_url = this._activatedRoute.snapshot.paramMap.get('parent_category_seo_url');
      this.filterList.child_category_seo_url = this._activatedRoute.snapshot.paramMap.get('child_category_seo_url');
    }
    else {
      this.filterList.parent_category_seo_url = this._activatedRoute.snapshot.paramMap.get('parent_category_seo_url');
    }

    this.checkQueryParams();

    if (
      this.filterList.category.length > 0
      || this.filterList.designer.length > 0
      || this.filterList.style.length > 0
      || this.filterList.subcategory.length > 0
      || this.filterList.color.length > 0
      || this.filterList.bag_size.length > 0
      || this.filterList.shoes_size.length > 0
      || this.filterList.parent_category_seo_url != null
      || this.filterList.child_category_seo_url != null
      || this.filterList.style_seo_url != null
      || this.filterList.designer_seo_url != null
      || this.filterList.discover_seo_url != null
    ) {
      this.enableCreateAlert = true;
    }
    else {
      this.enableCreateAlert = false;
    }
  }
  async checkQueryParams() {
    await this._activatedRoute.queryParams.subscribe(params => {
      if (params.category !== undefined) {
        if (Array.isArray(params.category)) {
          params.category.forEach(element => {
            this.filterList.parent_category_seo_url != element
              && !this.filterList.category.includes(element)
              && this.filterList.category.push(element);
          });
        }
        else {
          this.filterList.parent_category_seo_url != params.category
            && !this.filterList.category.includes(params.category)
            && this.filterList.category.push(params.category);
        }
      }

      if (params.sub !== undefined) {
        if (Array.isArray(params.sub)) {
          params.sub.forEach(element => {
            this.filterList.child_category_seo_url != element
              && !this.filterList.subcategory.includes(element)
              && this.filterList.subcategory.push(element);
          });
        }
        else {
          this.filterList.child_category_seo_url != params.sub
            && !this.filterList.subcategory.includes(params.sub)
            && this.filterList.subcategory.push(params.sub);
        }
      }

      if (params.brand !== undefined) {
        if (Array.isArray(params.brand)) {
          params.brand.forEach(element => {
            this.filterList.designer_seo_url != element
              && !this.filterList.designer.includes(element)
              && this.filterList.designer.push(element);
          });
        }
        else {
          this.filterList.designer_seo_url != params.brand
            && !this.filterList.designer.includes(params.brand)
            && this.filterList.designer.push(params.brand);
        }
      }

      if (params.style !== undefined) {
        if (Array.isArray(params.style)) {
          params.style.forEach(element => {
            this.filterList.style_seo_url != element
              && !this.filterList.style.includes(element)
              && this.filterList.style.push(element);
          });
        }
        else {
          this.filterList.style_seo_url != params.style
            && !this.filterList.style.includes(params.style)
            && this.filterList.style.push(params.style);
        }
      }

      if (params.color !== undefined) {
        if (Array.isArray(params.color)) {
          params.color.forEach(element => {
            !this.filterList.color.includes(element) && this.filterList.color.push(element);
          });
        }
        else {
          !this.filterList.color.includes(params.color) && this.filterList.color.push(params.color);
        }
      }
    });
  }
  openModal(createAlertPopup: TemplateRef<any>) {
    this.loggedInStatus = this.authService.loggedIn;

    if (!this.loggedInStatus) {
      this.openPopup(true);

      return;
    }

    this.modalRef = this.modalService.show(createAlertPopup, {
      animated: true,
      backdrop: 'static',
    });
    this.activeCreateAlert = true;
    this.errorAlert = false;
  }
  openPopup(isSignIn: boolean) {
    this._FilterService.applyCreateAlert(true);
    this.dialogService
      .open(LoginRegisterDialogComponent, {
        isDefaultDialog: true,
        isSignIn,
        location: 'Product List - Join Waitlist',
      })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {});
  }
  saveCreateAlert() {
    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();
    this.disabled = true;
    this.SpinnerService.show();
    const formData: FormData = new FormData();
    const segmentData: SegmentWaitlistItemModel[] = [];

    for (const key in this.filterList) {
      const currentValue = this.filterList[key];

      formData.append(key, currentValue);

      if (currentValue !== null && currentValue !== undefined) {
        if (Array.isArray(currentValue) && currentValue.length > 0) {
          segmentData.push({ type: key, value: currentValue });
        }
        else if (typeof currentValue === 'string') {
          const currentValueConvertedIntoArray: string[] = [];

          currentValueConvertedIntoArray.push(currentValue);
          segmentData.push({ type: key, value: currentValueConvertedIntoArray });
        }
      }
    }

    formData.append('languageID', this.currentAppConfiguaration.languageID);
    this._FilterService
      .saveCreateAlert(formData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: data => {
          this.SpinnerService.hide();

          if (data.message == 'SUCCESS') {
            this.segmentService.JoinedWaitlist('product_listing_page', segmentData);
            this.activeCreateAlert = false;
          }
          else {
            this.errorMsg = data.message
              ? data.message
              : 'Something went wrong !!';
            this.errorAlert = true;
          }
        },
        error: () => {
          this.SpinnerService.hide();
        },
      });
  }

  removeHyphen(text: string): string {
    if (text.includes('%20')) return decodeURI(text);

    return text
      .split('-')
      .map(name => name[0].toLocaleUpperCase(navigator.language) + name.slice(1))
      .join(' ');
  }

  ngAfterViewInit() {
    this.authService.isLoggedInObs.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      if (data) {
        this._FilterService.applyCreateAlertObservable.pipe(takeUntil(this.onDestroy$)).subscribe(status => {
          if (status == true) {
            this.openModal(this.createAlertPopup);
            this._FilterService.applyCreateAlert(false);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
