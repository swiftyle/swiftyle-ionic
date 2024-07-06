import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NavController, ToastController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-edit-',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  user: any = {
    name: '',
    username: '',
    email: '',
    avatar: '',
    id: '',
  };

  avatarUrl: string | null = null;
  avatarFile: File | null = null;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private dataRefreshService: DataRefreshService,  // Assuming DataRefreshService is a service that handles data refreshing
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
  async loadUser() {
    try {
      const response: any = await this.apiService.getUser().toPromise();
      if (response && response.data && response.data.length > 0) {
        const user = response.data[0];
        const avatarUrl = `https://swiftyleshop.com/${user.avatar}`;
        this.user.id = user.id;
        this.user.name = user.name;
        this.user.username = user.username;
        this.user.email = user.email;
        this.user.avatar = avatarUrl;
        this.avatarUrl = avatarUrl;
        console.log('User  loaded:', this.user);
      } else {
        throw new Error('No user data found');
      }
    } catch (error) {
      console.error('Error loading user :', error);
      this.showToast('Failed to load user . Please try again later.', 'danger');
    }
  }

  onProfilePicClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(this.avatarFile);
    }
  }

  async saveChanges() {
    // Ensure user data is populated
    console.log('User data before save:', this.user); // Logging added
    if (!this.user.id) {
      console.error('User id not found.');
      return;
    }

    // If avatarFile is set, use FormData
    if (this.avatarFile) {
      const formData = new FormData();
      formData.append('avatar', this.avatarFile);
      formData.append('name', this.user.name);
      formData.append('username', this.user.username);
      formData.append('email', this.user.email);
      formData.append('id', this.user.id); // Assuming id is stored in the formData as well as in the user object. If it's stored differently, update this line accordingly.

      try {
        const response: any = await this.apiService
          .updateUser(formData, true)
          .toPromise();
        console.log('Update  Response:', response);
        const toast = await this.toastController.create({
          message: ' updated successfully',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.navCtrl.navigateBack('/tabs/profile');
      } catch (error) {
        console.error('Error updating :', error);
        const toast = await this.toastController.create({
          message: 'Failed to update . Please try again.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    } else {
      // If no avatarFile, update  without avatar change
      const userData = {
        id: this.user.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        avatar: this.user.avatar,
      };

      try {
        const response: any = await this.apiService
          .updateUser(userData)
          .toPromise();
        console.log('Update  Response:', response);
        const toast = await this.toastController.create({
          message: ' updated successfully',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.navCtrl.navigateBack('/tabs/profile');
      } catch (error) {
        console.error('Error updating :', error);
        const toast = await this.toastController.create({
          message: 'Failed to update . Please try again.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
