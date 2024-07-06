import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core'; // Import plugin Capacitor
import { DataRefreshService } from './services/data-refresh/data-refresh.service';

const { App } = Plugins;

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform, private dataRefreshService : DataRefreshService) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      // Mendapatkan URL saat ini dari router
      const currentUrl = window.location.pathname;

      // Tentukan halaman-halaman dengan tab navigation di sini
      const pagesWithTabs = ['/tabs/home'];

      // Periksa apakah URL saat ini berada di halaman dengan tab navigation
      if (pagesWithTabs.includes(currentUrl)) {
        // Panggil fungsi untuk keluar dari aplikasi (menggunakan Capacitor)
        this.exitApp();
      } else {
        // Biarkan perilaku tombol kembali bawaan
        // (misalnya, kembali ke halaman sebelumnya dalam stack)
      }
    });
  }

  private exitApp() {
    // Panggil plugin Capacitor untuk keluar dari aplikasi
    App['exitApp']();
  }
  handleRefresh(event: any) {
    this.dataRefreshService.handleRefresh(event);
  }
}
