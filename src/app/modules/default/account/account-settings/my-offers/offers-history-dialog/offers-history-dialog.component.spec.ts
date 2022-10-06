import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersHistoryDialogComponent } from './offers-history-dialog.component';

describe('OffersHistoryDialogComponent', () => {
  let component: OffersHistoryDialogComponent;
  let fixture: ComponentFixture<OffersHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersHistoryDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
