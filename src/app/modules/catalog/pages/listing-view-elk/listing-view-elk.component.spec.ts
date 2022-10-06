import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingViewElkComponent } from './listing-view-elk.component';

describe('ListingViewElkComponent', () => {
  let component: ListingViewElkComponent;
  let fixture: ComponentFixture<ListingViewElkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingViewElkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingViewElkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
