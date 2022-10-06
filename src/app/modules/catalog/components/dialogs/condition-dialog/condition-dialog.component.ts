import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-condition-dialog',
  templateUrl: './condition-dialog.component.html',
  styleUrls: ['./condition-dialog.component.scss'],
})
export class ConditionDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConditionDialogComponent>) {}

  ngOnInit(): void {}

  onClose(response: boolean) {
    this.dialogRef.close(response);
  }
}
