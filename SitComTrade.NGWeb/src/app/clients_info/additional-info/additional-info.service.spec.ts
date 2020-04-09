import { TestBed } from '@angular/core/testing';

import { AdditionalInfoService } from './additional-info.service';

describe('AdditionalInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdditionalInfoService = TestBed.get(AdditionalInfoService);
    expect(service).toBeTruthy();
  });
});
