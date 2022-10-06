import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'shoes-size-popup-dialog',
  templateUrl: './shoes-size-popup-dialog.component.html',
  styleUrls: ['./shoes-size-popup-dialog.component.scss'],
})
export class ShoesSizeDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ShoesSizeDialogComponent>) {}

  ngOnInit(): void {}

  onClose(response: boolean) {
    this.dialogRef.close(response);
  }
}
