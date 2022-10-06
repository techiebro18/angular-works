import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { ListingViewComponent } from './listing-view.component';

describe.skip('ListingViewComponent', () => {
  let component: ListingViewComponent;
  let fixture: ComponentFixture<ListingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingViewComponent],
      imports: [HttpClientModule, RouterModule.forChild([])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
