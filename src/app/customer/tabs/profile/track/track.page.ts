
import { Component, OnInit } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
  progress = {
    start: 0,
    middle: 50,
    end: 100
  };
  trackingNumber: string = 'LGS-i92927839300763731';
  timelineEvents: any[] = [
    { status: 'Packed', date: new Date('2023-04-19T12:31:00'), description: 'Your parcel is packed and will be handed over to our delivery partner.' },
    { status: 'On the Way to Logistic Facility', date: new Date('2023-04-19T16:20:00'), description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.' },
    { status: 'Arrived at Logistic Facility', date: new Date('2023-04-19T19:07:00'), description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.' },
    { status: 'Shipped', date: new Date('2023-04-20T06:15:00'), description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.' },
    { status: 'Out for Delivery', date: new Date('2023-04-22T11:10:00'), description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.' },
    { status: 'Delivered', date: new Date('2023-04-19T12:50:00'), description: 'Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.', delivered: true },
  ];

  constructor(public userService: UserService,
    private dataRefreshService: DataRefreshService
  ) {}

  copyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.trackingNumber;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Tracking number copied to clipboard!');
    } catch (err) {
      alert('Failed to copy text');
    }
    document.body.removeChild(textArea);
  }

  ngOnInit() {}
  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}


