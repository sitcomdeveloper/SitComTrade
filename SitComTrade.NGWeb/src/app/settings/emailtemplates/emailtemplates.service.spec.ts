import { TestBed } from '@angular/core/testing';

import { EmailtemplatesService } from './emailtemplates.service';

describe('EmailtemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailtemplatesService = TestBed.get(EmailtemplatesService);
    expect(service).toBeTruthy();
  });
});
