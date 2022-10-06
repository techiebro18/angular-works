import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageBarDroppableZoneComponent } from './vintage-bar-droppable-zone.component';

describe('VintageBarDroppableZoneComponent', () => {
  let component: VintageBarDroppableZoneComponent;
  let fixture: ComponentFixture<VintageBarDroppableZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VintageBarDroppableZoneComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageBarDroppableZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
