import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionFilterListComponent } from './condition-filter-list.component';

describe('ConditionFilterListComponent', () => {
  let component: ConditionFilterListComponent;
  let fixture: ComponentFixture<ConditionFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConditionFilterListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
