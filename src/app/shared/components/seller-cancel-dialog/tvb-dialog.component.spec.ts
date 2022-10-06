import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvbDialogComponent } from './tvb-dialog.component';

describe('TvbDialogComponent', () => {
  let component: TvbDialogComponent;
  let fixture: ComponentFixture<TvbDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvbDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvbDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
