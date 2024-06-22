import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage {
  rating = 0;
  comment = '';
  stars = [1, 2, 3, 4, 5];

  constructor() {}

  rate(star: number) {
    this.rating = star;
  }

  submitReview() {
    console.log('Review submitted');
    console.log('Rating:', this.rating);
    console.log('Comment:', this.comment);
  }
}