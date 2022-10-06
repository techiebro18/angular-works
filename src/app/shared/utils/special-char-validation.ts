import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasSpecialCharacter = /[!@#$%&*()_+-=§£¢¬\[\]{};:\\|<>\/]+/.test(value);

    return hasSpecialCharacter
      ? { specialCharacter: true }
      : null;
  };
}
