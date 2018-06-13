import { TestBed, inject } from '@angular/core/testing';

import { EmailSignupService } from './email-signup.service';

describe('EmailSignupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailSignupService]
    });
  });

  it('should be created', inject([EmailSignupService], (service: EmailSignupService) => {
    expect(service).toBeTruthy();
  }));
});
