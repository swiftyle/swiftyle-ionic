import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  items = [
    {
      img: 'assets/imgs/order1.jpg',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description: '',
      price: 'Rp170.000'
    },
    {
      img: 'assets/imgs/order2.jpg',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description: '',
      price: 'Rp170.000'
    }
  ];

  constructor() { }

  ngOnInit() { }

  copyToClipboard(info: string) {
    navigator.clipboard.writeText(info).then(() => {
      console.log('Copied to clipboard:', info);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  refundOrder() {
    console.log('Refund process initiated');
    // Implement refund logic here
  }
}
