

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService:CookieService) { }
  token:any= this.cookieService.get('authToken');
  // getting token from localstorage 
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/v1/customer/') || req.url.includes('/order/add-order') && this.token) {
      // modify the request as needed
   
        const modifiedReq = req.clone({
          setHeaders: {
                    token: this.token
                  }
        });
         // pass the modified request to the next interceptor or to the backend
      console.log(modifiedReq);
      
        return next.handle(modifiedReq); 
    }
    // if the request URL does not match the specific pattern, do not modify it
 
    
    return next.handle(req);
  } 
  }
