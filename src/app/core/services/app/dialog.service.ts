import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { AppDialogComponent } from '@shared/components/app-dialog/app-dialog.component';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { TvbDialogComponent } from '@shared/components/tvb-dialog/tvb-dialog.component';
import { SellerCancelDialogComponent } from '@shared/components/seller-cancel-dialog/seller-cancel-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogRef: MatDialogRef<TvbDialogComponent>;
  sellerCancelItemRef: MatDialogRef<SellerCancelDialogComponent>;

  constructor(private dialog: MatDialog) {}

  private conf = {
    autoFocus: true,
    height: 'auto',
    width: 'auto',
    panelClass: 'app-dialog',
    data: {},
  };

  public open<T>(component: ComponentType<T> | TemplateRef<T>, data?: any): MatDialogRef<any> {
    this.conf.data = { component, data };

    if (data?.isDefaultDialog === true) {
      this.conf.panelClass = 'default-app-dialog';
    }

    this.conf.width = data?.width ?? this.conf.width;

    return this.dialog.open(AppDialogComponent, this.conf);
  }

  openSizePopup<T>(component: any, sizedata: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      width: '600px',
      data: sizedata,
      disableClose: false,
    });
  }

  openAuthenticityPopup<T>(component: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      disableClose: false,
    });
  }

  // tvb-dialog

  public openTvbDialog(options): void {
    this.dialogRef = this.dialog.open(TvbDialogComponent, {
      data: {
        title: options.title,
        messages: options.messages,
        image: options.image,
        cancelText: options.cancelText || 'No',
        confirmText: options.confirmText || 'Yes',
        showActionButtons: options.showActionButtons,
      },
    });
  }

  public openSellerItemCancelDialog(options): void {
    this.sellerCancelItemRef = this.dialog.open(SellerCancelDialogComponent, {
      data: {
        title: options.title,
        item: options.item,
        eventType: options.eventType,
      },
    });
  }

  public sellerItemCancelConfirmedDialog(): Observable<any> {
    return this.sellerCancelItemRef.afterClosed().pipe(
      take(1),
      map(res => res),
      finalize(() => (this.sellerCancelItemRef = undefined))
    );
  }

  public confirmedTvbDialog(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map(res => res),
      finalize(() => (this.dialogRef = undefined))
    );
  }
}
