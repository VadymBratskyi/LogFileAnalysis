import { TestBed } from '@angular/core/testing';

import { ShowLogObjectsService } from './show-log-objects.service';

describe('ShowLogObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowLogObjectsService = TestBed.get(ShowLogObjectsService);
    expect(service).toBeTruthy();
  });
});
