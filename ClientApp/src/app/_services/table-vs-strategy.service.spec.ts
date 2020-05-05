import { TestBed } from '@angular/core/testing';

import { TableVsStrategyService } from './table-vs-strategy.service';

describe('TableVsStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableVsStrategyService = TestBed.get(TableVsStrategyService);
    expect(service).toBeTruthy();
  });
});
