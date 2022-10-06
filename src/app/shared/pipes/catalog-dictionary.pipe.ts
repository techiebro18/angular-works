import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '@services/app/app.service';

@Pipe({
  name: 'catalogDictionary',
})
export class CatalogDictionaryPipe implements PipeTransform {
  constructor(private appService: AppService) {}

  transform(value: string): string {
    if (!value) return '';

    const dictionary = this.appService.catalogParentCategories$.getValue();

    if (dictionary?.length == 0) return value;

    return dictionary.find(_ => _.url.toLowerCase() === value?.toLowerCase())?.name || value;
  }
}

export interface CatalogUrl {
  name: string;
  url: string;
}
