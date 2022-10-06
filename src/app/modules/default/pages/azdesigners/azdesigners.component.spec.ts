import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '@services/app/app.service';

import { AZDesignersComponent } from './azdesigners.component';

class AppServiceMock {
  getAppConfigurationValue() {
    return {
      languageID: 'test',
    };
  }
}

describe('AZDesignersComponent', () => {
  let component: AZDesignersComponent;
  let fixture: ComponentFixture<AZDesignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AZDesignersComponent],
      imports: [HttpClientModule, TranslateModule.forRoot()],
      providers: [{ provide: AppService, useClass: AppServiceMock }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AZDesignersComponent);
    component = fixture.componentInstance;
    component.currentAppConfiguaration = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
