import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailNotificationService } from '@services/email_notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MetaService } from '@services/app/meta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SegmentService } from '@services/segment.service';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss'],
})
export class EmailNotificationsComponent implements OnInit {
  mainForm: FormGroup;

  constructor(
    private emailNotificationService: EmailNotificationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private metaService: MetaService,
    private snackBar: MatSnackBar,
    private segmentService: SegmentService
  ) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('account/email-notifications', '', 'Notification Settings');
    this.createForm();
    this.loadData();
  }
  private loadData(): void {
    this.spinner.show();

    this.emailNotificationService.getEmailNotification().subscribe(
      userData => {
        this.mainForm.patchValue({
          price_drop: !!+userData.price_drop,
          waitlist: !!+userData.waitlist,
          news_letter: !!+userData.news_letter,
          other_emails: !!+userData.other_emails,
        });
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        this.snackBar.open('An error has occurred while trying to get your Notification Settings.', 'x', {
          duration: 5000,
        });
      }
    );
  }

  createForm() {
    this.mainForm = this.formBuilder.group({
      price_drop: [''],
      waitlist: [''],
      news_letter: [''],
      other_emails: [''],
    });
  }

  onSubmit() {
    this.spinner.show();

    const pricedrop = this.mainForm.get('price_drop').value == true
      ? 1
      : 0;
    const waitlist = this.mainForm.get('waitlist').value == true
      ? 1
      : 0;
    const newsletter = this.mainForm.get('news_letter').value == true
      ? 1
      : 0;
    const other_emails = this.mainForm.get('other_emails').value == true
      ? 1
      : 0;
    const body
      = 'price_drop='
      + pricedrop
      + '&waitlist='
      + waitlist
      + '&news_letter='
      + newsletter
      + '&other_emails='
      + other_emails;

    this.emailNotificationService.updateEmailNotification(body).subscribe({
      next: () => {
        this.snackBar.open('Notifications updated!', 'x', { duration: 5000 });
        this.spinner.hide();
        this.segmentService.track('Notification', { newsletter, pricedrop, waitlist });
      },
      error: () => {
        this.snackBar.open('An error has occurred while trying ti update the Notification Settings.', 'x', {
          duration: 5000,
        });
        this.spinner.hide();
      },
    });
  }
}
