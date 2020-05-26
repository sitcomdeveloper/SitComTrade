import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') == "True") {
      return next.handle(req.clone());
    } 
    // else {
    //   catchError((err: HttpErrorResponse) => {
    //           if (err.status === 401) {
    //             alert('Your session is expired!!.Please login again to continue');
    //             this.router.navigateByUrl('login', { queryParams: { returnUrl: req.url } });
    //           }
    //           return throwError(err);
    //         })
    // }

    if (window.sessionStorage.getItem('userToken') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + window.sessionStorage.getItem('userToken'))
      });
      return next.handle(clonedReq);
    }
    // this.router.navigateByUrl('login');
    // else {
      
    //   catchError((err: HttpErrorResponse) => {
    //     if (err.status === 401) {
    //       alert('Your session is expired!!.Please login again to continue');
    //       this.router.navigateByUrl('login', { queryParams: { returnUrl: req.url } });
    //       window.sessionStorage.clear;
    //     }
    //     return throwError(err);
    //   })
    // }
  }
 
}
