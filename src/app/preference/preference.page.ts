import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import Swiper from 'swiper';

interface Style {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-preference',
  templateUrl: './preference.page.html',
  styleUrls: ['./preference.page.scss'],
})
export class PreferencePage implements OnInit {
  styles: Style[] = [];
  selectedStyles: Style[] = [];
  activeIndex: number = 0;
  email: string = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    this.loadStyles();
  }

  async loadStyles() {
    try {
      const response: any = await this.http.get('https://swiftyleshop.com/api/styles').toPromise();
      this.styles = response.data.map((style: Style) => {
        const imageUrl = `https://swiftyleshop.com/${style.image}`;
        console.log('Loading image:', imageUrl);
        return {
          ...style,
          image: imageUrl,
        };
      });
      console.log('Styles loaded:', this.styles);
    } catch (error) {
      console.error('Error loading styles:', error);
      const toast = await this.toastController.create({
        message: 'Failed to load styles. Please try again later.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  selectStyle(style: Style) {
    const index = this.selectedStyles.findIndex(s => s.id === style.id);
    if (index > -1) {
      this.selectedStyles.splice(index, 1); // Deselect style if already selected
    } else {
      this.selectedStyles.push(style); // Select style if not already selected
    }
    console.log('Selected styles:', this.selectedStyles);
  }

  async submitSelectedStyles() {
    try {
      const styleIds = this.selectedStyles.map(style => style.id);
      const data = { email: this.email, style_ids: styleIds };
      const response: any = await this.http.post('https://swiftyleshop.com/api/preferences', data).toPromise();
      console.log('Style selection response:', response);
  
      const toast = await this.toastController.create({
        message: 'Styles selected successfully.',
        duration: 2000,
        color: 'success',
      });
      toast.present();
  
      // Navigate to ProfilePage after successful style selection
      this.navCtrl.navigateForward('/tabs/profile');
    } catch (error) {
      console.error('Error selecting styles:', error);
      const toast = await this.toastController.create({
        message: 'Failed to select styles. Please try again later.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  isSelected(style: Style): boolean {
    return this.selectedStyles.some(s => s.id === style.id);
  }  

  onSwiper(event: any) {
    const swiper = event.target.swiper;
    if (swiper instanceof Swiper) {
      console.log('Swiper instance:', swiper);
    }
  }

  onSlideChange() {
    const swiperContainer = document.querySelector('swiper-container');
    if (swiperContainer) {
      const swiper = swiperContainer['swiper'];
      if (swiper) {
        this.activeIndex = swiper.activeIndex;
        console.log('Slide changed to: ', this.activeIndex);
      }
    }
  }
}
