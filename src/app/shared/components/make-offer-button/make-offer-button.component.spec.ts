import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOfferButtonComponent } from './make-offer-button.component';

describe('MakeOfferButtonComponent', () => {
  let component: MakeOfferButtonComponent;
  let fixture: ComponentFixture<MakeOfferButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeOfferButtonComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOfferButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
