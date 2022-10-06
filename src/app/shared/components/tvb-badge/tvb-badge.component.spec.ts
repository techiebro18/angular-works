import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvbBadgeComponent } from './tvb-badge.component';

describe('TvbBadgeComponent', () => {
  let component: TvbBadgeComponent;
  let fixture: ComponentFixture<TvbBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvbBadgeComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvbBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
