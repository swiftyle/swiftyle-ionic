import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  password: string = '';
  correctPassword: string = '12345678'; // Example correct password
  progress: number = 0;
  isError: boolean = false;
  attempts: number = 0;
  maxAttempts: number = 3;
  showModal: boolean = false;
  countdown: number = 0;
  countdownInterval: any;

  constructor(private router: Router) {}

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;

    this.updateProgress();

    if (this.password.length === 8) {
      this.checkPassword();
    }
  }

  updateProgress() {
    this.progress = (this.password.length / 8) * 100;
  }

  checkPassword() {
    if (this.password === this.correctPassword) {
      this.isError = false;
      this.attempts = 0; // Reset attempts on success
      setTimeout(() => {
        this.router.navigate(['/preference']);
      }, 500);
    } else {
      this.isError = true;
      this.attempts++;
      this.showModal = true;

      if (this.attempts >= this.maxAttempts) {
        this.startCountdown();
      }
    }
  }

  startCountdown() {
    this.countdown = 60;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  closeModal() {
    this.showModal = false;
    if (this.attempts >= this.maxAttempts && this.countdown > 0) {
      console.log('Max attempts reached. Please wait for the countdown.');
    }
  }
}
