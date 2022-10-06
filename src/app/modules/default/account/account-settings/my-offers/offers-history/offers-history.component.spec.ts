import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersHistoryComponent } from './offers-history.component';

describe('OffersHistoryComponent', () => {
  let component: OffersHistoryComponent;
  let fixture: ComponentFixture<OffersHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersHistoryComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
