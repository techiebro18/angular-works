import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-register-dialog',
  templateUrl: './login-register-dialog.component.html',
  styleUrls: ['./login-register-dialog.component.scss'],
})
export class LoginRegisterDialogComponent implements OnInit {
  public isLoginView = true;
  public isWishlist = false;
  public location = '';
  public prdImg: string;
  constructor(
    public dialogRef: MatDialogRef<LoginRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isLoginView = this.data?.data?.isSignIn;
    this.isWishlist = this.data?.data?.isWishlist;
    this.prdImg = this.data?.data?.prdImg;
    this.location = this.data?.data?.location;
  }

  /**
   * to switch between login and register views
   * @param isToLoginView
   */
  public switchView(isToLoginView: boolean) {
    this.isLoginView = isToLoginView;
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
