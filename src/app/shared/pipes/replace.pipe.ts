import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replace' })
export class Replace implements PipeTransform {
  transform(value: string, strToReplace: string, replacementStr: string): string {
    if (!value || !strToReplace || !replacementStr) {
      return value;
    }

    strToReplace = '[' + strToReplace + ']';

    return value.replace(new RegExp(strToReplace, 'g'), replacementStr);
  }
}
