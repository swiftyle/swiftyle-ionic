import { TestBed } from '@angular/core/testing';

import { AppCouponService } from './app-coupon.service';

describe('AppCouponService', () => {
  let service: AppCouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
