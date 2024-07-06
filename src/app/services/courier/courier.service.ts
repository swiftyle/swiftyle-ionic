import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  constructor(private apiService: ApiService) { }

  getCourier(): Observable<any> {
    return this.apiService.getCourier();
  }
}
