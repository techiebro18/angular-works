import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFilterListComponent } from './price-filter-list.component';

describe.skip('PriceFilterListComponent', () => {
  let component: PriceFilterListComponent;
  let fixture: ComponentFixture<PriceFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceFilterListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
