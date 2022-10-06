import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingboxComponent } from './shippingbox.component';

describe('CreatealertComponent', () => {
  let component: ShippingboxComponent;
  let fixture: ComponentFixture<ShippingboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingboxComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
