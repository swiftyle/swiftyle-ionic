import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-to-receive',
  templateUrl: './to-receive.page.html',
  styleUrls: ['./to-receive.page.scss'],
})
export class ToReceivePage implements OnInit {
  orders: any[] = [];
  isReviewModalOpen = false;
  selectedOrder: any = null;
  productNames: string = '';
  rating = 0;
  comment = '';
  starsArray = Array(5).fill(0);

  constructor(
    public userService: UserService,
    private dataRefreshService: DataRefreshService,
    private orderService: OrderService,
    private reviewService: ReviewService,
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
        console.error('Invalid order data:', ordersWithDetails);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  }

  openReviewModal(order: any) {
    this.selectedOrder = order;
    this.productNames = order.checkout.products.map((product: any) => product.name).join(', ');
    this.isReviewModalOpen = true;
  }

  closeReviewModal() {
    this.isReviewModalOpen = false;
    this.selectedOrder = null;
    this.rating = 0;
    this.comment = '';
  }

  setRating(rating: number) {
    this.rating = rating;
  }

  async submitReview() {
    if (this.rating === 0 || this.comment.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Incomplete Review',
        message: 'Please provide a rating and a comment.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.reviewService.submitReview({
        orderId: this.selectedOrder.id,
        rating: this.rating,
        comment: this.comment,
      });

      const alert = await this.alertController.create({
        header: 'Review Submitted',
        message: 'Thank you for your review!',
        buttons: ['OK'],
      });
      await alert.present();
      this.closeReviewModal();
    } catch (error) {
      console.error('Failed to submit review:', error);
      const alert = await this.alertController.create({
        header: 'Submission Failed',
        message: 'There was an error submitting your review. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
