import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataRefreshService } from '../services/data-refresh/data-refresh.service';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {
  selectedOption!: string;

  constructor(private navCtrl: NavController,

    private dataRefreshService: DataRefreshService // Assuming DataRefreshService is a service that handles data refreshing
  ) {}

  ngOnInit() {
    this.selectedOption = 'email'; // Default option
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  next() {
    switch (this.selectedOption) {
      case 'email':
        this.navCtrl.navigateForward('/register');
        break;
      case 'google':
        this.googleLogin();
        break;
      case 'facebook':
        // Implement Facebook OAuth here
        window.location.href = 'https://www.facebook.com/dialog/oauth';
        break;
    }
  }

  googleLogin() {
    // this.googlePlus.login({})
    //   .then(res => {
    //     console.log(res);
    //     // Handle successful login here
    //     this.navCtrl.navigateForward('/home'); // Redirect to your home page
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     // Handle login error here
    //   });
  }
}
