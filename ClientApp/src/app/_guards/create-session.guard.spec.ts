import { TestBed, async, inject } from '@angular/core/testing';

import { CreateSessionGuard } from './create-session.guard';

describe('CreateSessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateSessionGuard]
    });
  });

  it('should ...', inject([CreateSessionGuard], (guard: CreateSessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
