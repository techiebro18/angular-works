import { Component, OnInit } from '@angular/core';
import { StepItem } from '@shared/components/tvb-steps/tvb-steps.component';
import { MetaService } from '@services/app/meta.service';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('sellers', 'sell_item_meta_desc', 'Sell An Item');
  }
}
