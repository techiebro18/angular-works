import { Injectable } from '@angular/core';
import { AppService } from '@services/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsLanguage {
  constructor(private appService: AppService) {}

  public getCurrentLanguageSuffix(): string {
    // Language should be taken from domain
    let languageSuffix = '';
    const subdomain = this.appService.getCurrentSubDomain(null);

    // Algolia uses en for English-us and Englisg-uk
    languageSuffix = subdomain == '' || subdomain == 'uk'
      ? 'en'
      : subdomain;

    // Algolia has swedish language as 'sv' instead of 'se' !!
    // Algolia has Danish language as 'da' instead of 'dk' !!
    if (languageSuffix == 'se') {
      languageSuffix = 'sv';
    }
    else if (languageSuffix == 'dk') {
      languageSuffix = 'da';
    }

    return languageSuffix;
  }
}
