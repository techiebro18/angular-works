import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { EmailNotification } from '@schemas/email_notification.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailNotificationService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param NotificationData
   */

  public updateEmailNotification(NotificationData: string): Observable<EmailNotification> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.put<EmailNotification>(
      `${environment.API_V2_URL}account/notifications`,
      NotificationData,
      {
        headers,
      }
    );
  }
  public getEmailNotification(): Observable<EmailNotification> {
    return this.http.get<EmailNotification>(`${environment.API_V2_URL}account/notifications/edit`);
  }
}
