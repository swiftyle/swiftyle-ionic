import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ToastController } from '@ionic/angular';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart = new BehaviorSubject<any>(null);

  get cart(): Observable<any> {
    return this._cart.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private productService: ProductService
  ) {}

  async loadCartItems(): Promise<any[]> {
    try {
      const response: any = await this.apiService.getCartItems().toPromise();
      if (response && response.data) {
        const cartItems = response.data;
        const productsPromises = cartItems.map(async (cartItem: any) => {
          if (!cartItem.product_id) {
            throw new Error('Product ID is undefined');
          }
          const product = await this.productService.getProductById(cartItem.product_id).toPromise();
          return {
            id: cartItem.id,
            cartId: cartItem.cart_id,
            productId: cartItem.product_id,
            quantity: cartItem.quantity,
            price: parseFloat(cartItem.price),
            subtotal: parseFloat(cartItem.subtotal),
            discount: parseFloat(cartItem.discount),
            product,
            shopCoupon: await this.getCouponById(cartItem.shop_coupon_id)
          };
        });
        const cart = await Promise.all(productsPromises);
        this._cart.next(cart);
        console.log('Cart loaded:', cart);
        return cart;
      } else {
        throw new Error('No cart data found');
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      this.showToast('Failed to load cart items. Please try again later.', 'danger');
      throw error;
    }
  }

  //App-Coupon
  async getAppCoupon(): Promise<any> {
    try {
      const coupon = await this.apiService.getAppCoupon().toPromise();
      return coupon;
    } catch (error) {
      console.error('Failed to get coupon:', error);
      return null;
    }
  }

  async getCouponById(couponId: string | null): Promise<any> {
    if (!couponId) {
      return null;
    }
    try {
      const coupon = await this.apiService.getCouponById(couponId).toPromise();
      return coupon;
    } catch (error) {
      console.error('Failed to get coupon:', error);
      return null;
    }
  }



  async getCartFromApi(): Promise<any[]> {
    try {
      const cart = await this.apiService.getCart().toPromise();
      this._cart.next(cart);
      return cart;
    } catch (error) {
      console.error('Failed to get cart:', error);
      this.showToast('Failed to get cart. Please try again later.', 'danger');
      throw error;
    }
  }
  
  async getCartWithTrashed(): Promise<any> {
    try {
      const response = await this.apiService.getCart().toPromise();
      console.log('Response from getCartFromApi:', response);

      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Unexpected response structure from getCartFromApi');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching carts:', error);
      throw error;
    }
  }

  async getCartItemsWithTrashed(): Promise<any[]> {
    try {
      const response: any = await this.apiService.getCartItemsWithTrashed().toPromise();
      if (response && response.data) {
        const cartItems = response.data;
        const productsPromises = cartItems.map(async (cartItem: any) => {
          if (!cartItem.product_id) {
            throw new Error('Product ID is undefined');
          }
          const product = await this.productService.getProductById(cartItem.product_id).toPromise();
          return {
            id: cartItem.id,
            cartId: cartItem.cart_id,
            productId: cartItem.product_id,
            quantity: cartItem.quantity,
            price: parseFloat(cartItem.price),
            subtotal: parseFloat(cartItem.subtotal),
            discount: parseFloat(cartItem.discount),
            product,
            shopCoupon: await this.getCouponById(cartItem.shop_coupon_id)
          };
        });
        const cart = await Promise.all(productsPromises);
        console.log('Cart items with trashed loaded:', cart);
        return cart;
      } else {
        throw new Error('No cart data found');
      }
    } catch (error) {
      console.error('Error loading cart items with trashed:', error);
      throw error;
    }
  }


  async addToCart(productId: string, quantity: number = 1) {
    try {
      await this.apiService.addToCart(productId, quantity).toPromise();
      await this.getCartFromApi();
      this.showToast('Product added to cart.', 'success');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      this.showToast(
        'Failed to add product to cart. Please try again later.',
        'danger'
      );
    }
  }

  async removeFromCart(id: string) {
    try {
      await this.apiService.removeFromCart(id).toPromise();
      await this.getCartFromApi();
      this.showToast('Product removed from cart.', 'success');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      this.showToast(
        'Failed to remove product from cart. Please try again later.',
        'danger'
      );
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number) {
    try {
      await this.apiService.updateCartItemQuantity(productId, quantity).toPromise();
      await this.getCartFromApi();
      this.showToast('Cart item quantity updated.', 'success');
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      this.showToast(
        'Failed to update cart item quantity. Please try again later.',
        'danger'
      );
    }
  }

  async updateCart(cartId: number, appCouponId: number, )
  {
    try {
      await this.apiService.updateCart(cartId, appCouponId).toPromise();
      await this.getCartFromApi();
      this.showToast('Cart item quantity updated.', 'success');
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      this.showToast(
        'Failed to update cart item quantity. Please try again later.',
        'danger'
      );
    }
  }
  async clearCart() {
    try {
      console.warn('Clear cart method not implemented in ApiService.');
      this.showToast('Clear cart feature is not available.', 'warning');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      this.showToast('Failed to clear cart. Please try again later.', 'danger');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
