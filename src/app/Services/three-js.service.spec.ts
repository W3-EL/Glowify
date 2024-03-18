import { TestBed } from '@angular/core/testing';

import { ThreeJSService } from './three-js.service';

describe('ThreeJSService', () => {
  let service: ThreeJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
