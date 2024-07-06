import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart/cart.service';
import { MainCategoryService } from 'src/app/services/main-category/main-category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { ShareModalComponent } from './components/share-modal/share-modal.component'; // Update the path as necessary
import { Platform } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  filteredProducts: any[] = [];
  collectionImages: { id: number; imageUrl: string; title: string; subtitle: string; }[] = [];
  mainCategories: any[] = [];

  slideOpts = {
    slidesPerView: 2.5,
    spaceBetween: 10,
    centeredSlides: false,
    freeMode: true,
  };

  categoryIcons: { [key: string]: string } = {
    Women: 'woman-outline',
    Men: 'man-outline',
    Kids: 'happy-outline',
    Shoes: 'walk-outline',
    Accessories: 'ribbon-outline'
  };

  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private mainCategoryService: MainCategoryService,
    private cd: ChangeDetectorRef,
    private promotionService: PromotionService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastController: ToastController,
    private modalController: ModalController,
    private platform: Platform,
    private dataRefreshService: DataRefreshService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCollectionImages();
    this.loadMainCategories();
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

  loadCollectionImages() {
    this.promotionService.loadCollectionImages().then(() => {
      this.collectionImages = this.promotionService.collectionImages;
      this.cd.detectChanges();
    });
  }

  loadMainCategories() {
    this.mainCategoryService.loadMainCategories().then(() => {
      this.mainCategories = this.mainCategoryService.mainCategories;
      console.log('Main Categories:', this.mainCategories);  // Debugging line
      this.cd.detectChanges();
    });
  }
  

  filterProducts(category: string) {
    if (!category) {
      console.error('Category is undefined or null');
      return;
    }
  
    if (category.toLowerCase() === 'all') {
      this.filteredProducts = this.productService.products;
    } else {
      this.filteredProducts = this.productService.getProductsByCategory(category);
    }
  }
  
  getProductsByCategory(category: string) {
    if (!category) return [];
    return this.productService.products.filter((product: any) => product.category.toLowerCase() === category.toLowerCase());
  }
  
  
  

  goToProductDetail(productId: number) {
    this.navCtrl.navigateForward(`/tabs/home/product-detail/${productId}`);
  }

  goToNotifications() {
    this.navCtrl.navigateForward('/notifications');
  }

  openAllCategories() {
    this.navCtrl.navigateForward('/all-categories');
  }

  getStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => i < rating);
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

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
  
  exitApp() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        (window as any).navigator.app.exitApp();
      });
    } else {
      // Handle other platforms
      console.error('Exit app not supported on this platform');
    }
  }
}
