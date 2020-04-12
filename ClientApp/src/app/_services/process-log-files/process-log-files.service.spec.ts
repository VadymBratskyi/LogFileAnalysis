import { TestBed } from '@angular/core/testing';

import { ProcessLogFilesService } from './process-log-files.service';

describe('ProcessLogFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessLogFilesService = TestBed.get(ProcessLogFilesService);
    expect(service).toBeTruthy();
  });
});
