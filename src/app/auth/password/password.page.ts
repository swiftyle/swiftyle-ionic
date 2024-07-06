import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  password: string = '';
  email: string = '';
  profilePicture: string = 'assets/images/profile/1.png';
  userName: string = '';
  userEmail: string = '';
  progress: number = 0;
  isError: boolean = false;
  attempts: number = 0;
  maxAttempts: number = 3;
  showModal: boolean = false;
  countdown: number = 0;
  countdownInterval: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    this.loadUser();
  }

  async loadUser() {
    try {
      const response: any = await this.apiService.getUser().toPromise();
      if (response && response.data && response.data.length > 0) {
        const user = response.data[0];
        const avatarUrl = `https://swiftyleshop.com/${user.avatar}`;
        this.userName = user.name;
        this.userEmail = user.email;
        this.profilePicture = avatarUrl;
        console.log('User loaded:', user);
      } else {
        throw new Error('No user data found');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      const toast = await this.toastController.create({
        message: 'Failed to load user. Please try again later.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

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

  async checkPassword() {
    if (this.email && this.password) {
      const data = { email: this.email, password: this.password };

      console.log('Sending login request with data:', data); // Debug log

      try {
        const response: any = await this.http.post('https://swiftyleshop.com/api/login', data).toPromise();
        console.log('API Response:', response); // Debug log

        if (response && response.bearer) {
          // Store the bearer token in localStorage
          localStorage.setItem('bearerToken', response.bearer);
          this.isError = false;
          this.attempts = 0; // Reset attempts on success
          const toast = await this.toastController.create({
            message: 'Login successful',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          // Reload user after successful login
          this.loadUser();
          this.checkUserPreferences();
        } else {
          this.handleLoginError(response.message || 'Login failed');
        }
      } catch (error) {
        console.error('API Error:', error); // Debug log
        this.handleLoginError('Login failed. Please try again.');
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Please enter your password.',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
    }
  }

  async checkUserPreferences() {
    try {
      const response: any = await this.apiService.getUserPreferences().toPromise();
      if (response && response.data && response.data.length > 0) {
        // User has preferences, navigate to home
        this.router.navigate(['/tabs/home']);
      } else {
        // User does not have preferences, navigate to preference page
        this.router.navigate(['/preference']);
      }
    } catch (error) {
      console.error('Error checking user preferences:', error);
      const toast = await this.toastController.create({
        message: 'Failed to check user preferences. Please try again later.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  async handleLoginError(message: string) {
    this.isError = true;
    this.attempts++;
    this.showModal = true;

    if (this.attempts >= this.maxAttempts) {
      this.startCountdown();
    }

    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
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
