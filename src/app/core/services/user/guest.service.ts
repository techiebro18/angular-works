import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponseModel } from '@shared/models/api-response.model';
import { RegisterData } from '@schemas/apis.interface';
import { UserService } from '@services/user.service';
import { AuthResponseV2 } from '@schemas/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  public getValidationCode(email: string): Observable<ApiResponseModel<any>> {
    return this.httpClient.get<ApiResponseModel<any>>(`${environment.API_V2_URL}guest/validation-code/${email}`);
  }

  public update(registerData: RegisterData): Observable<AuthResponseV2> {
    return this.httpClient.post<AuthResponseV2>(`${environment.API_V2_URL}guest/update`, registerData).pipe(
      map((response: AuthResponseV2) => {
        if (response.access_token && response.user) {
          response.user.access_token = response.access_token;
          this.userService.setUser(response.user);
        }

        return response;
      })
    );
  }
}
