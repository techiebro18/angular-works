import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAisInstantSearchModule, NgAisModule } from 'angular-instantsearch';

import { PlpPaginationComponent } from './app-pagination.component';

describe.skip('PlpPaginationComponent', () => {
  let component: PlpPaginationComponent;
  let fixture: ComponentFixture<PlpPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlpPaginationComponent],
      imports: [NgAisInstantSearchModule.forRoot()],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlpPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
