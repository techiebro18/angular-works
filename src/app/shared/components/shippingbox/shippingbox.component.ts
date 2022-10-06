import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { AppService } from '@services/app/app.service';
import { FilterService } from '@services/common/filter.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@services/app/dialog.service';
import { AuthenticityDialogComponent } from '../../../modules/catalog/components/dialogs/authenticity-popup-dialog/authenticity-popup-dialog.component';
import { ReturnDialogComponent } from '../../../modules/catalog/components/dialogs/return-popup-dialog/return-popup-dialog.component';
import { Product } from '@schemas/product.interface';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TvbDialogOptions } from '@shared/components/tvb-dialog/tvb-dialog.component';

@Component({
  selector: 'app-shippingbox',
  templateUrl: './shippingbox.component.html',
  styleUrls: ['./shippingbox.component.scss'],
})
export class ShippingboxComponent implements OnInit {
  dialogRef: MatDialogRef<any> | undefined;
  @Input() product: Product;
  tvbSeller = false;
  professionalSeller = false;
  privateSeller = false;

  constructor(
    public authService: AuthService,
    public appService: AppService,
    private dialogModalService: DialogService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getTypeOfSeller();
  }

  getTypeOfSeller() {
    if (this.product.commission_user_id === 0) this.tvbSeller = true;

    if (this.product.commission_user_type === 'professional') this.professionalSeller = true;

    if (this.product.commission_user_type === 'private') this.privateSeller = true;
  }
}
