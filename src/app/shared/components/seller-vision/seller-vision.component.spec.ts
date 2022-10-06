import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerVisionComponent } from './seller-vision.component';

describe('SellerVisionComponent', () => {
  let component: SellerVisionComponent;
  let fixture: ComponentFixture<SellerVisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerVisionComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
