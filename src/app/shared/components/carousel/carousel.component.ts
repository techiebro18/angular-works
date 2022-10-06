import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          filter: 'blur(10px)',
        })
      ),
      transition('open => closed', [animate('.1s')]),
      transition('closed => open', [animate('.5s')]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  @ViewChild('galleryWrapper') galleryWrapper: ElementRef;
  @ViewChild('thumbnailsWrapper') thumbnailsWrapper: ElementRef;
  @ContentChildren(TemplateRef) items: QueryList<any>;
  @Input() thumbnails;
  @Input() isFullscreen;
  @Input() theme: 'dark' | 'light';
  @Input() onFullscreenToggle: Subject<boolean> = new Subject();
  @Output() onIndexSelectionChange = new EventEmitter();

  selectedIndex = 0;
  galleryScrollSubscription: Subscription;
  thumbnailClickEvents: Subscription[] = [];
  selectedListItem: any = null;
  slideElements;
  ignoreScrollEvents = false;
  isOpen = true;

  constructor() {}

  ngOnInit(): void {
    this.onFullscreenToggle.subscribe(() => {
      this.isOpen = !this.isOpen;

      setTimeout(() => this.navigateToSelectedIndex(), 300);
      setTimeout(() => {
        this.isOpen = !this.isOpen;
      }, 600);
    });
  }

  ngAfterViewInit() {
    this.slideElements = this.galleryWrapper.nativeElement.children;

    if (!this.thumbnailsWrapper.nativeElement.children.length) return;

    this.thumbnailsWrapper.nativeElement.children[0].classList.toggle('selected');

    this.galleryScrollSubscription = fromEvent(
      this.galleryWrapper.nativeElement,
      'scroll'
    ).subscribe(event => this.updateSelectedIndex(event));

    [...this.thumbnailsWrapper.nativeElement.children].forEach((thumbnail, index) => {
      this.thumbnailClickEvents[index] = fromEvent(thumbnail, 'click').subscribe(() =>
        this.selectImageFromThumbnail(index)
      );
    });

    fromEvent(this.galleryWrapper.nativeElement, 'resize').subscribe(() => console.log('RESIZE'));
  }

  navigateToSelectedIndex() {
    const window
      = this.galleryWrapper.nativeElement.children[this.selectedIndex].getBoundingClientRect().width;

    this.galleryWrapper.nativeElement.scrollLeft = window * this.selectedIndex;
    this.onIndexSelectionChange.emit(this.selectedIndex);
  }

  selectImageFromThumbnail(index) {
    this.thumbnailsWrapper.nativeElement.children[this.selectedIndex].classList.remove('selected');

    this.selectedIndex = index;
    this.ignoreScrollEvents = true;

    this.thumbnailsWrapper.nativeElement.children[this.selectedIndex].classList.add('selected');

    this.navigateToSelectedIndex();
  }

  navigateToTheNextImage() {
    if (this.selectedIndex === this.slideElements.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex += 1;
    }

    this.navigateToSelectedIndex();
  }

  navigateToThePreviousImage() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.slideElements.length - 1;
    }
    else {
      this.selectedIndex -= 1;
    }

    this.navigateToSelectedIndex();
  }

  updateSelectedIndex(event) {
    if (!this.isOpen) return;

    const newSelectedIndex = Math.round(event.target.scrollLeft / event.target.offsetWidth);

    if (newSelectedIndex === this.selectedIndex) {
      return;
    }

    const thumbnailsElement = this.thumbnailsWrapper.nativeElement;

    thumbnailsElement.children[this.selectedIndex].classList.remove('selected');
    thumbnailsElement.children[newSelectedIndex].classList.add('selected');

    this.selectedIndex = newSelectedIndex;

    this.onIndexSelectionChange.emit(`${this.selectedIndex}`);
    this.alignThumbnails();

    // This setTimeout is here, because 'complete' is never fired on this.galleryScrollSubscription
    if (this.ignoreScrollEvents) {
      setTimeout(() => (this.ignoreScrollEvents = false), 600);
    }
  }

  alignThumbnails() {
    if (this.ignoreScrollEvents) return;

    const thumbnailsElement = this.thumbnailsWrapper.nativeElement;
    const { offsetWidth } = thumbnailsElement;
    const thumbnailsElementWidth
      = thumbnailsElement.children[this.selectedIndex].getBoundingClientRect().width;
    let expectedDistance = thumbnailsElementWidth * this.selectedIndex;

    expectedDistance
      = expectedDistance - (Math.round(offsetWidth / 2) - Math.round(thumbnailsElementWidth / 2));

    if (expectedDistance === thumbnailsElement.scrollLeft) return;

    thumbnailsElement.scrollTo(expectedDistance, 0);
  }

  ngOnDestroy(): void {
    this.galleryScrollSubscription?.unsubscribe();
    this.thumbnailClickEvents?.forEach(subscription => subscription?.unsubscribe());
  }
}
