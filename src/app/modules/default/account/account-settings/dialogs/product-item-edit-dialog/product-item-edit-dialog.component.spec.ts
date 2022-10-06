import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductItemEditDialogComponent } from './product-item-edit-dialog.component';

describe.skip('ProductItemEditDialogComponent', () => {
  let component: ProductItemEditDialogComponent;
  let fixture: ComponentFixture<ProductItemEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemEditDialogComponent],
      imports: [FormsModule, ReactiveFormsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
