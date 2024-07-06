import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
  ) {}

  // login.page.ts
  async next() {
    if (this.email) {
      localStorage.setItem('email', this.email);

        this.navCtrl.navigateForward('/password');
    } else {
      const toast = await this.toastController.create({
        message: 'Please enter your email.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
};
