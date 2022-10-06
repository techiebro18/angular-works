import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { PDPWishlistIconComponent } from './pdp-wishlist-icon.component';

declare global {
  interface Window {
    analytics: any;
  }
}

describe.skip('PDPWishlistIconComponent', () => {
  let component: PDPWishlistIconComponent;
  let fixture: ComponentFixture<PDPWishlistIconComponent>;

  beforeEach(async () => {
    window.analytics = {
      identify: jest.fn(),
      page: jest.fn(),
      track: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PDPWishlistIconComponent],
      imports: [HttpClientModule, MatDialogModule, TranslateModule.forRoot()],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDPWishlistIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
