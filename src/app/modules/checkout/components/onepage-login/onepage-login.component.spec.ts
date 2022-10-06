import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { OnePageLoginComponent } from './onepage-login.component';

describe.skip('OnePageLoginComponent', () => {
  let component: OnePageLoginComponent;
  let fixture: ComponentFixture<OnePageLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnePageLoginComponent],
      imports: [TranslateModule, FormsModule, ReactiveFormsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
