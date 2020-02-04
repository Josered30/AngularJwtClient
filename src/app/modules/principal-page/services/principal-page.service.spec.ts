import { TestBed } from '@angular/core/testing';

import { PrincipalPageService } from './principal-page.service';

describe('PrincipalPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrincipalPageService = TestBed.get(PrincipalPageService);
    expect(service).toBeTruthy();
  });
});
