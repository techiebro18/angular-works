import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsComponent } from './payouts.component';

describe('PayoutsComponent', () => {
  let component: PayoutsComponent;
  let fixture: ComponentFixture<PayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayoutsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
