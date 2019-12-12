import { TestBed } from '@angular/core/testing';

import { PreglediService } from './pregledi.service';

describe('PreglediService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreglediService = TestBed.get(PreglediService);
    expect(service).toBeTruthy();
  });
});
