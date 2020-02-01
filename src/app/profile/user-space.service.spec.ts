import { TestBed } from '@angular/core/testing';

import { UserSpaceService } from './user-space.service';

describe('UserSpaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSpaceService = TestBed.get(UserSpaceService);
    expect(service).toBeTruthy();
  });
});
