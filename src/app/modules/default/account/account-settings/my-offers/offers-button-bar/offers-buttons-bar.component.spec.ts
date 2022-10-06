import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersButtonsBarComponent } from './offers-buttons-bar.component';

describe('OffersButtonsBarComponent', () => {
  let component: OffersButtonsBarComponent;
  let fixture: ComponentFixture<OffersButtonsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersButtonsBarComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersButtonsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
