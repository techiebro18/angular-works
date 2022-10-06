import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { OrderSuccessDetailComponent } from './order-success-detail.component';

describe('OrderSuccessDetailComponent', () => {
  let component: OrderSuccessDetailComponent;
  let fixture: ComponentFixture<OrderSuccessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSuccessDetailComponent],
      imports: [HttpClientModule, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessDetailComponent);
    component = fixture.componentInstance;
    component.orderItem = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
