import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterDialogComponent } from './login-register-dialog.component';

describe('LoginRegisterDialogComponent', () => {
  let component: LoginRegisterDialogComponent;
  let fixture: ComponentFixture<LoginRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginRegisterDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
