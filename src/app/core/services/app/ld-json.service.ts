import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiConfigResponse } from '@schemas/apis.interface';
import { AppConfiguration, AppResponse } from '@schemas/app.interface';
import { LocalStorageService } from '@services/local-storage.service';
import { UniversalService } from '@services/universal.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonLdService } from 'ngx-seo';

@Injectable({
  providedIn: 'root',
})
export class LdJsonService {
  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private universalService: UniversalService,
    private jsonLdService: JsonLdService
  ) {}

  public getForHome(): void {
    const jsonLdObjectWebsite = this.jsonLdService.getObject('Website', {
      name: 'The Vintage Bar',
      url: 'https://thevintagebar.com',
      potentialAction: {
        '@type': 'SearchAction',
        'target': 'https://thevintagebar.com/searchItems/{search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });
    const jsonLdObjectCorporation = this.jsonLdService.getObject('Corporation', {
      name: 'The Vintage Bar',
      alternateName: 'Vintage Bar',
      url: 'https://thevintagebar.com',
      logo: 'https://thevintagebar.com/assets/images/logo.jpg',
      sameAs: [
        'https://www.facebook.com/thevintagebar.cph/',
        'https://www.instagram.com/the_vintage_bar/',
        'https://www.youtube.com/channel/UCOZuwfanxGgvjB3IykARCvw',
        'https://www.linkedin.com/company/the-vintage-bar/',
        'https://www.pinterest.dk/thevintagebar/',
        'https://thevintagebar.com/',
      ],
    });

    this.jsonLdService.setData([jsonLdObjectWebsite, jsonLdObjectCorporation]);
  }
}
