import { TestBed } from '@angular/core/testing';

import { StepsService } from './steps.service';

describe('StepsService', () => {
  let service: StepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(StepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
