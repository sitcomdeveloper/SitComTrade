import { TestBed } from '@angular/core/testing';

import { MarketingInfoService } from './marketing-info.service';

describe('MarketingInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarketingInfoService = TestBed.get(MarketingInfoService);
    expect(service).toBeTruthy();
  });
});
