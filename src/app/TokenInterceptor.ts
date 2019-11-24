import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(this.auth)
    if(this.auth.loggedIn()) {
        request = request.clone({setHeaders: {Authorization: this.auth.getToken()}});       
    }
    
    
    return next.handle(request).pipe(tap(null, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
           this.router.navigate(['/login']);
        }
      }
    }));
  }
}
