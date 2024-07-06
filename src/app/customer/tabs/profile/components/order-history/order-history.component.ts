import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class HistoryPage implements OnInit {
  orders = [
    {
      id: '92287157',
      date: 'April 06',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      img: 'assets/imgs/order1.jpg',
    },
    {
      id: '92287158',
      date: 'April 06',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      img: 'assets/imgs/order2.jpg',
    },
    {
      id: '92287159',
      date: 'April 06',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      img: 'assets/imgs/order3.jpg',
    },
    {
      id: '92287160',
      date: 'April 06',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      img: 'assets/imgs/order4.jpg',
    },
    {
      id: '92287161',
      date: 'April 06',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      img: 'assets/imgs/order5.jpg',
    },
  ];

  constructor() { }

  ngOnInit() { }

  reviewOrder(orderId: string) {
    console.log('Review order:', orderId);
  }
}
