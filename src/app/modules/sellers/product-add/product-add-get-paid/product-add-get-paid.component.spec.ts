import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddGetPaidComponent } from './product-add-get-paid.component';

describe('ProductAddGetPaidComponent', () => {
  let component: ProductAddGetPaidComponent;
  let fixture: ComponentFixture<ProductAddGetPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAddGetPaidComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddGetPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
