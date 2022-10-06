import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselComponent } from './carousel.component';

@Component({
  selector: 'test-cmp',
  template: `
    <app-carousel>
      <ng-container class="slides">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quas ipsam quo rem tenetur non nihil
          inventore iure? Quas, ipsa?
        </li>

        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vero accusantium harum autem. Iusto vitae fugit
          iure eaque a id?
        </li>

        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem et architecto iste vel beatae atque provident
          accusantium sunt aliquam reprehenderit.
        </li>
      </ng-container>

      <ng-container class="thumbnails">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ng-container>
    </app-carousel>
  `,
})
class TestWrapperComponent {}

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CarouselComponent, TestWrapperComponent],
      imports: [BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render slides', () => {
    const { children } = component.galleryWrapper.nativeElement;

    expect(children.length).toBe(3);
    expect(children[0].textContent).toContain(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quas ipsam quo rem tenetur non nihil inventore iure? Quas, ipsa?'
    );
    expect(children[1].textContent).toContain(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vero accusantium harum autem. Iusto vitae fugit iure eaque a id?'
    );
    expect(children[2].textContent).toContain(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem et architecto iste vel beatae atque provident accusantium sunt aliquam reprehenderit.'
    );
  });

  it('navigates to the next item', () => {
    expect(component.selectedIndex).toEqual(0);

    component.navigateToTheNextImage();

    expect(component.selectedIndex).toEqual(1);
  });

  it('navigates to the previous item', () => {
    expect(component.selectedIndex).toEqual(0);

    component.navigateToTheNextImage();

    expect(component.selectedIndex).toEqual(1);

    component.navigateToThePreviousImage();

    expect(component.selectedIndex).toEqual(0);
  });

  it('navigates to an especific slide', () => {
    expect(component.selectedIndex).toEqual(0);

    component.selectedIndex = 2;
    component.navigateToSelectedIndex();

    expect(component.selectedIndex).toEqual(2);
  });
});
