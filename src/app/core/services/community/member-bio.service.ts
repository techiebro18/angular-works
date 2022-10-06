import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { MemberBio } from '../../../shared/schemas/community/member-bio';

@Injectable({
  providedIn: 'root',
})
export class MemberBioService {
  constructor(private http: HttpClient) {}

  public getBioInfo(username: string): Observable<MemberBio> {
    return this.http.get<MemberBio>(`${environment.API_V2_URL}community/member/${username}`);
  }

  public getUsers(users_id: string): Observable<Array<MemberBio>> {
    return this.http.get<Array<MemberBio>>(`${environment.API_V2_URL}community/member/users/${users_id}`);
  }
}
