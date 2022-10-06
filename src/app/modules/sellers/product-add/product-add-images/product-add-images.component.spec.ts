import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductAddImagesComponent } from './product-add-images.component';

describe.skip('ProductAddImagesComponent', () => {
  let component: ProductAddImagesComponent;
  let fixture: ComponentFixture<ProductAddImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAddImagesComponent],
      imports: [FormsModule, ReactiveFormsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
