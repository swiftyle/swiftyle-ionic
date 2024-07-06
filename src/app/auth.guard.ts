import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoutes = ['start', 'choose', 'register', 'whatsapp', 'login', 'password', 'reset-password', 'verify-email', 'new-password'];
    const currentRoute = state.url.split('/')[1]; // Ambil nama route pertama
    
    if (this.authService.isAuthenticated()) {
      // Jika pengguna sudah otentikasi dan mencoba akses halaman otentikasi, arahkan ke /tabs/home
      if (allowedRoutes.includes(currentRoute)) {
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        return false;
      }
      return true;
    } else {
      // Jika pengguna belum otentikasi dan mencoba akses halaman otentikasi, izinkan akses
      if (allowedRoutes.includes(currentRoute)) {
        return true;
      }
      // Jika pengguna belum otentikasi dan mencoba akses halaman yang dilindungi, arahkan ke halaman login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
