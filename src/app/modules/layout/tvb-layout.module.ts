import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopSettingsDialogComponent } from './components/dialogs/top-settings-dialog/top-settings-dialog.component';
import { LoginRegisterDialogComponent } from './components/dialogs/login-register-dialog/login-register-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { NavTopSettingsComponent } from './components/main-header/nav-top-settings/nav-top-settings.component';
import { NavComponent } from './components/main-header/nav/nav.component';
import { WishlistIconComponent } from './components/product-card/wishlist-icon/wishlist-icon.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgAisModule } from 'angular-instantsearch';
import { SearchBoxComponent } from './components/custom-instant-search/app-search-box/app-search-box.component';
import { UserMobileMenuComponent } from './components/user-mobile-menu/user-mobile-menu.component';
import { BecameProSellerComponent } from './components/dialogs/became-pro-seller/became-pro-seller.component';
import { FlatProductCardComponent } from './components/product-card/flat-product-card/flat-product-card.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountBoxComponent } from './components/account-box/account-box.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    FooterComponent,
    SideNavComponent,
    TopSettingsDialogComponent,
    LoginRegisterDialogComponent,
    LoginComponent,
    RegisterComponent,
    SocialLoginComponent,
    NavTopSettingsComponent,
    NavComponent,
    ProductCardComponent,
    WishlistIconComponent,
    SearchBoxComponent,
    UserMobileMenuComponent,
    BecameProSellerComponent,
    FlatProductCardComponent,
    MessageDialogComponent,
    AccountBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgAisModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    MainHeaderComponent,
    FooterComponent,
    SideNavComponent,
    ProductCardComponent,
    FlatProductCardComponent,
    UserMobileMenuComponent,
    WishlistIconComponent,
  ],
})
export class TvbLayoutModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
