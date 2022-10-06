import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatProductCardComponent } from './flat-product-card.component';

describe('FlatProductCardComponent', () => {
  let component: FlatProductCardComponent;
  let fixture: ComponentFixture<FlatProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlatProductCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
