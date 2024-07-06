import { Component } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

interface Item {
  img: string;
  description: string;
  price: string;
}

interface ShippingOption {
  type: string;
  days: string;
  price: string;
  selected: boolean;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage {
  address: string = '26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city';
  contact: { phone: string, email: string } = { phone: '+84932000000', email: 'amandamorgan@example.com' };
  items: Item[] = [
    { img: 'assets/images/item1.jpg', description: 'Lorem ipsum dolor sit amet consectetur.', price: 'Rp175.000' },
    { img: 'assets/images/item2.jpg', description: 'Lorem ipsum dolor sit amet consectetur.', price: 'Rp200.000' }
  ];
  shippingOptions: ShippingOption[] = [
    { type: 'Standard', days: '5-7 days', price: 'FREE', selected: true },
    { type: 'Express', days: '1-2 days', price: 'Rp120.000', selected: false }
  ];
  total: string = 'Rp340.000';
  isModalOpen: boolean = false;

  constructor(
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service that handles data refreshing
  ) {}

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
  changeShipping(optionType: string) {
    this.shippingOptions.forEach(option => {
      option.selected = option.type === optionType;
    });

    // Update the total price based on the selected shipping option
    if (optionType === 'Express') {
      this.total = 'Rp460.000'; // Example updated total when Express shipping is selected
    } else {
      this.total = 'Rp340.000'; // Example updated total when Standard shipping is selected
    }
  }

  confirmOrder() {
    // Logic to confirm the order
    console.log('Order confirmed');
    console.log('Shipping address:', this.address);
    console.log('Contact information:', this.contact);
    console.log('Selected items:', this.items);
    console.log('Selected shipping option:', this.shippingOptions.find(option => option.selected));
    console.log('Total price:', this.total);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges() {
    // Logic to save the changes
    this.closeModal();
  }
}
