import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMobileMenuComponent } from './user-mobile-menu.component';

describe('UserMobileMenuComponent', () => {
  let component: UserMobileMenuComponent;
  let fixture: ComponentFixture<UserMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMobileMenuComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
