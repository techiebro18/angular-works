import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '@services/app/app.service';

import { OrderSuccessComponent } from './order-success.component';

class AppServiceMock {
  getAppConfigurationValue() {
    return {
      languageID: 'test',
    };
  }
}

describe('OrderSuccessComponent', () => {
  let component: OrderSuccessComponent;
  let fixture: ComponentFixture<OrderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSuccessComponent],
      imports: [HttpClientModule, TranslateModule.forRoot()],
      providers: [{ provide: AppService, useClass: AppServiceMock }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessComponent);
    component = fixture.componentInstance;
    component.currentAppConfiguaration = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
