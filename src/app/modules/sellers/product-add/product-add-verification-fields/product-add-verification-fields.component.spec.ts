import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductAddVerificationFieldsComponent } from './product-add-verification-fields.component';

describe.skip('ProductAddVerificationFieldsComponent', () => {
  let component: ProductAddVerificationFieldsComponent;
  let fixture: ComponentFixture<ProductAddVerificationFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAddVerificationFieldsComponent],
      imports: [FormsModule, ReactiveFormsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddVerificationFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
