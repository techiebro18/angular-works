import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.scss'],
})
export class ImagesCarouselComponent implements OnInit {
  @HostBinding('class.fullscreen') isFullscreen = false;
  @ViewChild('galleryWrapper') galleryWrapper: ElementRef;
  @ViewChild('thumbnailsWrapper') thumbnailsWrapper: ElementRef;

  @Input() images: Array<{ img: string; thumbnail: string }>;
  @Input() discovers: Array<{ lang: string; value: string }>;

  selectedIndex = 0;
  selectedListItem: any = null;
  onZoomIn: Subject<boolean> = new Subject();
  onZoomOut: Subject<boolean> = new Subject();
  onResetZoom: Subject<boolean> = new Subject();
  onFullscreenToggle: Subject<boolean> = new Subject();
  weLoveTag = false;

  constructor() {}

  ngOnInit(): void {
    this.weLoveTag = this.discovers.filter(e => e.value === 'we-love').length > 0;
  }

  onSelectedIndexChanged(newIndex) {
    this.onResetZoom.next(true);
    this.selectedIndex = newIndex;
  }

  toggleFullscreen() {
    this.onFullscreenToggle.next(!this.isFullscreen);
    this.isFullscreen = !this.isFullscreen;
    this.onResetZoom.next(true);
  }

  zoomInSelectedImage() {
    this.onZoomIn.next(true);
  }

  zoomOutSelectedImage() {
    this.onZoomOut.next(true);
  }

  resetZoom() {
    this.onResetZoom.next(true);
  }
}
