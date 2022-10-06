import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsHeadingComponent } from './product-details-heading.component';

describe('ProductDetailsHeadingComponent', () => {
  let component: ProductDetailsHeadingComponent;
  let fixture: ComponentFixture<ProductDetailsHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsHeadingComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
