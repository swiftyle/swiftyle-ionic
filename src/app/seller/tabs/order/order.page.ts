import { Component, OnInit } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(
    public userService: UserService,
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service for handling data refresh events
  ) { }

  ngOnInit() { }

  submitReview() {
    // Your review submission logic here, if needed
    // For now, we just close the modal state
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
