import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericMenuComponent } from './numeric-menu.component';

describe.skip('NumericMenuComponent', () => {
  let component: NumericMenuComponent;
  let fixture: ComponentFixture<NumericMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumericMenuComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
