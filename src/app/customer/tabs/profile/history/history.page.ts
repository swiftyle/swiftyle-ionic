import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  isReviewModalOpen = false;
  breakpoints = [0, 0.5, 1];
  initialBreakpoint = 0.5;

  constructor(
    private navCtrl: NavController,
    public userService: UserService,
    private alertController: AlertController,
    private dataRefreshService: DataRefreshService  // Assuming DataRefreshService is a custom service for handling data refresh events.  Replace with actual service if necessary.
  ) {}

  ngOnInit() { }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
  
  openReviewModal() {
    this.isReviewModalOpen = true;
  }
  closeReviewModal() {
    this.isReviewModalOpen = false;
  }

  async submitReview() {
    this.closeReviewModal();
    const alert = await this.alertController.create({
      header: 'Review Submitted',
      message: 'Thank you for your review!',
      buttons: ['OK']
    });

    await alert.present();
  }


}
