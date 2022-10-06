import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBioComponent } from './user-bio.component';

describe('UserBioComponent', () => {
  let component: UserBioComponent;
  let fixture: ComponentFixture<UserBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBioComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
