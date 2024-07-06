import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent {
  @Input() attempts: number = 0;
  @Input() maxAttempts: number = 3;
  @Input() countdown: number = 0;

  constructor(private alertController: AlertController) {}

  async closeModal() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: this.attempts < this.maxAttempts ?
        'Incorrect password. Please, try again.' :
        `You reached the maximum amount of attempts. Please, try again in ${this.countdown} seconds.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
