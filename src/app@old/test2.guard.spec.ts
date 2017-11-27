import { TestBed, async, inject } from '@angular/core/testing';

import { Test2Guard } from './test2.guard';

describe('Test2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Test2Guard]
    });
  });

  it('should ...', inject([Test2Guard], (guard: Test2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
