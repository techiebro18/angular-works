import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { UploadConfirmationDialogComponent } from './upload-confirmation-dialog.component';

describe.skip('UploadConfirmationDialogComponent', () => {
  let component: UploadConfirmationDialogComponent;
  let fixture: ComponentFixture<UploadConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadConfirmationDialogComponent],
      imports: [MatDialogModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
