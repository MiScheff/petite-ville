import { TestBed } from '@angular/core/testing';

import { JoueursService } from './joueurs.service';

describe('JoueursService', () => {
  let service: JoueursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoueursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
