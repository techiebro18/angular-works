import { Component, EventEmitter, Inject, Input, Output, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { CommonFilterFormat, FilterRecordNew } from '@schemas/product.interface';
import { FilterService } from '@services/common/filter.service';
import { ClothesSizeDialogComponent } from '../../dialogs/clothes-size-popup-dialog/clothes-size-popup-dialog.component';
import { DialogService } from '@services/app/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { MobileService } from '@services/mobile.service';
import { map, takeUntil } from 'rxjs/operators';
import { ColorService } from '@services/color.service';
import { ShoesSizeDialogComponent } from '../../dialogs/shoes-size-popup-dialog/shoes-size-popup-dialog.component';
@Component({
  selector: 'tvb-refinment-list',
  templateUrl: './refinment-list.component.html',
  styleUrls: ['./refinment-list.component.scss'],
})
export class RefinmentListComponent extends BaseWidget {
  public onDestroy$ = new Subject();

  // instance options
  @Input() public attribute: string;
  @Input() public value?: string = null;
  @Input() public sortBy: string[];
  @Input() public limit: number;
  @Input() public transformItems: Function;
  @Input() public autoHideContainer: boolean;
  @Input() public searchable: boolean;

  // TVB options
  @Input() public title: string;
  @Input() public name: string;
  @Input() public isHidden = false;
  @Input() public columnsNum = 1;
  @Input() public roundedInput = false;
  @Input() public isCollapsed = false;

  @Output() toggleChanged: EventEmitter<string> = new EventEmitter();

  childCatName: string[] = [];
  shownamefinal: any;
  public state: {
    items: {
      label: string;
      value: string;
      count: number;
      isRefined: boolean;
    }[];
    refine: Function;
    createURL: Function;
    isFromSearch: boolean;
    searchForItems: Function;
    isShowingMore: boolean;
    canToggleShowMore: boolean;
    toggleShowMore: Function;
    widgetParams: object;
  };
  platform$: Observable<string>;
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
  dialogRef: MatDialogRef<any>;

  constructor(
    private mobileService: MobileService,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private _FilterService: FilterService,
    public colorService: ColorService,
    private dialogModalService: DialogService
  ) {
    super('RefinementList');
    this.platform$ = this.mobileService.isMobile$.pipe(map(isMobile => (isMobile ? 'Mobile' : 'Desktop')));
  }

  ngOnInit(): void {
    if (!this.columnsNum) this.columnsNum = 1;

    let attribute;

    if (!this.value || this.value === undefined) attribute = this.attribute;
    else attribute = this.value;

    this.createWidget(connectRefinementList, {
      // instance options
      attribute: attribute,
      sortBy: this.sortBy,
      limit: this.limit,
      transformItems: this.transformItems,
      autoHideContainer: this.autoHideContainer,
      searchable: this.searchable,
    });
    super.ngOnInit();

    this._FilterService.selectedFilterListObservable.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      if (data != undefined) {
        this.filterList = data;
      }
    });
  }

  public updateFilterList(event, itemValue: any, itemLabel: any, isRefined: any) {
    this.state.refine(itemValue);

    if (this.name == 'categories') {
      if (!isRefined) {
        this.filterList.category.push(itemValue);
      }
      else {
        const index: number = this.filterList.category.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.category.splice(index, 1);
        }
      }
    }
    else if (this.name == 'subcategories') {
      if (!isRefined) {
        this.filterList.subcategory.push(itemValue);
      }
      else {
        const index: number = this.filterList.subcategory.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.subcategory.splice(index, 1);
        }
      }
    }
    else if (this.name == 'designers') {
      if (!isRefined) {
        this.filterList.designer.push(itemValue);
      }
      else {
        const index: number = this.filterList.designer.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.designer.splice(index, 1);
        }
      }
    }
    else if (this.name == 'styles') {
      if (!isRefined) {
        this.filterList.style.push(itemValue);
      }
      else {
        const index: number = this.filterList.style.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.style.splice(index, 1);
        }
      }
    }
    else if (this.name == 'colors') {
      if (!isRefined) {
        this.filterList.color.push(itemValue);
      }
      else {
        const index: number = this.filterList.color.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.color.splice(index, 1);
        }
      }
    }
    else if (this.name == 'shoesSize') {
      if (!isRefined) {
        this.filterList.shoes_size.push(itemValue);
      }
      else {
        const index: number = this.filterList.shoes_size.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.shoes_size.splice(index, 1);
        }
      }
    }
    else if (this.name == 'clothingSize') {
      if (!isRefined) {
        this.filterList.cloth_size.push(itemValue);
      }
      else {
        const index: number = this.filterList.cloth_size.indexOf(itemValue);

        if (index !== -1) {
          this.filterList.cloth_size.splice(index, 1);
        }
      }
    }

    this._FilterService.selectedFilterList(this.filterList);
  }
  openDialog() {
    this.isCollapsed = !this.isCollapsed;
    this.dialogRef = this.dialogModalService.openSizePopup<ClothesSizeDialogComponent>(
      ClothesSizeDialogComponent,
      null
    );
  }
  openShoesDialog() {
    this.isCollapsed = !this.isCollapsed;
    this.dialogRef = this.dialogModalService.openSizePopup<ShoesSizeDialogComponent>(ShoesSizeDialogComponent, null);
  }

  ngOnDestroy(): void {
    this._FilterService.selectedFilterList(null);
    //this.onDestroy$.next();
    //this.onDestroy$.complete();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.toggleChanged.emit(this.name);
    }
  }
}
