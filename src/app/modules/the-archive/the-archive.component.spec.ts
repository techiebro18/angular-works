import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheArchiveComponent } from './the-archive.component';

describe('TheArchiveComponent', () => {
  let component: TheArchiveComponent;
  let fixture: ComponentFixture<TheArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheArchiveComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
