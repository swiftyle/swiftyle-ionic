import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CheckoutService } from '../checkout/checkout.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private apiService: ApiService,
    private checkoutService: CheckoutService
  ) {}

  async getOrders(): Promise<any> {
    try {
      // Fetch orders
      const response = await this.apiService.getOrders().toPromise();
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Unexpected response structure from getOrders');
      }

      const orders = response.data;

      // Fetch checkouts related to the orders
      const checkoutsResponse = await this.checkoutService.getCheckout();
      if (!checkoutsResponse || !checkoutsResponse.data || !Array.isArray(checkoutsResponse.data)) {
        throw new Error('Unexpected response structure from getCheckouts');
      }

      const checkouts = checkoutsResponse.data;

      // Map checkouts to their respective orders
      orders.forEach((order: any) => {
        const matchingCheckout = checkouts.find((checkout: any) => checkout.checkout.id === order.checkout_id);
        if (matchingCheckout) {
          order.checkout = matchingCheckout.checkout;
          order.products = matchingCheckout.products;
        }
      });

      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  }

  payOrder(orderId: number): Promise<any> {
    return this.apiService.payOrder(orderId).toPromise();
  }
}
