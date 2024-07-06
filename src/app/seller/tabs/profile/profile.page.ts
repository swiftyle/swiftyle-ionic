import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public userService: UserService,
    private dataRefreshService: DataRefreshService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

}
