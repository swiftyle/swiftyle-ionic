import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders: any[] = [];
  deliveredOrders: any[] = [];
  selectedSegment: string = '';
  orderId: string = '';

  constructor(
    private navCtrl: NavController,
    public userService: UserService,
    private dataRefreshService: DataRefreshService,
    private orderService: OrderService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.getOrders();
  }

  async ionViewWillEnter() {
    // Hapus data di Ionic Storage saat kembali ke halaman ini
    await this.storage.remove('selectedOrderId');
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  async getOrders() {
    try {
      const ordersWithDetails = await this.orderService.getOrders();
      if (ordersWithDetails && Array.isArray(ordersWithDetails)) {
        this.orders = ordersWithDetails;
        this.filterDeliveredOrders();
        console.log('Order Loaded:', ordersWithDetails);
      } else {
        console.error('Unexpected response format:', ordersWithDetails);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  filterDeliveredOrders() {
    this.deliveredOrders = this.orders.filter(order => order.status === 'delivered');
  }

  async detailOrder(orderId: string) {
    // Simpan orderId di Ionic Storage
    await this.storage.set('selectedOrderId', orderId);
    // Navigate to detail order page
    this.navCtrl.navigateForward(['order-detail']);
  }
}
