import { Component } from '@angular/core';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage {
  rating = 0;
  comment = '';
  stars = [1, 2, 3, 4, 5];

  constructor(
    private dataRefreshService: DataRefreshService,
    public userService: UserService, 
  ) {}

  rate(star: number) {
    this.rating = star;
  }

  submitReview() {
    console.log('Review submitted');
    console.log('Rating:', this.rating);
    console.log('Comment:', this.comment);
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }
}
