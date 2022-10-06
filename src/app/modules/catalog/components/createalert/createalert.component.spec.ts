import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CreatealertComponent } from './createalert.component';

declare global {
  interface Window {
    analytics: any;
  }
}

describe.skip('CreatealertComponent', () => {
  let component: CreatealertComponent;
  let fixture: ComponentFixture<CreatealertComponent>;

  window.analytics = {
    identify: jest.fn(),
    page: jest.fn(),
    track: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatealertComponent],
      providers: [BsModalService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
