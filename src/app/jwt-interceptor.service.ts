import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// because we want this service to behave as an interceptor we will be implementing the interceptor class
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // because we are intercepting every request made in our services we are enabling the jwt token to be generated here and we are setting the current user credentials
    let currentUser = {token: ""};
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
    }
    // a caviat with the intercept function is that we cannot directly change the request and so we will clone it first.
    req = req.clone(
      {
      setHeaders: {
        Authorization: "Bearer " + currentUser.token,
      }
    }
    );
      // since it is an observable we will need to return a value. We are invoking the 'next' parameter and going to the next http hander if there is one available otherwise we go to 
      // the backend
      return next.handle(req)
  }
}
