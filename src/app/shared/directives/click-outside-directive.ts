import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';

@Directive({
  selector: '[app-click-outside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    const ignoreElement = (target as HTMLElement).classList.contains('ignore-click-outside');

    if (!clickedInside && !ignoreElement) this.clickOutside.emit();
  }
}
