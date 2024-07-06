import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  product: any = null;
  quantity: number = 1;
  suggestedItems: any[] = []; // Initialize suggested items
  selectedColor: any = null;
  selectedSize: any = null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a service that handles data refreshing
  ) {}

  ngOnInit() {
    this.loadProduct();
    this.loadSuggestedItems();
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  loadProduct() {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        response => {
          this.product = response.data;
          this.product.imageUrl = `https://swiftyleshop.com/${this.product.image}`;
          if (this.product.variationImages) {
            this.product.variationImages = this.product.variationImages.map((img: string) => `https://swiftyleshop.com/${img}`);
          } else {
            this.product.variationImages = [];
          }
          if (this.product.sizes && this.product.sizes.length > 0) {
            this.selectedSize = this.product.sizes[0];
            if (this.product.sizes[0].colors && this.product.sizes[0].colors.length > 0) {
              this.selectedColor = this.product.sizes[0].colors[0];
            }
          }
        },
        error => {
          console.error('Error loading product:', error);
        }
      );
    }
  }

  loadSuggestedItems() {
    // Replace with actual API call to fetch suggested items
    this.suggestedItems = [
      { imageUrl: 'assets/images/preference/avant-grade.png', name: 'Product 1', price: '$17.00' },
      { imageUrl: 'assets/images/preference/avant-grade.png', name: 'Product 2', price: '$17.00' },
      { imageUrl: 'assets/images/preference/avant-grade.png', name: 'Product 3', price: '$17.00' },
      { imageUrl: 'assets/images/preference/avant-grade.png', name: 'Product 4', price: '$17.00' }
    ];
  }

  openSeeAllModal() {
    this.modal.present();
  }

  canDismiss() {
    return true;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity() {
    this.quantity++;
  }
}
