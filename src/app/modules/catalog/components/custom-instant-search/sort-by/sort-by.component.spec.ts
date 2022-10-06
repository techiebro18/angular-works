import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAisInstantSearchModule } from 'angular-instantsearch';

import { SortByComponent } from './sort-by.component';

describe.skip('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortByComponent],
      imports: [NgAisInstantSearchModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
