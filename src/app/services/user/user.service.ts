import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = {};

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {
    this.loadUser();
  }

  public async loadUser(): Promise<any> { // Make loadUser public and return user data
    try {
      const response: any = await this.apiService.getUser().toPromise();
      if (response && response.data && response.data.length > 0) {
        const user = response.data[0];
        const avatarUrl = `https://swiftyleshop.com/${user.avatar}`;
        this.user.id = user.id; // Ensure id is set
        this.user.name = user.name;
        this.user.email = user.email;
        this.user.avatar = avatarUrl;
        this.user.phone_number = user.phone_number; // Ensure phone number is set
        console.log('User loaded:', user);
        return this.user; // Return the user data
      } else {
        throw new Error('No user data found');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      this.showToast('Failed to load user. Please try again later.', 'danger');
      throw error; // Re-throw the error to handle it in the calling function
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.apiService.deleteUser(userId).toPromise();
      this.user = {};
      console.log('User deleted:', userId);
      this.showToast('User deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
      this.showToast('Failed to delete user. Please try again later.', 'danger');
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
