import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFooterComponent } from './checkout-footer.component';

describe('CheckoutFooterComponent', () => {
  let component: CheckoutFooterComponent;
  let fixture: ComponentFixture<CheckoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutFooterComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
