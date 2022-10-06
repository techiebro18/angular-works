import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartPopupComponent } from './view-cart-popup.component';

describe('ViewCartPopupComponent', () => {
  let component: ViewCartPopupComponent;
  let fixture: ComponentFixture<ViewCartPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCartPopupComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
