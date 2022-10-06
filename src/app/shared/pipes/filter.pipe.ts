import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(items: any[], term): any {
    return term
      ? items.filter(
        item =>
          item.product.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
            || item.product.seoUrl.toLowerCase().indexOf(term.toLowerCase()) !== -1
      )
      : items;
  }
}
