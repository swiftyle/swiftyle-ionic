import { Component, OnInit } from '@angular/core';

interface ShippingOption {
  name: string;
  image: string;
}

@Component({
  selector: 'app-courier',
  templateUrl: './courier.page.html',
  styleUrls: ['./courier.page.scss'],
})
export class CourierPage implements OnInit {
  shippingOptions: ShippingOption[] = [
    {
      name: 'JNE',
      image: 'assets/images/jne.png'
    },
    {
      name: 'POS Indonesia',
      image: 'assets/images/pos-indonesia.png'
    },
    {
      name: 'TiKi',
      image: 'assets/images/tiki.png'
    }
  ];

  selectedShipping!: string;

  constructor() {}

  ngOnInit() {}

  apply() {
    console.log('Selected Shipping:', this.selectedShipping);
    // Implement your apply logic here
  }
}
