import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories = [
    { label: 'Electronics', icon: 'phone-portrait-outline' },
    { label: 'Fashion', icon: 'shirt-outline' },
    { label: 'Home', icon: 'home-outline' },
    { label: 'Beauty', icon: 'heart-outline' },
    { label: 'Sports', icon: 'bicycle-outline' },
  ];

  getCategories() {
    return this.categories;
  }
}
