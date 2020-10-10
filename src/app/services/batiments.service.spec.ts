import { TestBed } from '@angular/core/testing';

import { BatimentsService } from './batiments.service';

describe('BatimentsService', () => {
  let service: BatimentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatimentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
