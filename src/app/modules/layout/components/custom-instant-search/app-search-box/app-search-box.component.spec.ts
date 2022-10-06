import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAisInstantSearchModule, NgAisModule } from 'angular-instantsearch';

import { SearchBoxComponent } from './app-search-box.component';

describe.skip('PlpPaginationComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [NgAisInstantSearchModule.forRoot()],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
