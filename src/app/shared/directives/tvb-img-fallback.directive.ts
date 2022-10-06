import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[tvb-img-fallback]',
})
export class TvbImgFallbackDirective {
  @Input() tvbImgFallback: string;

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;

    element.src = this.tvbImgFallback || 'assets/images/placeholder.png';
  }
}
