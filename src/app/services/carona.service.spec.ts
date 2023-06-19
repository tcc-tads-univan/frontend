import { TestBed } from '@angular/core/testing';

import { CaronaService } from './carona.service';

describe('CaronaService', () => {
  let service: CaronaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaronaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
