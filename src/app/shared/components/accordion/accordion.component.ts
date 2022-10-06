import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';

export interface AccordionTopic {
  title: string;
  component: any;
  active: boolean;
}

@Component({
  selector: 'tvb-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() topics: AccordionTopic[];

  constructor() {}

  expandTopicRow(topic: AccordionTopic) {
    this.topics.forEach((t: AccordionTopic) => {
      if (t.title === topic.title) t.active = !t.active;
    });
  }
}
