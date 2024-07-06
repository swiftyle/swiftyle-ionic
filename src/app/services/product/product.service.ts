// src/app/services/product/product.service.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any[] = [];
  private productsLoaded = false;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  async loadProducts(): Promise<void> {
    if (this.productsLoaded) {
      return;
    }

    try {
      const response: any = await this.apiService.getProducts().toPromise();
      if (response && response.data && response.data.length > 0) {
        this.products = response.data.map((product: any) => ({
          ...product,
          imageUrl: `https://swiftyleshop.com/${product.image}`,
        }));
        this.productsLoaded = true;
        console.log('Products loaded:', this.products);
      } else {
        throw new Error('No products data found');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      this.showToast(
        'Failed to load products. Please try again later.',
        'danger'
      );
    }
  }

  getProductById(productId: string): Observable<any> {
    return this.apiService.getProductById(productId);
  }

  async createProduct(productData: any) {
    try {
      const response: any = await this.apiService
        .createProduct(productData)
        .toPromise();
      const newProduct = {
        ...response.data,
        imageUrl: `https://swiftyleshop.com/${response.data.image}`,
      };
      this.products.push(newProduct);
      console.log('Product created:', newProduct);
      this.showToast('Product created successfully.', 'success');
    } catch (error) {
      console.error('Error creating product:', error);
      this.showToast(
        'Failed to create product. Please try again later.',
        'danger'
      );
    }
  }

  async updateProduct(productData: any, isFormData: boolean = false) {
    try {
      const response: any = await this.apiService
        .updateProduct(productData, isFormData)
        .toPromise();
      const updatedProduct = {
        ...response.data,
        imageUrl: `https://swiftyleshop.com/${response.data.image}`,
      };
      const index = this.products.findIndex(
        (product) => product.id === productData.id
      );
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
      console.log('Product updated:', updatedProduct);
      this.showToast('Product updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      this.showToast(
        'Failed to update product. Please try again later.',
        'danger'
      );
    }
  }

  async deleteProduct(productId: string) {
    try {
      await this.apiService.deleteProduct(productId).toPromise();
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
      console.log('Product deleted:', productId);
      this.showToast('Product deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      this.showToast(
        'Failed to delete product. Please try again later.',
        'danger'
      );
    }
  }

  getProductsByCategory(category: string): any[] {
    return this.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
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
