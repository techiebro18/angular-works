import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'currency',
})
export class MycurrencyPipe implements PipeTransform {
  transform(val: number, currencyCode = 'EUR') {
    return new Intl.NumberFormat(getLocale(currencyCode), {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    })
      .format(Number(val))
      .replace('£', '£ ')
      .replace('$', '$ ')
      .replace('€', '€ ');
  }
}
function getLocale(currencyCode) {
  switch (currencyCode) {
  case 'EUR':
    return 'sfb';
  case 'USD':
    return 'en-US';
  case 'GBP':
    return 'en-US';
  case 'DKK':
  case 'NOK':
    return 'en-US';
  case 'SEK':
    return 'en-US';
  default:
    return 'en-US';
  }
}
