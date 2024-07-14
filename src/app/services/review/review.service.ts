import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitReview(reviewData: { orderId: number; rating: number; comment: string }) {
    return this.http.post(`${this.apiUrl}/reviews`, reviewData).toPromise();
  }
}
