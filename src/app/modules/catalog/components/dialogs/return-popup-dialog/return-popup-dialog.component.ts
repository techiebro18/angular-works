import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'return-popup-dialog',
  templateUrl: './return-popup-dialog.component.html',
  styleUrls: ['./return-popup-dialog.component.scss'],
})
export class ReturnDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ReturnDialogComponent>, private renderer: Renderer2) {}

  ngOnInit(): void {}

  onClose(response: boolean) {
    this.renderer.addClass(document.body, 'noHorizontalScroll');
    this.dialogRef.close(response);
  }
}
