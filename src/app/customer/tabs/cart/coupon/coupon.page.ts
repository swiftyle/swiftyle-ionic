import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {
  coupons = [
    {
      store: 'NIKE',
      discount: '10% OFF',
      validity: 'Valid from 01 May to 30 May 2024',
      code: 'NIKE2024',
    },
    {
      store: 'Walmart',
      discount: 'Rp100,000 OFF',
      validity: 'Valid from 01 May to 30 May 2024',
      code: 'WALMART2024',
    },
    {
      store: 'Woodies',
      discount: 'Get $10 Voucher',
      validity: 'Valid from 01 Mar to 30 Mar',
      code: 'WOODIES2024',
      progress: {
        current: 234,
        total: 4000,
      },
    },
  ];

  constructor(
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service provided by Angular
  ) {}

  ngOnInit() {}

  async copyCode(code: string) {
    await Clipboard.write({
      string: code,
    });
    alert('Code copied to clipboard!');
  }

  redeemNow(coupon: any) {
    alert(`Redeeming coupon: ${coupon.code}`);
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
