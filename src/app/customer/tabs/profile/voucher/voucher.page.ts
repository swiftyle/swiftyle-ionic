import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    public userService: UserService,
    private dataRefreshService: DataRefreshService,  // Assuming DataRefreshService is a service that provides data refresh functionality
  ) {}

  ngOnInit() {}

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
