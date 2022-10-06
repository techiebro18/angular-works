import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { OrderSuccessDetailMobileComponent } from './order-success-detail-mobile.component';

describe('OrderSuccessDetailComponent', () => {
  let component: OrderSuccessDetailMobileComponent;
  let fixture: ComponentFixture<OrderSuccessDetailMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSuccessDetailMobileComponent],
      imports: [HttpClientModule, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessDetailMobileComponent);
    component = fixture.componentInstance;
    component.orderItem = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
