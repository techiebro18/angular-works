import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { ZoomComponent } from './zoom.component';

@Component({
  selector: 'test-cmp',
  template: `
    <app-zoom [zoomIn]="onZoomIn" [zoomOut]="onZoomOut" [resetZoom]="onResetZoom">
      <img src="image.img" loading="lazy" />
    </app-zoom>
  `,
})
class TestWrapperComponent {
  onZoomIn;
  onZoomOut;
  onResetZoom;

  setZoomIn(callback) {
    this.onZoomIn = callback;
  }

  setZoomOut(callback) {
    this.onZoomOut = callback;
  }

  setResetZoom(callback) {
    this.onResetZoom = callback;
  }
}

describe('ZoomComponent', () => {
  let component: ZoomComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  const zoomIn: Subject<boolean> = new Subject();
  const zoomOut: Subject<boolean> = new Subject();
  const resetZoom: Subject<boolean> = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ZoomComponent, TestWrapperComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);

    fixture.componentInstance.setZoomIn(zoomIn);
    fixture.componentInstance.setZoomOut(zoomOut);
    fixture.componentInstance.setResetZoom(resetZoom);

    component = fixture.debugElement.children[0].componentInstance;
    component.zoomOut = new Subject();

    fixture.detectChanges();
  });

  it('should create', () => {
    component.zoomIn = zoomIn;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
