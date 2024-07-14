import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) { }

  public loadNotification(): Observable<any[]> {
    return this.apiService.getNotification().pipe(
      map((response: any) => {
        console.log('Received response:', response);
        // Directly returning the response data
        const parsedData = response.map((notification: any) => {
          try {
            const data = JSON.parse(notification.data);
            return {
              ...notification,
              message: data.message,
              timestamp: data.timestamp,
              order_id: data.order_id
            };
          } catch (e) {
            console.error('Error parsing notification data:', notification.data, e);
            return notification;
          }
        });
        console.log('Parsed notifications:', parsedData);
        return parsedData;
      }),
      catchError((error: any) => {
        console.error('Error in loadNotification:', error);
        this.handleError(error);
        return throwError('Failed to load notifications');
      })
    );
  }

  private async handleError(error: any): Promise<void> {
    let message = 'Failed to load notifications';
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  markNotificationsAsRead(): void {
    // Implement the logic to mark notifications as read.
    // For example, send a request to the backend to update the notification status.
  }
}
