import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OnePageRegisterComponent } from './register.component';

describe.skip('OnePageRegisterComponent', () => {
  let component: OnePageRegisterComponent;
  let fixture: ComponentFixture<OnePageRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnePageRegisterComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePageRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
