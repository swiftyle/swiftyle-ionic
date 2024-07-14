import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, AfterViewInit {
  @ViewChild('otp1') otp1!: ElementRef;
  @ViewChild('otp2') otp2!: ElementRef;
  @ViewChild('otp3') otp3!: ElementRef;
  @ViewChild('otp4') otp4!: ElementRef;
  @ViewChild('otp5') otp5!: ElementRef;
  @ViewChild('otp6') otp6!: ElementRef;

  otpCode: string = '';
  email: string = '';
  otp: string = '';
  selectedOption!: string;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.email = await this.storage.get('email') || '';
  }

  ngAfterViewInit() {
    this.setupOtpInputs();
  }

  setupOtpInputs() {
    const otpInputs = [
      this.otp1.nativeElement,
      this.otp2.nativeElement,
      this.otp3.nativeElement,
      this.otp4.nativeElement,
      this.otp5.nativeElement,
      this.otp6.nativeElement,
    ];

    otpInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
        this.otpCode = otpInputs.map(input => input.value).join('');
        if (this.otpCode.length === 6) {
          this.verifyOtp();
        }
      });

      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
          if (input.value === '' && index > 0) {
            otpInputs[index - 1].focus();
            otpInputs[index - 1].value = '';
          } else {
            input.value = '';
          }
        }
      });
    });
  }

  moveToNext(event: Event, nextId: string | null) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextId) {
      const nextInput = document.getElementById(nextId) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  verifyOtp() {
    const payload = { otp: this.otpCode };
    console.log('Verifying OTP with payload:', payload);

    this.apiService.verifyEmailOtp(payload).subscribe(
      (response) => {
        if (response.token) {
          console.log('OTP verified successfully', response);

          // Store the bearer token in localStorage
          localStorage.setItem('bearerToken', response.token);

          // Navigate to the preferences page
          this.router.navigate(['/preference']);
        } else {
          console.error('Invalid OTP response');
        }
      },
      (error) => {
        console.error('Error verifying OTP', error);
      }
    );
  }

  resendCode() {
    const email = this.email;
    this.apiService.resendEmailOtp(email).subscribe(
      (response) => {
        console.log('OTP resent successfully');
      },
      (error) => {
        console.error('Error resending OTP', error);
      }
    );
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
