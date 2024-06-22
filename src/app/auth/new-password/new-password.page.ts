import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {

  newPassword!: string;
  repeatPassword!: string;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.newPassword = '';
    this.repeatPassword = '';
  }

  resetPassword() {
    if (this.newPassword === this.repeatPassword) {
      this.navCtrl.navigateForward('/preference');
      console.log('Passwords match, proceed with reset.');
    } else {
      // Show error message if passwords do not match
      console.log('Passwords do not match.');
    }
  }
}
