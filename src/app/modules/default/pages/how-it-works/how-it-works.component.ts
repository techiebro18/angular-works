import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { DialogService } from '@services/app/dialog.service';
import { MetaService } from '@services/app/meta.service';
import { AuthService } from '@services/auth.service';
import { LoginRegisterDialogComponent } from 'src/app/modules/layout/components/dialogs/login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService,
    private metaService: MetaService
  ) {}

  option = 'seller';
  IMG_PATH: string = environment.IMGIX_UPLOADS_URL;
  loggedIn: boolean = this.authService.loggedIn;

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('how-it-works', 'how_it_works_meta_desc', 'How it Works');
  }

  public toogleOption(option: string): void {
    this.option = option;
  }

  public goTo(page: string): void {
    this.router.navigate([page]);
  }

  public openSignInPopUp(): void {
    this.dialogService.open(LoginRegisterDialogComponent, {
      isDefaultDialog: true,
      isWishlist: false,
      isSignIn: false,
    });
  }
}
