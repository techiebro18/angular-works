import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhlInfoComponent } from './dhl-info.component';

describe('DhlInfoComponent', () => {
  let component: DhlInfoComponent;
  let fixture: ComponentFixture<DhlInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DhlInfoComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DhlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
