import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'clothes-size-popup-dialog',
  templateUrl: './clothes-size-popup-dialog.component.html',
  styleUrls: ['./clothes-size-popup-dialog.component.scss'],
})
export class ClothesSizeDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ClothesSizeDialogComponent>) {}

  ngOnInit(): void {}

  onClose(response: boolean) {
    this.dialogRef.close(response);
  }
}
