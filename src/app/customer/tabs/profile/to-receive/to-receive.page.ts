import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-to-receive',
  templateUrl: './to-receive.page.html',
  styleUrls: ['./to-receive.page.scss'],
})
export class ToReceivePage implements OnInit {
  orders: any[] = [];
  orderId: string = ''; // Initialize as an empty array
  deliveredOrders: any[] = [];
  isReviewModalOpen = false;
  breakpoints = [0, 0.5, 1];
  initialBreakpoint = 0.5;
  selectedOrder: any = null;
  productNames: string = '';

  constructor(
    private navCtrl: NavController,
    public userService: UserService,
    private dataRefreshService: DataRefreshService,
    private orderService: OrderService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  async getOrders() {
    try {
      const ordersWithDetails = await this.orderService.getOrders();
      if (ordersWithDetails && Array.isArray(ordersWithDetails)) {
        this.orders = ordersWithDetails;
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

  
  openReviewModal(order: any) {
    this.selectedOrder = order;
    this.productNames = this.getProductNames(order);
    this.isReviewModalOpen = true;
  }
  
  getProductNames(order: any): string {
    return order.checkout.products.map((product:any) => product.name).join(', ');
  }

  closeReviewModal() {
    this.isReviewModalOpen = false;
    this.selectedOrder = null;
  }


  async submitReview() {
    this.closeReviewModal();
    const alert = await this.alertController.create({
      header: 'Review Submitted',
      message: 'Thank you for your review!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
