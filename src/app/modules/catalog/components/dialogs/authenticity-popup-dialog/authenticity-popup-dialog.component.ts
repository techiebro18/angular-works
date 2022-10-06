import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'authenticity-popup-dialog',
  templateUrl: './authenticity-popup-dialog.component.html',
  styleUrls: ['./authenticity-popup-dialog.component.scss'],
})
export class AuthenticityDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AuthenticityDialogComponent>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  onClose(response: boolean) {
    this.renderer.addClass(document.body, 'noHorizontalScroll');
    this.dialogRef.close(response);
  }
}
