import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAisInstantSearchModule } from 'angular-instantsearch';

import { ListingProductsComponent } from './listing-products.component';

declare global {
  interface Window {
    analytics: any;
  }
}

describe.skip('ListingProductsComponent', () => {
  let component: ListingProductsComponent;
  let fixture: ComponentFixture<ListingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingProductsComponent],
      imports: [NgAisInstantSearchModule.forRoot(), HttpClientModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
