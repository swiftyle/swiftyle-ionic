import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if there's a bearer token in local storage
    const bearerToken = localStorage.getItem('bearerToken');

    // Clone the request to add the Authorization header if a token is available
    if (bearerToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${bearerToken}`,
      });
      const authReq = req.clone({ headers });
      return next.handle(authReq);
    }

    // If no token, just pass the original request
    return next.handle(req);
  }
}
