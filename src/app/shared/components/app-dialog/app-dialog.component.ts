import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tvb-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss'],
})
export class AppDialogComponent implements OnInit, OnDestroy {
  public dialogClass = 'sellers-dialog';
  public isWithHeader = true;

  @ViewChild('dialogContent', { static: true, read: ViewContainerRef })
  viewContainerRef: any;
  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, @Inject(MAT_DIALOG_DATA) public data: any) {
    // set main dialog class
    if (data?.data?.isDefaultDialog === true) {
      this.dialogClass = 'default-dialog';
    }

    // set isWithHeader
    if (data?.data?.isWithHeader === false) {
      this.isWithHeader = false;
    }
  }

  public ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.data.component);

    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
