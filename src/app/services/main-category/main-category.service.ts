import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class MainCategoryService {
  mainCategories: any[] = [];

  constructor(private apiService: ApiService) {
    // Initialization moved to component
  }

  loadMainCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getMainCategories().subscribe(
        (response: any) => {
          this.mainCategories = response.data;
          console.log('Main categories loaded:', this.mainCategories);
          resolve();
        },
        (error) => {
          console.error('Error loading main categories:', error);
          reject(error);
        }
      );
    });
  }
}
