import { TestBed } from '@angular/core/testing';

import { TasksInfoService } from './tasks-info.service';

describe('TasksInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksInfoService = TestBed.get(TasksInfoService);
    expect(service).toBeTruthy();
  });
});
