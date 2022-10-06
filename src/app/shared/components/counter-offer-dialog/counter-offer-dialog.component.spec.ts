import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOfferDialogComponent } from './counter-offer-dialog.component';

describe('CounterOfferDialogComponent', () => {
  let component: CounterOfferDialogComponent;
  let fixture: ComponentFixture<CounterOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterOfferDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
