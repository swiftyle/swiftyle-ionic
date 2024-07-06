import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address/address.service';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {
  // Properties for address form
  firstName: string = '';
  lastName: string = '';
  selectedCountry: string = '';
  province: string = '';
  townCity: string = '';
  district: string = '';
  street: string = '';
  houseNumber: string = '';
  apartmentNumber: string = '';
  postcode: string = '';
  phoneNumber: string = '';
  addressType: string = '';
  isPrimary: boolean = false;
  addressId: string = ''; // Assuming you have addressId for update

  constructor(
    private toastController: ToastController,
    private addressService: AddressService,
    private navCtrl: NavController,
    private dataRefreshService: DataRefreshService, // Assuming you have a service for handling data refresh
  ) {}

  ngOnInit() {
    this.loadAddress();
  }
  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  async loadAddress() {
    try {
      await this.addressService.loadAddresses();
      if (this.addressService.addresses && this.addressService.addresses.length > 0) {
        const address = this.addressService.addresses[0]; // Assuming the first address is to be loaded
        this.addressId = address.id; // Set addressId for update
        this.firstName = address.firstname;
        this.lastName = address.lastname;
        this.selectedCountry = address.country;
        this.province = address.province;
        this.townCity = address.city;
        this.district = address.district;
        this.street = address.street;
        this.houseNumber = address.house_number;
        this.apartmentNumber = address.apartment_number;
        this.postcode = address.postal_code;
        this.phoneNumber = address.phone_number;
        this.addressType = address.type;
        this.isPrimary = address.primary === 1;
      }
    } catch (error) {
      this.showToast('Failed to load address. Please try again.', 'danger');
    }
  }

  async saveChanges() {
    const addressData = {
      id: this.addressId,  // Include ID for update
      firstname: this.firstName,
      lastname: this.lastName,
      country: this.selectedCountry,
      province: this.province,
      city: this.townCity,
      district: this.district,
      street: this.street,
      house_number: this.houseNumber,
      apartment_number: this.apartmentNumber,
      postal_code: this.postcode,
      phone_number: this.phoneNumber,
      type: this.addressType,
      primary: this.isPrimary ? 1 : 0,
    };

    try {
      if (this.addressId) {
        await this.addressService.updateAddress(addressData);
        this.showToast('Address updated successfully.', 'success');
      } else {
        await this.addressService.createAddress(addressData);
        this.showToast('Address saved successfully.', 'success');
      }
      this.navCtrl.navigateBack('/profile-setting');
    } catch (error) {
      this.showToast('Failed to save address. Please try again.', 'danger');
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
