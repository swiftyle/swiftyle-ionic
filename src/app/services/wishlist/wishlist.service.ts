import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: any[] = [];

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private productService: ProductService
  ) {}

  async loadWishlist(): Promise<any[]> {
    try {
      const response: any = await this.apiService.getWishlist().toPromise();
      if (response && response.data) {
        const wishlist = response.data;
        const productsPromises = wishlist.map(async (wishlistItem: any) => {
          const product = await this.productService.getProductById(wishlistItem.product_id).toPromise();
          return { ...wishlistItem, product };
        });
        this.wishlist = await Promise.all(productsPromises);
        console.log('Wishlist loaded:', this.wishlist);
        return this.wishlist;
      } else {
        throw new Error('No wishlist data found');
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      this.showToast('Failed to load wishlist. Please try again later.', 'danger');
      throw error;
    }
  }

  async addToWishlist(itemData: any) {
    try {
      const response: any = await this.apiService.addToWishlist(itemData).toPromise();
      const newItem = response;
      this.wishlist.push(newItem);
      console.log('Item added to wishlist:', newItem);
      this.showToast('Item added to wishlist successfully.', 'success');
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      this.showToast('Failed to add item to wishlist. Please try again later.', 'danger');
      throw error;
    }
  }

  async removeItemFromWishlist(itemId: string) {
    try {
      await this.apiService.removeFromWishlist(itemId).toPromise();
      this.wishlist = this.wishlist.filter(item => item.id !== itemId);
      console.log('Item removed from wishlist:', itemId);
      this.showToast('Item removed from wishlist successfully.', 'success');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      this.showToast('Failed to remove item from wishlist. Please try again later.', 'danger');
      throw error;
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
