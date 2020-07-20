import { TestBed } from '@angular/core/testing';

import { AnswerObjectsService } from './answer-objects.service';

describe('AnswerObjectsService', () => {
  let service: AnswerObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
