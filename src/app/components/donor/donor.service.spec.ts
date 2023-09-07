import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoginService } from '../login/login.service';

import { DonorService } from './donor.service';

describe('DonorService', () => {
  let service: DonorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have findByUsernameAPI', () => {
    expect(service.findByUsernameAPI).toBeTruthy();
  })
  it('should have username null', () => {
    expect(service.username).toEqual(null);
  })
  
});
