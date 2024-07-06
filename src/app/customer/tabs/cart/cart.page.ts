import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, Platform, ToastController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart/cart.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { AddressService } from 'src/app/services/address/address.service'; // Import AddressService
import { NavigationEnd, Router } from '@angular/router';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @ViewChild('pageContent', { static: true }) pageContent!: IonContent;

  address: string = '';
  isShippingModalOpen: boolean = false;
  breakpoints: number[] = [0, 0.25, 0.5, 0.75, 1];
  initialBreakpoint: number = 0.25;

  cartItems: any[] = [];
  wishlistItems: any[] = [];
  addresses: any[] = [];

  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastController: ToastController,
    private addressService: AddressService, 
    private router: Router,
    private dataRefreshService: DataRefreshService,
    private platform: Platform 
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/tabs/cart') {
        this.loadCartItems(); // Reload cart items on navigation to /tabs/cart
      }
    });
  }

  ngOnInit() {
    this.loadCartItems();
    this.loadWishlistItems();
    this.loadAddresses(); // Load addresses on init
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
  
  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/tabs/home']);
    });
  }

  loadWishlistItems() {
    this.wishlistService.loadWishlist().then(items => {
      this.wishlistItems = items;
      this.wishlistItems.forEach(item => {
        item.selectedSize = item.product.data.sizes[0]; // Default to first size
        item.selectedColor = item.selectedSize.colors[0]; // Default to first color
      });
    }).catch(error => {
      console.error('Failed to load wishlist items:', error);
      this.showToast('Failed to load wishlist. Please try again later.', 'danger');
    });
  }

  loadCartItems() {
    this.cartService.loadCartItems().then(items => {
      this.cartItems = items;
      this.cartItems.forEach(item => {
        item.selectedSize = item.product.data.sizes[0]; // Default to first size
        item.selectedColor = item.selectedSize.colors[0]; // Default to first color
      });
    }).catch(error => {
      console.error('Failed to load cart items:', error);
      this.showToast('Failed to load cart. Please try again later.', 'danger');
    });
  }

  async loadAddresses() {
    try {
      const addresses = await this.addressService.loadAddresses();
      this.addresses = addresses || [];
      if (this.addresses.length > 0) {
        this.address = `${this.addresses[0].street}, ${this.addresses[0].city}, ${this.addresses[0].state} ${this.addresses[0].postal_code}`;
      }
      console.log('Loaded addresses:', this.addresses);
    } catch (error) {
      console.error('Failed to load addresses:', error);
      this.addresses = [];
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.data.price * item.quantity, 0);
  }

  confirmOrder() {
    console.log('Order confirmed');
    console.log('Shipping address:', this.address);
  }

  openShippingModal() {
    this.isShippingModalOpen = true;
  }

  closeShippingModal() {
    this.isShippingModalOpen = false;
  }

  saveShippingChanges() {
    this.isShippingModalOpen = false;
  }

  incrementQuantity(item: any) {
    item.quantity++;
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  async removeFromCart(id: string) {
    try {
      await this.cartService.removeFromCart(id);
      this.loadCartItems();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }

  async addItemFromWishlist(index: number) {
    const item = this.wishlistItems[index];
    try {
      await this.cartService.addToCart(item.product.data.id, 1);
      // Reload current tab page
      this.navCtrl.navigateRoot('/tabs/cart');
    } catch (error) {
      console.error('Failed to add item from wishlist:', error);
      this.showToast('Failed to add item to cart. Please try again later.', 'danger');
    }
  }

  selectAddress(address: any) {
    this.address = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    this.isShippingModalOpen = false;
    console.log('Selected address:', this.address);
  }

  goToCheckout() {
    console.log('Proceeding to checkout');
    this.navCtrl.navigateForward('/tabs/cart/checkout');
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
