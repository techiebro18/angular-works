import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFilterListComponent } from './discount-filter-list.component';

describe.skip('DiscountFilterListComponent', () => {
  let component: DiscountFilterListComponent;
  let fixture: ComponentFixture<DiscountFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountFilterListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
