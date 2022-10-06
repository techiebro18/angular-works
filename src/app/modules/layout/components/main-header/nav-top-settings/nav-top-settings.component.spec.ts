import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NavTopSettingsComponent } from './nav-top-settings.component';

describe.skip('NavTopSettingsComponent', () => {
  let component: NavTopSettingsComponent;
  let fixture: ComponentFixture<NavTopSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavTopSettingsComponent],
      imports: [HttpClientModule, TranslateModule],
      providers: [TranslateService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTopSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
