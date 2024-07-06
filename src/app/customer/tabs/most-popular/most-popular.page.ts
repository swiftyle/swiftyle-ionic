import { Component } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.page.html',
  styleUrls: ['./most-popular.page.scss'],
})
export class MostPopularPage {
  selectedSegment: string = 'today';

  todayItems = [
    { img: 'assets/img/item1.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: 'Rp120.000' },
    { img: 'assets/img/item2.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: 'Rp170.000' },
    { img: 'assets/img/item3.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: 'Rp170.000' },
    { img: 'assets/img/item4.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: 'Rp170.000' },
  ];

  yesterdayItems = [
    { img: 'assets/img/item5.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00' },
    { img: 'assets/img/item6.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00' },
    { img: 'assets/img/item7.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00' },
    { img: 'assets/img/item8.jpg', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00' },
  ];

  setSegment(segment: string) {
    this.selectedSegment = segment;
  }

  constructor(
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service for handling data refresh
  ) { }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}

