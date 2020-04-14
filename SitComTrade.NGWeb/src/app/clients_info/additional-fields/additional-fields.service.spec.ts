import { TestBed } from '@angular/core/testing';

import { AdditionalFieldsService } from './additional-fields.service';

describe('AdditionalFieldsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdditionalFieldsService = TestBed.get(AdditionalFieldsService);
    expect(service).toBeTruthy();
  });
});
