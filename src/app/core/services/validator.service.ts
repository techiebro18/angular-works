import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Apiv2ResponseModel } from '@shared/models/apiv2-response.model';

interface ExistsResponse {
  isExist: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  constructor(private authService: AuthService) {}

  validateUniqueUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
      return this.authService.isUserNameAvailable(control.value).pipe(
        map((response: Apiv2ResponseModel<boolean>) => {
          if (control.pristine) {
            return null;
          }

          if (response.data === false) {
            return { usernameTaken: true };
          }

          return null;
        })
      );
    };
  }

  validatExistsUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
      return this.authService.isUsernameExists(control.value).pipe(
        catchError((resp: ExistsResponse) => {
          return of({ usernameTaken: resp.isExist });
        }),

        map((valueExists: ExistsResponse) => {
          if (valueExists.isExist) {
            return { usernameTaken: valueExists.isExist };
          }

          return null;
        })
      );
    };
  }

  validateNoWhitespace(controlName: string): AsyncValidatorFn {
    return (formGroup: FormGroup) => {
      const usernameControl: AbstractControl = formGroup.get(controlName);

      if (usernameControl.value.match(/\s+/)) {
        usernameControl.setErrors({ whitespaceNotAllowed: true });
      }
      else {
        return null;
      }
    };
  }
}
