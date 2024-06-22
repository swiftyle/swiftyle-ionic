import { Component, OnInit, ViewChild } from '@angular/core';
import { PreferenceService } from '../services/preference/preference.service';
import { NavController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.page.html',
  styleUrls: ['./preference.page.scss'],
})
export class PreferencePage implements OnInit {
  styles: any[] = [];

  selectedStyle: { name: string, image: string } | null = null;

  activeIndex: number = 0;

  constructor(private preferenceService: PreferenceService, private navCtrl: NavController) {}

  ngOnInit() {
    this.styles = this.preferenceService.styles;
    console.log('Styles:', this.styles);
  }

  selectStyle(style: { name: string, image: string }): void {
    this.selectedStyle = style;
    console.log('Selected style:', style.name);
    console.log('Image URL:', style.image);
  }

  start() {
    this.navCtrl.navigateForward('/home');
  }

  onSwiper(event: any) {
    const swiper = event.target.swiper;
    if (swiper instanceof Swiper) {
      console.log('Swiper instance:', swiper);
      // Additional logic if needed
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
