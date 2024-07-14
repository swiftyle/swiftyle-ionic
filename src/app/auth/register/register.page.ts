import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register/register.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  name: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  avatar: File | null = null;
  avatarUrl: string | null = null;
  errorMessage: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';

  constructor(
    private renderer: Renderer2,
    private registerService: RegisterService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    const content = document.querySelector('ion-content');
    if (content) {
      this.renderer.setStyle(
        content,
        'background',
        'url(./assets/images/bg/create.png) no-repeat top / cover'
      );
    }
  }

  onProfilePicClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.avatar = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.avatarUrl = reader.result as string);
      reader.readAsDataURL(this.avatar);
    }
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }

  onSubmit() {
    const registerData = new FormData();
    registerData.append('name', this.name);
    registerData.append('email', this.email);
    registerData.append('password', this.password);
    registerData.append('phone_number', this.phoneNumber);
    if (this.avatar) {
      registerData.append('avatar', this.avatar);
    }

    this.registerService.register(registerData).subscribe(
      async (response) => {
        console.log('Registration successful', response);

        // Store the bearer token in localStorage
        localStorage.setItem('bearerToken', response.token);

        // Store the email in Ionic Storage
        await this.storage.set('email', this.email);

        // Navigate to OTP page
        this.navCtrl.navigateForward('otp');
      },
      (error) => {
        console.error('Registration error', error);
        if (error.status === 422) {
          this.errorMessage = this.parseErrorResponse(error);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  private parseErrorResponse(error: any): string {
    if (error.error && error.error.errors) {
      const errors = Object.values(error.error.errors);
      const flattenedErrors = this.flattenArray(errors);
      return flattenedErrors.join(', ');
    }
    return 'An error occurred. Please check your input and try again.';
  }

  private flattenArray(arr: any[]): any[] {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val)
          ? acc.concat(this.flattenArray(val))
          : acc.concat(val),
      []
    );
  }
}
