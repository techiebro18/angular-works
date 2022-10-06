import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '@schemas/product.interface';

@Component({
  selector: 'app-product-details-tabs',
  templateUrl: './product-details-tabs.component.html',
  styleUrls: ['./product-details-tabs.component.scss'],
})
export class ProductDetailsTabsComponent implements OnInit {
  @ViewChild('tabs') tabs: ElementRef;
  @ViewChild('tablist') tablist: ElementRef;
  @Input() product;

  public tabFocusIndex = 0;
  public colors;
  public size;
  detailTab = true;
  descriptionTab = true;
  deliveryTab = false;
  productData: Product = null;

  constructor() {}

  ngOnInit(): void {
    this.productData = this.product;

    if (this.product.colors) {
      this.colors = this.product.colors.map(({ value }) => value).join(', ');
    }

    this.size = this.product.sizes
      .filter(v => v.type === 'shoes_EU' || v.type === 'bags_EU')
      .map(function (v) {
        return v.value;
      });

    if (this.size != '') {
      this.size += ' EU';
    }
    else {
      this.size = this.product.sizes
        .filter(v => v.type === 'clothing')
        .map(function (v) {
          return v.value;
        });
    }
  }

  changeTabs(tab: string, opened: boolean) {
    switch (tab) {
    case 'detailTab':
      this.detailTab = opened;
      break;
    case 'descriptionTab':
      this.descriptionTab = opened;
      break;
    case 'deliveryTab':
      this.deliveryTab = opened;
      break;
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      this.tabs.nativeElement.children[this.tabFocusIndex].setAttribute('tabindex', -1);

      if (event.keyCode === 39) {
        this.tabFocusIndex++;

        // If we're at the end, go to the start
        if (this.tabFocusIndex >= this.tabs.nativeElement.children.length) {
          this.tabFocusIndex = 0;
        }
        // Move left
      }
      else if (event.keyCode === 37) {
        this.tabFocusIndex--;

        // If we're at the start, move to the end
        if (this.tabFocusIndex < 0) {
          this.tabFocusIndex = this.tabs.nativeElement.children.length - 1;
        }
      }

      this.tabs.nativeElement.children[this.tabFocusIndex].setAttribute('tabindex', 0);
      this.tabs.nativeElement.children[this.tabFocusIndex].focus();
    }
  }
}
