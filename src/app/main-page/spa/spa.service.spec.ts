import { TestBed, inject } from '@angular/core/testing';

import { SpaService } from './spa.service';

describe('SpaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpaService]
    });
  });

  it('should be created', inject([SpaService], (service: SpaService) => {
    expect(service).toBeTruthy();
  }));
});
