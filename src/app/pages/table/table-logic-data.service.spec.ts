import { TestBed } from '@angular/core/testing';

import { TableLogicDataService } from './table-logic-data.service';

describe('TableLogicDataService', () => {
  let service: TableLogicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableLogicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
