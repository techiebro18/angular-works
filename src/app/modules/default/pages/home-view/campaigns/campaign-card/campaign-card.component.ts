import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { HomepageSection } from '@shared/models/homepage-section.interface';

@Component({
  selector: 'tvb-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
})
export class CampaignCardComponent {
  @Input() campaign: HomepageSection;

  constructor() {}

  getImageLink(): string {
    return (
      environment.UPLOADS_IMGIX_URL + 'dynamic/homepage/' + this.campaign.image_url + '.' + this.campaign.extension
    );
  }
}
