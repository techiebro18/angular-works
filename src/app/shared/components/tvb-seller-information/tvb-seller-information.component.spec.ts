import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvbSellerInformationComponent } from './tvb-seller-information.component';

describe('TvbSellerInformationComponent', () => {
  let component: TvbSellerInformationComponent;
  let fixture: ComponentFixture<TvbSellerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvbSellerInformationComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvbSellerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
