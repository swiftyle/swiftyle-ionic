import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
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
  selector: 'app-refund',
  templateUrl: './refund.page.html',
  styleUrls: ['./refund.page.scss'],
})
export class RefundPage implements OnInit {
  @ViewChild('pageContent', { static: true }) pageContent!: IonContent;

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
  selectedShippingOption: string = 'Standard';
  total: string = 'Rp340.000';
  isVoucherModalOpen: boolean = false;
  isShippingModalOpen: boolean = false;
  isContactModalOpen: boolean = false;
  isShippingOptionsModalOpen: boolean = false;
  breakpoints: number[] = [0, 0.25, 0.5, 0.75, 1];
  initialBreakpoint: number = 0.25;
  voucherApplied: boolean = false;

  constructor(private dataRefreshService: DataRefreshService) {}

  ngOnInit() {}

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  changeShipping(optionType: string) {
    this.selectedShippingOption = optionType;
    this.shippingOptions.forEach(option => {
      option.selected = option.type === optionType;
    });

    if (optionType === 'Express') {
      this.total = 'Rp460.000';
    } else {
      this.total = 'Rp340.000';
    }
  }

  

  confirmOrder() {
    console.log('Order confirmed');
    console.log('Shipping address:', this.address);
    console.log('Contact information:', this.contact);
    console.log('Selected items:', this.items);
    console.log('Selected shipping option:', this.shippingOptions.find(option => option.selected));
    console.log('Total price:', this.total);
  }

  openVoucherModal() {
    this.isVoucherModalOpen = true;
  }

  closeVoucherModal() {
    this.isVoucherModalOpen = false;
  }

  applyVoucher() {
    this.voucherApplied = true;
    this.closeVoucherModal();
    this.total = 'Rp323.000';
  }

  removeVoucher() {
    this.voucherApplied = false;
    this.total = 'Rp340.000';
  }

  openShippingModal() {
    this.isShippingModalOpen = true;
  }

  closeShippingModal() {
    this.isShippingModalOpen = false;
  }

  saveShippingChanges() {
    // Handle saving changes and closing the modal
    this.isShippingModalOpen = false;
  }

  openContactModal() {
    this.isContactModalOpen = true;
  }

  closeContactModal() {
    this.isContactModalOpen = false;
  }

  saveContactChanges() {
    // Handle saving changes and closing the modal
    this.isContactModalOpen = false;
  }

  openShippingOptionsModal() {
    this.isShippingOptionsModalOpen = true;
  }

  closeShippingOptionsModal() {
    this.isShippingOptionsModalOpen = false;
  }

  saveShippingOptionsChanges() {
    // Handle saving changes and closing the modal
    this.isShippingOptionsModalOpen = false;
  }
}
