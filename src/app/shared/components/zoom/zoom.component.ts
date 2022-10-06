import { Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit {
  @Input() zoomIn: Subject<boolean> = new Subject();
  @Input() zoomOut: Subject<boolean> = new Subject();
  @Input() resetZoom: Subject<boolean> = new Subject();
  @ContentChild('wrapper') wrapper: ElementRef;

  imageElement;
  draggingPosition = {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  };
  draggingEventStreamers = null;
  scale = 1;
  coords = {
    currentX: null,
    currentY: null,
    initialX: null,
    initialY: null,
    xOffset: 0,
    yOffset: 0,
  };

  constructor(private image: ElementRef) {}

  ngOnInit(): void {
    this.zoomIn.subscribe(() => this.zoomInSelectedImage());
    this.zoomOut.subscribe(() => this.zoomOutSelectedImage());
    this.resetZoom.subscribe(() => this.restoreZoom());
    this.image.nativeElement.children[0].ondragstart = () => false;

    this.setInitialState();
  }

  setInitialState() {
    this.imageElement = this.image.nativeElement.children[0];
    this.imageElement.style.transition = 'all ease .3s';
  }

  zoomInSelectedImage() {
    this.imageElement = this.image.nativeElement.children[0];

    this.scale += 1;

    this.updateImageSize();

    if (!this.draggingEventStreamers) {
      this.draggingEventStreamers = {
        mouseDownObserver: fromEvent(this.imageElement, 'mousedown'),
        touchStartObserver: fromEvent(this.imageElement, 'touchstart'),
        mouseMoveObserver: fromEvent(this.imageElement, 'mousemove'),
        touchMoveObserver: fromEvent(this.imageElement, 'touchmove'),
        mouseUpObserver: fromEvent(this.imageElement, 'mouseup'),
        touchEndObserver: fromEvent(this.imageElement, 'touchend'),
        mouseOutObserver: fromEvent(this.imageElement, 'mouseout'),
      };

      this.draggingEventStreamers.mouseDownSubscription
        = this.draggingEventStreamers.mouseDownObserver.subscribe(event => this.mouseDown(event));
      this.draggingEventStreamers.touchStartSubscription
        = this.draggingEventStreamers.touchStartObserver.subscribe(event => this.mouseDown(event));
    }
  }

  zoomOutSelectedImage() {
    if (!this.imageElement) return;

    if (this.scale === 1) return;

    this.scale -= 1;

    this.updateImageSize();
  }

  restoreZoom() {
    this.scale = 1;
    this.image.nativeElement.style.removeProperty('transform');
    this.imageElement?.style.removeProperty('transform');
    this.imageElement?.style.removeProperty('cursor');
    this.imageElement?.style.removeProperty('user-select');
    this.image.nativeElement?.parentElement?.style.removeProperty('display');

    this.draggingEventStreamers?.mouseMoveSubscription?.unsubscribe();
    this.draggingEventStreamers?.mouseUpSubscription?.unsubscribe();

    this.updateImageSize();
  }

  updateImageSize() {
    if (!this.imageElement) return;

    this.imageElement.style.transform = `scale3d(${this.scale}, ${this.scale}, 1)`;
  }

  mouseDown(event) {
    const wrapper = this.image.nativeElement.parentElement;

    this.imageElement.style.cursor = 'grabbing';
    this.imageElement.style.userSelect = 'none';

    if (event.type === 'touchstart') {
      this.coords.initialX = event.touches[0].clientX - this.coords.xOffset;
      this.coords.initialY = event.touches[0].clientY - this.coords.yOffset;
    }
    else {
      this.coords.initialX = event.clientX - this.coords.xOffset;
      this.coords.initialY = event.clientY - this.coords.yOffset;
    }

    this.draggingEventStreamers.mouseMoveSubscription
      = this.draggingEventStreamers.mouseMoveObserver.subscribe(event => this.mouseMove(event));
    this.draggingEventStreamers.touchMoveSubscription
      = this.draggingEventStreamers.touchMoveObserver.subscribe(event => this.mouseMove(event));
    this.draggingEventStreamers.mouseUpSubscription
      = this.draggingEventStreamers.mouseUpObserver.subscribe(this.mouseUp.bind(this));
    this.draggingEventStreamers.touchEndSubscription
      = this.draggingEventStreamers.touchEndObserver.subscribe(this.mouseUp.bind(this));
    this.draggingEventStreamers.mouseOutSubscription
      = this.draggingEventStreamers.mouseOutObserver.subscribe(this.mouseUp.bind(this));
  }

  mouseMove(event) {
    if (event.type === 'touchmove') {
      this.coords.currentX = event.touches[0].clientX - this.coords.initialX;
      this.coords.currentY = event.touches[0].clientY - this.coords.initialY;
    }
    else {
      this.coords.currentX = event.clientX - this.coords.initialX;
      this.coords.currentY = event.clientY - this.coords.initialY;
    }

    this.coords.xOffset = this.coords.currentX;
    this.coords.yOffset = this.coords.currentY;

    this.image.nativeElement.style.transform = `translate3d(${this.coords.currentX}px, ${this.coords.currentY}px, 0)`;
  }

  mouseUp() {
    this.imageElement.style.cursor = 'grab';
    this.imageElement.style.removeProperty('user-select');

    this.coords.initialX = this.coords.currentX;
    this.coords.initialY = this.coords.currentY;

    this.draggingEventStreamers.mouseMoveSubscription?.unsubscribe();
    this.draggingEventStreamers.mouseUpSubscription?.unsubscribe();

    this.draggingEventStreamers.mouseMoveSubscription = null;
    this.draggingEventStreamers.mouseUpSubscription = null;
  }

  ngOnDestroy(): void {
    this.draggingEventStreamers?.mouseDownSubscription?.unsubscribe();
    this.draggingEventStreamers?.mouseMoveSubscription?.unsubscribe();
    this.draggingEventStreamers?.mouseUpSubscription?.unsubscribe();
    this.imageElement = null;
  }
}
