import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  
  slideOpts = {
    slidesPerView: 2.5, // Number of slides per view (visible slides)
    spaceBetween: 10,   // Space between slides in pixels
    centeredSlides: false, // Whether to center active slide
    freeMode: true,     // Enables sliding without snapping to slides
    // Add other options as needed
  };

  categories = [
    { label: 'All', icon: 'star-outline' },
    { label: 'Men', icon: 'man-outline' },
    { label: 'Women', icon: 'woman-outline' },
    { label: 'Kids', icon: 'happy-outline' },
    { label: 'Accessories', icon: 'watch-outline' },
    { label: 'Footwear', icon: 'footsteps-outline'}
  ];
  collectionImages: { id: number; imageUrl: string; title: string; subtitle: string; }[] = [];

  constructor(private apiService: ApiService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCollectionImages();
  }

  loadProducts() {
    this.products = this.apiService.getProducts();
    this.filteredProducts = this.products;
  }

  loadCollectionImages() {
    this.collectionImages = this.apiService.getCollectionImages();
  }

  filterProducts(category: string) {
    if (category.toLowerCase() === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  goToProductDetail(productId: number) {
    this.navCtrl.navigateForward(`/product-detail/${productId}`);
  }

  goToNotifications() {
    this.navCtrl.navigateForward('/notifications');
  }

  openAllCategories() {
    console.log('See All Categories');
  }

  getStars(rating: number) {
    return new Array(Math.round(rating));
  }

}
