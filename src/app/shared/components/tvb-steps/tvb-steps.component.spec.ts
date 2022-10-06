import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvbStepsComponent } from './tvb-steps.component';

describe('TvbStepsComponent', () => {
  let component: TvbStepsComponent;
  let fixture: ComponentFixture<TvbStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvbStepsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvbStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
