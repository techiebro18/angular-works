import { AbstractControl } from '@angular/forms';

export class CheckoutValidator {
  static datePastValidator(control: AbstractControl) {
    if (control.value.length > 3) {
      const today = new Date();
      const expirationDate = new Date();

      expirationDate.setFullYear(20 + control.value.substr(2, 4), control.value.substr(0, 2), 1);

      if (expirationDate < today) return { valid: false };
    }

    return null;
  }
}
