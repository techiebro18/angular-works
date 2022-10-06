import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOfferFormComponent } from './counter-offer-form.component';

describe('CounterOfferFormComponent', () => {
  let component: CounterOfferFormComponent;
  let fixture: ComponentFixture<CounterOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterOfferFormComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
