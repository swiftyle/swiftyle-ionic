import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private apiService: ApiService) {}

  checkout(checkoutData: any): Observable<any> {
    return this.apiService.checkout(checkoutData);
  }

  async getCheckout(): Promise<any> {
    return await this.apiService.getCheckout().toPromise();
  }
}
