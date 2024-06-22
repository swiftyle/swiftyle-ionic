import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {

  selectedOption!: string;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.selectedOption = 'email'; // Default option
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
        // Implement Google OAuth here
        window.location.href = 'https://accounts.google.com/o/oauth2/auth';
        break;
      case 'facebook':
        // Implement Facebook OAuth here
        window.location.href = 'https://www.facebook.com/dialog/oauth';
        break;
    }
  }

}
