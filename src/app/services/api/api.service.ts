import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('bearerToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Generic method to make GET requests
  private get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  // Generic method to make POST requests
  private post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  // Generic method to make PUT requests
  private put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  // Generic method to make DELETE requests
  private delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  // User methods
  getUser(): Observable<any> {
    return this.get('users');
  }

  updateUser(userData: any, isFormData: boolean = false): Observable<any> {
    const endpoint = isFormData
      ? `users/${userData.get('id')}?_method=PUT`
      : `users/${userData.id}?_method=PUT`;
    return this.post(endpoint, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.delete(`users/${userId}`);
  }

  hasBearerToken(): boolean {
    return !!localStorage.getItem('bearerToken');
  }

  // Product methods
  getProducts(): Observable<any> {
    return this.get('products');
  }

  getProductById(productId: string): Observable<any> {
    return this.get(`products/${productId}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.post('products', productData);
  }

  updateProduct(productData: any, isFormData: boolean = false): Observable<any> {
    const endpoint = isFormData
      ? `products/${productData.get('id')}?_method=PUT`
      : `products/${productData.id}?_method=PUT`;
    return this.post(endpoint, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.delete(`products/${productId}`);
  }

  // Main Category methods
  getMainCategories(): Observable<any> {
    return this.get('main-categories');
  }

  // Promotion methods
  getPromotions(): Observable<any> {
    return this.get('promotions');
  }

  // Address methods
  getAddresses(): Observable<any> {
    return this.get('addresses');
  }

  getAddressById(addressId: string): Observable<any> {
    return this.get(`addresses/${addressId}`);
  }

  createAddress(addressData: any): Observable<any> {
    return this.post('addresses', addressData);
  }

  updateAddress(addressData: any): Observable<any> {
    return this.post(`addresses/${addressData.id}?_method=PUT`, addressData);
  }

  deleteAddress(addressId: string): Observable<any> {
    return this.delete(`addresses/${addressId}`);
  }

  // Order methods
  getOrders(): Observable<any> {
    return this.get('orders');
  }

  getOrderById(orderId: string): Observable<any> {
    return this.get(`orders/${orderId}`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.post('orders', orderData);
  }

  updateOrder(orderData: any): Observable<any> {
    return this.post(`orders/${orderData.get('id')}?_method=PUT`, orderData);
  }

  getOrdersWithStatus(status: string): Observable<any> {
    return this.get(`orders?status=${status}`);
  }

  payOrder(orderId: number): Observable<any> {
    return this.post(`orders/${orderId}/pay`, {});
  }

  // Cart methods
  getCart(): Observable<any> {
    return this.get('carts');
  }

  getCartItemsWithTrashed(): Observable<any> {
    return this.get('cart-item/with-trashed')
  }

  updateCart(cartId: number, appCouponId: number): Observable<any> {
    return this.post(`carts/${cartId}?_method=PUT`, { app_coupon_id: appCouponId });
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.post('cart-item', { product_id: productId, quantity: quantity });
  }

  removeFromCart(id: string): Observable<any> {
    return this.delete(`cart-item/${id}`);
  }

  updateCartItemQuantity(productId: string, quantity: number): Observable<any> {
    return this.put(`cart-item/${productId}`, { quantity });
  }

  // CartItem methods
  getCartItems(): Observable<any> {
    return this.get('cart-item');
  }

  getCartItemById(cartItemId: string): Observable<any> {
    return this.get(`cart-item/${cartItemId}`);
  }

  updateCartItem(cartItemId: string, cartItemData: any): Observable<any> {
    return this.post(`cart-item/${cartItemId}?_method=PUT`, cartItemData);
  }

  deleteCartItem(cartItemId: string): Observable<any> {
    return this.delete(`cart-item/${cartItemId}`);
  }

  // Coupon methods
  getCouponById(couponId: string): Observable<any> {
    return this.get(`shop-coupon/${couponId}`);
  }

  getAppCoupon(): Observable<any> {
    return this.get('app-coupons');
  }

  // Checkout methods
  checkout(checkoutData: any): Observable<any> {
    return this.post('checkouts', checkoutData);
  }

  getCheckout(): Observable<any> {
    return this.get('checkouts');
  }

  // Order Tracking methods
  getOrderTracking(orderId: string): Observable<any> {
    return this.get(`order-tracking/${orderId}`);
  }

  // Payment methods
  makePayment(paymentData: any): Observable<any> {
    return this.post('payment', paymentData);
  }

  // Order History methods
  getOrderHistory(): Observable<any> {
    return this.get('order-history');
  }

  // Shipping methods
  getShippingMethods(): Observable<any> {
    return this.get('shipping-methods');
  }

  // Refund methods
  getRefunds(): Observable<any> {
    return this.get('refunds');
  }

  // Wishlist methods
  getWishlist(): Observable<any> {
    return this.get('wishlist-item');
  }

  addToWishlist(itemData: any): Observable<any> {
    return this.post('wishlist-item', itemData);
  }

  removeFromWishlist(itemId: string): Observable<any> {
    return this.delete(`wishlist-item/${itemId}`);
  }

  // Product Variants methods
  getProductVariants(productId: string): Observable<any> {
    return this.get(`products/${productId}/variants`);
  }

  // Brands methods
  getBrands(): Observable<any> {
    return this.get('brands');
  }

  getBrandById(brandId: string): Observable<any> {
    return this.get(`brands/${brandId}`);
  }

  createBrand(brandData: any): Observable<any> {
    return this.post('brands', brandData);
  }

  updateBrand(brandId: string, brandData: any): Observable<any> {
    return this.post(`brands/${brandId}?_method=PUT`, brandData);
  }

  deleteBrand(brandId: string): Observable<any> {
    return this.delete(`brands/${brandId}`);
  }

  logout(): Observable<any> {
    return this.post('logout', {});
  }

  getUserPreferences(): Observable<any> {
    return this.get('preferences');
  }

  // Chat methods
  getChats(): Observable<any> {
    return this.get('chats');
  }

  getChatById(chatId: string): Observable<any> {
    return this.get(`chats/${chatId}`);
  }

  createChat(chatData: any): Observable<any> {
    return this.post('chats', chatData);
  }

  updateChat(chatData: any): Observable<any> {
    return this.post(`chats/${chatData.id}?_method=PUT`, chatData);
  }

  deleteChat(chatId: string): Observable<any> {
    return this.delete(`chats/${chatId}`);
  }

  // Message methods
  getMessages(chatId: string): Observable<any> {
    return this.get(`chats/${chatId}/messages`);
  }

  getMessageById(chatId: string, messageId: string): Observable<any> {
    return this.get(`chats/${chatId}/messages/${messageId}`);
  }

  createMessage(chatId: string, messageData: any): Observable<any> {
    return this.post(`chats/${chatId}/messages`, messageData);
  }

  updateMessage(chatId: string, messageData: any): Observable<any> {
    return this.post(`chats/${chatId}/messages/${messageData.id}?_method=PUT`, messageData);
  }

  deleteMessage(chatId: string, messageId: string): Observable<any> {
    return this.delete(`chats/${chatId}/messages/${messageId}`);
  }

  //Courier
  getCourier(): Observable<any> {
    return this.get('couriers');
  }
  
  verifyEmailOtp(payload: any): Observable<any> {
    return this.post('confirm-email-otp', payload);
  }

  resendEmailOtp(email: string): Observable<any> {
    return this.post('resend-email-otp', { email });
  }

  getNotification(): Observable<any> {
    return this.get('notifications');
  }
}
