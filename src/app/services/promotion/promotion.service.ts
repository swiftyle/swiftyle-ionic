import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  collectionImages: any[] = [];
  private collectionImagesLoaded = false;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  async loadCollectionImages(): Promise<void> {
    if (this.collectionImagesLoaded) {
      return;
    }

    try {
      const response: any = await this.apiService.getPromotions().toPromise();
      if (response && response.data && response.data.length > 0) {
        this.collectionImages = response.data.map((promotion: any) => ({
          id: promotion.id,
          imageUrl: 'https://swiftyleshop.com/assets/images/promotions/collection-for-girls.png',
          title: promotion.title||'Collection For Girls',
          subtitle: promotion.subtitle || 'Up to 40% Off',
        }));
        this.collectionImagesLoaded = true;
        console.log('Collection images loaded:', this.collectionImages);
      } else {
        throw new Error('No promotions data found');
      }
    } catch (error) {
      console.error('Error loading collection images:', error);
      this.showToast(
        'Failed to load collection images. Please try again later.',
        'danger'
      );
    }
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
