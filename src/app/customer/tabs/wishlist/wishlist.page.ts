import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  products: any[] = [];
  allproducts: any[] = [];
  query!: string;
  totalproducts = 0;
  cartSub!: Subscription;
  headerImages!: any[];
  collectionImages!: any[];
  selectedSegment: string = 'all';
  segments: { value: string, label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'shoes', label: 'Shoes' },
    // Add more segments as needed
  ];

  constructor(private apiService: ApiService, private navCtrl: NavController) {}
    
  ngOnInit() {
    this.headerImages = this.apiService.getHeaderImages();
    this.collectionImages = this.apiService.getCollectionImages();    
    this.products = this.apiService.getProducts();
    this.allproducts = this.products; // Store all products initially
    this.selectedSegment = 'all';
  }

  goToItemDetail() {
    this.navCtrl.navigateForward('/item-detail');
  }

  goToWishlist() {
    this.navCtrl.navigateForward('/wishlist');
  }

  goToCart() {
    this.navCtrl.navigateForward('/cart');
  }

  goToCheckout() {
    this.navCtrl.navigateForward('/checkout');
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToAbout() {
    this.navCtrl.navigateForward('/about');
  }

  goToContact() {
    this.navCtrl.navigateForward('/contact');
  }

  goToTerms() {
    this.navCtrl.navigateForward('/terms');
  }

  goToPrivacy() {
    this.navCtrl.navigateForward('/privacy');
  }

  goToHelp() {
    this.navCtrl.navigateForward('/help');
  }

  goToSettings() {
    this.navCtrl.navigateForward('/settings');
  }

  goToOrder() {
    this.navCtrl.navigateForward('/order');
  }

  goToChat() {
    this.navCtrl.navigateForward('/chat');
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  goToNotifications() {
    // Implement notification logic here
  }

  goToHome() {
    this.navCtrl.navigateForward('/home');
  }

  getStars(rating: number): any[] {
    return new Array(Math.round(rating));
  }

  onSearchChange(event: any) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.querySearch();
  }

  querySearch() {
    this.products = [];
    if (this.query.length > 0) {
      this.searchproducts();
    } else {
      this.products = [...this.allproducts];
    }
  }

  searchproducts() {
    this.products = this.apiService.getProducts().filter((item) =>
      item.title.toLowerCase().includes(this.query)
    );
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
