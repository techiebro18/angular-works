import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'tvb-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent {
  @Input() data: any;
  @ContentChild('weLove', { static: false }) weLoveTemplateRef: TemplateRef<any>;
  @ContentChild('campaigns', { static: false }) campaignsTemplateRef: TemplateRef<any>;

  constructor() {}
}
