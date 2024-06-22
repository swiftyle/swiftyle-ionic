import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private products = [
    {
      id: 1,
      category: 'Men',
      title: 'Brown Jacket',
      price: 'Rp180K',
      oldPrice: 'Rp200K',
      discount: 10,
      imageUrl: 'assets/images/products/brown-jacket.png',
      description: 'A stylish brown jacket perfect for any occasion.',
      availability: 'In stock',
      brand: 'Pixelstrap',
      seller: 'ABC',
      fabric: 'Cotton',
      rating: 4,
      status: true,
      variations: ['Brown', 'M'],
      variationImages: ['assets/images/variation1.jpg', 'assets/images/variation2.jpg'],
    },
    {
      id: 2,
      category: 'Women',
      title: 'Grey T-Shirt',
      price: 'Rp120K',
      oldPrice: 'Rp160K',
      discount: 10,
      imageUrl: 'assets/images/products/grey-tshirt.png',
      description: 'Comfortable grey t-shirt made from soft cotton.',
      availability: 'In stock',
      brand: 'Pixelstrap',
      seller: 'ABC',
      fabric: 'Cotton',
      rating: 4.5,
      status: true,
      variations: ['Grey', 'S'],
      variationImages: ['assets/images/variation1.jpg', 'assets/images/variation2.jpg'],
    },
    {
      id: 3,
      category: 'Men',
      title: 'Pink Crowneck',
      price: 'Rp240K',
      oldPrice: 'Rp280K',
      discount: 10,
      imageUrl: 'assets/images/products/pink-crowneck.png',
      description: 'Comfortable pink crowneck made from soft cotton.',
      availability: 'In stock',
      brand: 'Pixelstrap',
      seller: 'ABC',
      fabric: 'Cotton',
      rating: 4,
      status: true,
      variations: ['Pink', 'L'],
      variationImages: ['assets/images/variation1.jpg', 'assets/images/variation2.jpg'],
    },
    {
      id: 4,
      category: 'Women',
      title: 'Green Hoodie',
      price: 'Rp120K',
      oldPrice: 'Rp160K',
      discount: 10,
      imageUrl: 'assets/images/products/green-hoodie.png',
      description: 'Comfortable blue t-shirt made from soft cotton.',
      availability: 'In stock',
      brand: 'Pixelstrap',
      seller: 'ABC',
      fabric: 'Cotton',
      rating: 3,
      status: true,
      variations: ['Green', 'M'],
      variationImages: ['assets/images/variation1.jpg', 'assets/images/variation2.jpg'],
    },
  ];

  coupons: any[] = [
    {
      id: '1',
      code: 'SAVE10',
      discount: 10,
      isPercentage: true,
      description: 'Get 10% off on your order',
      isActive: true,
      expiryDate: '2024-06-30',
      minimumOrderAmount: 50000,
    },
    {
      id: '2',
      code: 'FREESHIP',
      discount: 50,
      isPercentage: false,
      description: 'Flat 50 bucks off on all orders',
      isActive: true,
      expiryDate: '2024-12-31',
    },
    {
      id: '3',
      code: 'BUNDLEDEAL',
      discount: 20,
      isPercentage: true,
      description: 'Buy one get one 50% off',
      isActive: true,
      expiryDate: '2024-09-15',
    },
    {
      id: '4',
      code: 'GIFTSHOP',
      discount: 30,
      isPercentage: true,
      description: 'Get 30% off on orders above 5000',
      isActive: true,
      expiryDate: '2024-12-31',
      minimumOrderAmount: 500000,
    },
  ];

  constructor() {}

  getCollectionImages() {
    return [
      {
        id: 1,
        imageUrl: 'assets/images/promotion/collection-for-girls.png',
        title: 'Collection For Girls',
        subtitle: 'Up To 40% Off',
      },
    ];
  }

  getHeaderImages() {
    return [
      {
        id: 1,
        imageUrl: 'assets/images/header/summer-collection.png',
        title: 'Explore Summer Collection',
        subtitle: 'Trending Collection',
      },
    ];
  }


  getCoupons() {
    return this.coupons.filter((coupon) => coupon.isActive);
  }
  
  getProducts() {
    return this.products.filter(product => product.status);
  }

  getProductById(productId: string | number) {
    return this.products.find(product => product.id === +productId);
  }
}
