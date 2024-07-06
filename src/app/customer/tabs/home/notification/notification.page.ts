import { Component, OnInit } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service with a handleRefresh method
  ) { }

  ngOnInit() {
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
