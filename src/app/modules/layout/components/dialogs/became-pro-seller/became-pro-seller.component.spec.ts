import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecameProSellerComponent } from './became-pro-seller.component';

describe('BecameProSellerComponent', () => {
  let component: BecameProSellerComponent;
  let fixture: ComponentFixture<BecameProSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BecameProSellerComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecameProSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
