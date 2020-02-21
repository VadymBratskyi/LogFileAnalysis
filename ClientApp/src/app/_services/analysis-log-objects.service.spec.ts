import { TestBed } from '@angular/core/testing';

import { AnalysisLogObjectsService } from './analysis-log-objects.service';

describe('AnalysisLogObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalysisLogObjectsService = TestBed.get(AnalysisLogObjectsService);
    expect(service).toBeTruthy();
  });
});
