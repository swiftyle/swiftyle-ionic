import { Injectable } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { AddressService } from '../address/address.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { MainCategoryService } from '../main-category/main-category.service';
import { OrderService } from '../order/order.service';
import { CheckoutService } from '../checkout/checkout.service';
import { PreferenceService } from '../preference/preference.service';
import { PromotionService } from '../promotion/promotion.service';
import { RefundService } from '../refund/refund.service';
import { ReviewService } from '../review/review.service';
import { ChatService } from '../chat/chat.service';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class DataRefreshService {
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private addressService: AddressService,
    private productService: ProductService,
    private userService: UserService,
    private mainCategoryService: MainCategoryService,
    private orderService: OrderService,
    private checkoutService: CheckoutService,
    private preferenceService: PreferenceService,
    private promotionService: PromotionService,
    private refundService: RefundService,
    private reviewService: ReviewService,
    private chatService: ChatService,
    private messageService: MessageService
  ) {}

  private refreshService(serviceMethod: () => Promise<any>): Promise<any> {
    return serviceMethod();
  }

  refreshCartItems(): Promise<any> {
    return this.refreshService(() => this.cartService.loadCartItems());
  }

  refreshWishlistItems(): Promise<any> {
    return this.refreshService(() => this.wishlistService.loadWishlist());
  }

  refreshAddresses(): Promise<any> {
    return this.refreshService(() => this.addressService.loadAddresses());
  }

  refreshProducts(): Promise<any> {
    return this.refreshService(() => this.productService.loadProducts());
  }

  refreshUsers(): Promise<any> {
    return this.refreshService(() => this.userService.loadUser());
  }

  refreshMainCategories(): Promise<any> {
    return this.refreshService(() => this.mainCategoryService.loadMainCategories());
  }

  refreshOrders(): Promise<any> {
    return this.refreshService(() => this.orderService.getOrders());
  }

  refreshPromotions(): Promise<any> {
    return this.refreshService(() => this.promotionService.loadCollectionImages());
  }


  

  handleRefresh(event: any): void {
    setTimeout(() => {
      Promise.all([
        this.refreshCartItems(),
        this.refreshWishlistItems(),
        this.refreshAddresses(),
        this.refreshProducts(),
        this.refreshUsers(),
        this.refreshMainCategories(),
        this.refreshOrders(), // Example status
        this.refreshPromotions(),
      ])
        .then(() => {
          event.target.complete();
        })
        .catch(() => {
          event.target.complete();
        });
    }, 2000);
  }
}
