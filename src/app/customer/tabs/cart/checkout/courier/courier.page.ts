import { Component, OnInit } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

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

  constructor(
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is provided by the parent component
  ) {}

  ngOnInit() {}

  apply() {
    console.log('Selected Shipping:', this.selectedShipping);
    // Implement your apply logic here
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
