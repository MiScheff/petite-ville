import { TestBed } from '@angular/core/testing';

import { EvenementsService } from './evenements.service';

describe('EvenementsService', () => {
  let service: EvenementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
