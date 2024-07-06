import { Component, OnInit } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  constructor(private dataRefreshService: DataRefreshService) { }

  ngOnInit() {
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

}
