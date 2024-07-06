import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlistItems: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private dataRefreshService: DataRefreshService, // Assuming DataRefreshService is a custom service
  ) {}

  ngOnInit() {
    this.loadWishlistItems();
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
  
  loadWishlistItems() {
    this.wishlistService
      .loadWishlist()
      .then((items) => {
        this.wishlistItems = items;
        this.wishlistItems.forEach((item) => {
          item.selectedSize = item.product.data.sizes[0]; // Default to first size
          item.selectedColor = item.selectedSize.colors[0]; // Default to first color
        });
      })
      .catch((error) => {
        console.error('Failed to load wishlist items:', error);
        this.showToast(
          'Failed to load wishlist. Please try again later.',
          'danger'
        );
      });
  }

  removeItemFromWishlist(itemId: string) {
    this.wishlistService
      .removeItemFromWishlist(itemId)
      .then(() => {
        this.loadWishlistItems(); // Reload wishlist after removal
        this.showToast('Item removed from wishlist.', 'success');
      })
      .catch((error) => {
        console.error('Failed to remove item from wishlist:', error);
        this.showToast(
          'Failed to remove item from wishlist. Please try again later.',
          'danger'
        );
      });
  }

  goToCart() {
    this.navCtrl.navigateForward('/cart');
  }

  addToCart(item: any) {
    this.cartService
      .addToCart(item.product.data.id, 1)
      .then(() => {
        this.showToast('Product added to cart.', 'success');
      })
      .catch((error) => {
        console.error('Failed to add product to cart:', error);
        this.showToast(
          'Failed to add product to cart. Please try again later.',
          'danger'
        );
      });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
