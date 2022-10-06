import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgAisInstantSearchModule } from 'angular-instantsearch';

import { RefinmentListComponent } from './refinment-list.component';

describe.skip('RefinmentListComponent', () => {
  let component: RefinmentListComponent;
  let fixture: ComponentFixture<RefinmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefinmentListComponent],
      imports: [NgAisInstantSearchModule, TranslateModule.forRoot()],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
