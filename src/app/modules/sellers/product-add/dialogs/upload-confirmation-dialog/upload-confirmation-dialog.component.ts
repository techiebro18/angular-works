import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-upload-confirmation-dialog',
  templateUrl: './upload-confirmation-dialog.component.html',
  styleUrls: ['./upload-confirmation-dialog.component.scss'],
})
export class UploadConfirmationDialogComponent implements OnInit {
  public env = environment;
  constructor(private ref: MatDialogRef<UploadConfirmationDialogComponent>) {}

  ngOnInit(): void {}

  public closeDialog(): void {
    this.ref.close();
  }
}
