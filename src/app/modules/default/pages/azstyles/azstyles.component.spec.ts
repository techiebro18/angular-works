import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzstylesComponent } from './azstyles.component';

describe('AzstylesComponent', () => {
  let component: AzstylesComponent;
  let fixture: ComponentFixture<AzstylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AzstylesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzstylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
