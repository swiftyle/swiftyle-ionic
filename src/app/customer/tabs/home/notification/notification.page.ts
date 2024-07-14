import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: any[] = [];
  isLoading = false;

  constructor(
    private notificationService: NotificationService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadNotifications();
  }

  async loadNotifications(): Promise<void> {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading notifications...'
    });
    await loading.present();
  
    this.notificationService.loadNotification().subscribe(
      (notifications: any[]) => {
        console.log('Notifications loaded:', notifications);
        // Sort notifications by timestamp in descending order
        this.notifications = notifications.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        this.isLoading = false;
        loading.dismiss();
        this.notificationService.markNotificationsAsRead();
      },
      error => {
        console.error('Error loading notifications:', error);
        this.isLoading = false;
        loading.dismiss();
      }
    );
  }
  
  
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return `${this.formatTwoDigits(date.getDate())}-${this.formatTwoDigits(
      date.getMonth() + 1
    )}-${date.getFullYear()} ${this.formatTwoDigits(
      date.getHours()
    )}:${this.formatTwoDigits(date.getMinutes())}`;
  }

  private formatTwoDigits(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  translateType(type: string): string {
    const translations: { [key: string]: string } = {
      OrderCreated: 'Pesanan Dibuat',
      OrderDelivered: 'Pesanan Dikirim',
    };
    return translations[type] || type;
  }
}
