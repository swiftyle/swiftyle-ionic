import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductService } from 'src/app/services/product/product.service'; // Import ProductService

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  @ViewChild('productModal') productModal!: IonModal;
  @ViewChild('categoriesModal') categoriesModal!: IonModal;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  breakpoints: number[] = [0, 0.25, 0.5, 0.75, 1];
  initialBreakpoint: number = 0.25;

  selectedSegment: string = 'store';
  selectedCategory: string | null = null;
  selectedSubCategory: string | null = null;
  selectedSize: string | null = null;
  selectedColor: string | null = null;

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', '2XL']; // Sizes options

  name: string = '';
  description: string = '';
  price: number = 0; // Initial price in Rp
  stock: number = 0; // Initial stock
  photoUrl: string | null = null; // URL of the uploaded photo

  constructor(
    private cdr: ChangeDetectorRef,
    public userService: UserService,
    private dataRefreshService: DataRefreshService,
    private productService: ProductService // Add ProductService
  ) { }

  ngOnInit() { }

  selectSegment(segment: string) {
    this.selectedSegment = segment;
    this.cdr.detectChanges(); // Ensure the view updates
  }

  async openProductModal() {
    await this.productModal.present();
  }

  async closeProductModal() {
    await this.productModal.dismiss();
  }

  async openCategoriesModal() {
    await this.categoriesModal.present();
  }

  async closeCategoriesModal() {
    await this.categoriesModal.dismiss();
  }

  selectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

  selectSubCategory(subCategory: string) {
    this.selectedSubCategory = this.selectedSubCategory === subCategory ? null : subCategory;
  }

  selectSize(size: string) {
    this.selectedSize = this.selectedSize === size ? null : size;
  }

  selectColor(color: string) {
    this.selectedColor = this.selectedColor === color ? null : color;
  }

  clearSelections() {
    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.selectedSize = null;
    this.selectedColor = null;
    this.cdr.detectChanges(); // Ensure the view updates
  }

  async applySelections() {
    // Collect product data from form inputs
    const productData = {
      name: this.name,
      description: this.description,
      category: this.selectedCategory,
      subCategory: this.selectedSubCategory,
      size: this.selectedSize,
      color: this.selectedColor,
      price: this.price,
      stock: this.stock,
      image: this.photoUrl // Assuming the photo URL is already in base64 format or similar
    };

    // Call ProductService to create the product
    await this.productService.createProduct(productData);

    // Clear the form after applying selections
    this.clearSelections();
    this.closeProductModal();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
