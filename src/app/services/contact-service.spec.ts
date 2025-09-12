import { TestBed } from '@angular/core/testing';

import { contactService } from './contact-service';

describe('ContactService', () => {
  let service: contactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(contactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
