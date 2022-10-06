import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MyOrdersDetailsComponent } from './my-orders-details.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

describe('MyOrdersDetailsComponent', () => {
  let component: MyOrdersDetailsComponent;
  let fixture: ComponentFixture<MyOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyOrdersDetailsComponent, OrderDetailComponent],
      imports: [MatProgressSpinnerModule, TranslateModule.forRoot(), HttpClientModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnDestroy();
  });
});
