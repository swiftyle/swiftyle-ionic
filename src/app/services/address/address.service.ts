import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addresses: any[] = [];
  private addressesLoaded = false;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  async loadAddresses(): Promise<any[]> {
    if (this.addressesLoaded) {
      return this.addresses;
    }

    try {
      const response: any = await this.apiService.getAddresses().toPromise();
      if (response && response.data && response.data.length > 0) {
        this.addresses = response.data;
        this.addressesLoaded = true;
        console.log('Addresses loaded:', this.addresses);
      } else {
        throw new Error('No addresses data found');
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      this.showToast('Failed to load addresses. Please try again later.', 'danger');
    }
    return this.addresses;
  }

  async createAddress(addressData: any) {
    try {
      const response: any = await this.apiService.createAddress(addressData).toPromise();
      this.addresses.push(response.data);
      console.log('Address created:', response.data);
      this.showToast('Address created successfully.', 'success');
    } catch (error) {
      console.error('Error creating address:', error);
      this.showToast('Failed to create address. Please try again later.', 'danger');
    }
  }

  async updateAddress(addressData: any) {
    try {
      const response: any = await this.apiService.updateAddress(addressData).toPromise();
      const index = this.addresses.findIndex(address => address.id === addressData.id);
      if (index !== -1) {
        this.addresses[index] = response.data;
      }
      console.log('Address updated:', response.data);
      this.showToast('Address updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating address:', error);
      this.showToast('Failed to update address. Please try again later.', 'danger');
    }
  }

  async deleteAddress(addressId: string) {
    try {
      await this.apiService.deleteAddress(addressId).toPromise();
      this.addresses = this.addresses.filter(address => address.id !== addressId);
      console.log('Address deleted:', addressId);
      this.showToast('Address deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting address:', error);
      this.showToast('Failed to delete address. Please try again later.', 'danger');
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
