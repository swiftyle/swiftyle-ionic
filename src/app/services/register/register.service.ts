import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://swiftyleshop.com/api/register';

  constructor(private http: HttpClient) { }

  register(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
