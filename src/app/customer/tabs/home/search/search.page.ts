import { Component } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  searchHistory: string[] = ['Socks', 'Red Dress', 'Sunglasses', 'Mustard Pants', '80-s Skirt'];
  recommendations: string[] = ['Skirt', 'Accessories', 'Black T-Shirt', 'Jeans', 'White Shoes'];
  products: Array<{ img: string; description: string; price: string }> = [
    { img: 'assets/images/product1.jpg', description: 'Lorem ipsum dolor sit amet consectetur.', price: 'Rp125.000' },
    { img: 'assets/images/product2.jpg', description: 'Lorem ipsum dolor sit amet consectetur.', price: 'Rp320.000' },
    { img: 'assets/images/product3.jpg', description: 'Lorem ipsum dolor sit amet consectetur.', price: 'Rp210.000' },
  ];

  constructor(
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service provided by your Angular app
  ) {}

  clearSearchHistory() {
    this.searchHistory = [];
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
