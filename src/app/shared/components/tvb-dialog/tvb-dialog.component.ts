import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeHtml } from '@angular/platform-browser';

export type TvbDialogOptions = {
  title: string;
  messages: string[] | SafeHtml[];
  image: TvbDialogImage;
  cancelText?: string;
  confirmText?: string;
  showActionButtons?: boolean;
};

export interface TvbDialogImage {
  link: string;
  width: number;
  height: number;
}

@Component({
  selector: 'tvb-dialog',
  templateUrl: './tvb-dialog.component.html',
  styleUrls: ['./tvb-dialog.component.scss'],
})
export class TvbDialogComponent implements OnInit {
  image: TvbDialogImage = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TvbDialogOptions,
    private mdDialogRef: MatDialogRef<TvbDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.image) {
      this.image = this.data.image;
    }
  }

  public close(value): void {
    this.mdDialogRef.close(value);
  }

  public cancel(): void {
    this.close(false);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }
}
