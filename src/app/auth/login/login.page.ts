// login.page.ts
import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(private navCtrl: NavController) {}

  login() {
    // Handle login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  forgotPassword() {
    // Navigate to forgot password page
    this.navCtrl.navigateForward('/forgot-password');
  }
  ngAfterViewInit() {
    const title = document.querySelector('.title') as HTMLElement;
    const subtitle = document.querySelector('.subtitle') as HTMLElement;
    const form = document.querySelector('form') as HTMLElement;

    function adjustLayout() {
      const isKeyboardOpen = window.innerHeight < window.outerHeight * 0.85;

      if (isKeyboardOpen) {
        title.style.top = '40%';
        subtitle.style.top = '55%';
        form.style.marginTop = '58%';
      } else {
        title.style.top = '58%';
        subtitle.style.top = '68%';
        form.style.marginTop = '120%';
      }
    }

    window.addEventListener('resize', adjustLayout);
    window.addEventListener('orientationchange', adjustLayout);
    adjustLayout(); // Initial adjustment
  }
}
