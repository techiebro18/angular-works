import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductAddGeneralComponent } from './product-add-general.component';

describe.skip('ProductAddGeneralComponent', () => {
  let component: ProductAddGeneralComponent;
  let fixture: ComponentFixture<ProductAddGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAddGeneralComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forChild([])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
