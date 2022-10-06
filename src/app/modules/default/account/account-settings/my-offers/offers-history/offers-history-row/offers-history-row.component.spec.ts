import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersHistoryRowComponent } from './offers-history-row.component';

describe('OfferHistoryRowComponent', () => {
  let component: OffersHistoryRowComponent;
  let fixture: ComponentFixture<OffersHistoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersHistoryRowComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersHistoryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
