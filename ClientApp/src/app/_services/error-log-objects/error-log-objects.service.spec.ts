import { TestBed } from '@angular/core/testing';

import { ErrorLogObjectsService } from './error-log-objects.service';

describe('ErrorLogObjectsService', () => {
  let service: ErrorLogObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorLogObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
