import { TestBed, inject } from '@angular/core/testing';

import { VoiceConversionService } from './voice-conversion.service';

describe('VoiceConversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceConversionService]
    });
  });

  it('should be created', inject([VoiceConversionService], (service: VoiceConversionService) => {
    expect(service).toBeTruthy();
  }));
});
