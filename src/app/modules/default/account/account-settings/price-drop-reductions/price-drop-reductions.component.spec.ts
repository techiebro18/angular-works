import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDropReductionsComponent } from './price-drop-reductions.component';

describe('PriceDropReductionsComponent', () => {
  let component: PriceDropReductionsComponent;
  let fixture: ComponentFixture<PriceDropReductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceDropReductionsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDropReductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
