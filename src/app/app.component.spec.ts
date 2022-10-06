import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';

declare global {
  interface Window {
    consentManagerConfig: any;
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    window.analytics = {
      identify: jest.fn(),
      page: jest.fn(),
      track: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        NgxSpinnerModule,
        MatProgressSpinnerModule,
      ],
      declarations: [AppComponent, LoaderComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it("should have as title 'angular-website'", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('angular-website');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.content span').textContent).toContain('angular-website app is running!');
  });
});
