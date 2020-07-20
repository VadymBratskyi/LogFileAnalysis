import { TestBed } from '@angular/core/testing';

import { StatusesErrorObjectsService } from './statuses-error-objects.service';

describe('StatusesErrorObjectsService', () => {
  let service: StatusesErrorObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusesErrorObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
