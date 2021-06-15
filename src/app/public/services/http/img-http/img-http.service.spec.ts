import { TestBed } from '@angular/core/testing';

import { ImgHttpService } from './img-http.service';

describe('ImgHttpService', () => {
  let service: ImgHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
