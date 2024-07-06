import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  selectedOption!: string;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.selectedOption = 'whatsapp'; // Default option
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
    const correctOtp = '123456'; // This should be the OTP code sent to the user's phone
    if (this.otpCode === correctOtp) {
      setTimeout(() => {
        this.router.navigate(['/new-password']);
      }, 500);
    } else {
      // Handle incorrect OTP
      console.error('Incorrect OTP');
    }
  }

  resendCode() {
    // Handle resend code logic
    console.log('Resend code clicked');
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  next() {
    switch (this.selectedOption) {
      case 'whatsapp':
        // Implement WhatsApp password recovery here
        break;
      case 'email':
        this.navCtrl.navigateForward('/register');
        break;
      default:
        // Handle default case or show an error
        break;
    }
  }
  SendAgain(){
    
  }
}
