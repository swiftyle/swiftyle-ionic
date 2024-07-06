import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { Router } from '@angular/router';

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
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/tabs/home']);
    });
  }
goToReceivePage() {
  this.navCtrl.navigateForward('/to-receive');
}
}
