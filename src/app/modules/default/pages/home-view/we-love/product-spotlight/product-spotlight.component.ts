import { Component, Input, OnDestroy } from '@angular/core';
import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';
import { ProductHelper } from '../../../../account/account-settings/my-items/product-helper';
import { TranslateService } from '@ngx-translate/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { CurrencyCodeEnum } from '@shared/enums/currency.enum';

@AutoUnsubscribe()
@Component({
  selector: 'tvb-product-spotlight',
  templateUrl: './product-spotlight.component.html',
  styleUrls: ['./product-spotlight.component.scss'],
})
export class ProductSpotlightComponent implements OnDestroy {
  @Input() product: ProductSearchResponseModel;
  @Input() showSaleBadge: boolean;
  @Input() showWeLoveTag: boolean;
  @Input() currencyCode: string | CurrencyCodeEnum = 'EUR';
  productHelper: ProductHelper;

  constructor(private translateService: TranslateService) {
    this.productHelper = new ProductHelper();
  }

  ngOnDestroy(): void {}

  getSaleBadgeText(): string {
    return this.showSaleBadge ? this.product.discount + '% OFF' : this.translateService.instant('On sale');
  }
}
