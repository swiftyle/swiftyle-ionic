import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
  private storageKey = 'recentlyViewed';

  constructor() {}

  getRecentlyViewed(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addProduct(product: any) {
    let recentlyViewed = this.getRecentlyViewed();
    recentlyViewed = recentlyViewed.filter((p: any) => p.id !== product.id);
    recentlyViewed.unshift(product);
    recentlyViewed = recentlyViewed.slice(0, 10);
    localStorage.setItem(this.storageKey, JSON.stringify(recentlyViewed));
  }

  clearRecentlyViewed() {
    localStorage.removeItem(this.storageKey);
  }
}
