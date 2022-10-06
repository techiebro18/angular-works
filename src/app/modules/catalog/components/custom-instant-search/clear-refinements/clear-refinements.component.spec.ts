import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAisInstantSearchModule, NgAisModule } from 'angular-instantsearch';

import { ClearRefinementsComponent } from './clear-refinements.component';

describe.skip('ClearRefinementsComponent', () => {
  let component: ClearRefinementsComponent;
  let fixture: ComponentFixture<ClearRefinementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearRefinementsComponent],
      imports: [NgAisInstantSearchModule.forRoot()],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearRefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
