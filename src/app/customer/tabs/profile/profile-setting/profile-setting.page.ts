import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.page.html',
  styleUrls: ['./profile-setting.page.scss'],
})
export class ProfileSettingPage implements OnInit {
  userId!: string;
  user: any = {};

  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private dataRefreshService: DataRefreshService,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Contoh: Mengambil user dari userService
    this.userService.loadUser().then(user => {
      this.user = user;
      this.userId = user.id;
    }).catch(error => {
      console.error('Error loading user:', error);
    });
  }


  // Fungsi untuk menampilkan alert konfirmasi logout
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  // Fungsi untuk menampilkan alert konfirmasi penghapusan akun
  async confirmDeleteAccount() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  // Fungsi untuk menangani logout
  logout() {
    this.apiService.logout().subscribe(() => {
      localStorage.removeItem('bearerToken');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('userName');
      this.navCtrl.navigateRoot('/start');
    });
  }

  // Fungsi untuk menangani penghapusan akun
  deleteAccount() {
    this.userService.deleteUser(this.userId).then(() => {
      localStorage.clear();
      this.navCtrl.navigateRoot('/start');
    }).catch(error => {
      console.error('Error deleting user:', error);
    });
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
