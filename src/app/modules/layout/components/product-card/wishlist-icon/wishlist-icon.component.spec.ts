import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { WishlistIconComponent } from './wishlist-icon.component';

declare global {
  interface Window {
    analytics: any;
  }
}

describe.skip('WishlistIconComponent', () => {
  let component: WishlistIconComponent;
  let fixture: ComponentFixture<WishlistIconComponent>;

  beforeEach(async () => {
    window.analytics = {
      identify: jest.fn(),
      page: jest.fn(),
      track: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [WishlistIconComponent],
      imports: [HttpClientModule, MatDialogModule, TranslateModule.forRoot()],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
