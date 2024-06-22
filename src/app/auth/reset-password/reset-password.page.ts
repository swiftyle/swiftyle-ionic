import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  selectedOption!: string;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.selectedOption = 'whatsapp'; // Default option
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  next() {
    switch (this.selectedOption) {
      case 'whatsapp':
        this.navCtrl.navigateForward('/otp');
        break;
      case 'email':
        this.navCtrl.navigateForward('/register');
        break;
      default:
        // Handle default case or show an error
        break;
    }
  }
}
