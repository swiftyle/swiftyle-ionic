import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ProductService } from 'src/app/services/product/product.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ShareModalComponent } from '../components/share-modal/share-modal.component';
import { Platform } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm: string = '';
  searchHistory: string[] = [];
  recommendations: string[] = [];
  products: Array<{ img: string; description: string; price: string }> = [];
  filteredProducts: any[] = [];
  showProductsGrid: boolean = false;

  constructor(
    private storage: Storage,
    private productService: ProductService,
    private navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastController: ToastController,
    private modalController: ModalController,
    private platform: Platform,
    private dataRefreshService: DataRefreshService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadSearchHistory();
    this.loadProducts();
  }

  async loadSearchHistory() {
    this.searchHistory = (await this.storage.get('searchHistory')) || [];
  }

  async updateSearchHistory(searchTerm: string) {
    if (searchTerm && !this.searchHistory.includes(searchTerm)) {
      this.searchHistory.push(searchTerm);
      await this.storage.set('searchHistory', this.searchHistory);
    }
  }

  clearSearchHistory() {
    this.searchHistory = [];
    this.storage.remove('searchHistory');
  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    console.log("Search Term: ", searchTerm); // Debugging log
    this.updateRecommendations(searchTerm);
  }
  

  updateRecommendations(searchTerm: string) {
    if (!searchTerm) {
      this.recommendations = [];
      return;
    }

    this.recommendations = this.productService.products
      .filter(product => product.name.toLowerCase().includes(searchTerm))
      .map(product => product.name);
  }

  searchProducts(searchTerm: string) {
    if (!searchTerm) return;
    this.products = this.productService.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
    this.updateSearchHistory(searchTerm);
    this.showProductsGrid = true;
  }

  handleKeyPress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      const searchTerm = (keyboardEvent.target as HTMLInputElement).value.toLowerCase();
      this.searchProducts(searchTerm);
    }
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  loadProducts() {
    this.productService.loadProducts().then(() => {
      this.filteredProducts = this.productService.products;
      this.cd.detectChanges();
    });
  }

  goToProductDetail(productId: number) {
    this.navCtrl.navigateForward(`/tabs/home/product-detail/${productId}`);
  }

  async addToWishlist(event: Event, product: any) {
    event.stopPropagation();
    try {
      await this.wishlistService.addToWishlist({ product_id: product.id });
      this.showToast('Item added to wishlist successfully.', 'success');
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      this.showToast('Failed to add item to wishlist. Please try again later.', 'danger');
    }
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product.id, 1).then(() => {
      this.showToast('Product added to cart.', 'success');
    }).catch((error) => {
      console.error('Failed to add to cart:', error);
      this.showToast('Failed to add product to cart. Please try again later.', 'danger');
    });
  }

  async shareToSocialMedia(event: Event, productId: number) {
    event.stopPropagation();
    const modal = await this.modalController.create({
      component: ShareModalComponent,
      componentProps: { productId },
      cssClass: 'share-modal',
      presentingElement: await this.modalController.getTop(),
      initialBreakpoint: 0.25,
      breakpoints: [0, 0.25, 0.5, 0.75]
    });
    return await modal.present();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
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
