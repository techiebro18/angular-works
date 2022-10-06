import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddSummaryComponent } from './product-add-summary.component';

describe('ProductAddSummaryComponent', () => {
  let component: ProductAddSummaryComponent;
  let fixture: ComponentFixture<ProductAddSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAddSummaryComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
