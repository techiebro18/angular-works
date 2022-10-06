import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistProductsComponent } from './waitlist-products.component';

describe.skip('WaitlistProductsComponent', () => {
  let component: WaitlistProductsComponent;
  let fixture: ComponentFixture<WaitlistProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitlistProductsComponent],
      imports: [HttpClientModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
