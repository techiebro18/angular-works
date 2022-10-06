import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellForFreeDialogComponent } from './resell-for-free-dialog.component';

describe('ResellForFreeDialogComponent', () => {
  let component: ResellForFreeDialogComponent;
  let fixture: ComponentFixture<ResellForFreeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResellForFreeDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellForFreeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
