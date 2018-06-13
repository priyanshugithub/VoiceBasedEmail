import { TestBed, inject } from '@angular/core/testing';

import { EmailLoginService } from './email-login.service';

describe('EmailLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailLoginService]
    });
  });

  it('should be created', inject([EmailLoginService], (service: EmailLoginService) => {
    expect(service).toBeTruthy();
  }));
});
