import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { environment } from '@environments/environment.dev';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  LoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
import { SocialLoginComponent } from './social-login.component';
import { APP_BASE_HREF } from '@angular/common';

declare global {
  interface Window {
    analytics: any;
  }
}

describe.skip('SocialLoginComponent', () => {
  let component: SocialLoginComponent;
  let fixture: ComponentFixture<SocialLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialLoginComponent],
      imports: [TranslateModule.forRoot(), HttpClientModule, SocialLoginModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(environment.FACEBOOK_CLIENT_ID),
              },
            ],
          } as SocialAuthServiceConfig,
        },
        { provide: APP_BASE_HREF, useValue: '' },
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
