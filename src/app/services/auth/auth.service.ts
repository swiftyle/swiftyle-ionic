import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Implementasi logika otentikasi Anda di sini, misalnya cek token di localStorage
    const token = localStorage.getItem('bearerToken');
    return token !== null;
  }
}
