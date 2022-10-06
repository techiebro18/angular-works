import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../app/app.module';

import { SellersComponent } from './sellers.component';
import { APP_BASE_HREF } from '@angular/common';

jest.mock('instantsearch.js');

declare global {
  interface Window {
    consentManagerConfig: any;
  }
}

describe('SellersComponent', () => {
  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
