import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtUnAuthorizedInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // mon-9-oct: since we are not making any changes to the request, we are not cloning it, instead we will be transforming some of the data we receive.
    // we are using the tap fuction
      return next.handle(req).pipe(tap( 
        //tap in rxjs is used to perform side-effects changes without mutating the main stream / map could have been used.
        (event: HttpEvent<any>)=> {
          if (event instanceof HttpResponse) {
            // We have set a conditional here that would check to see if the http event is a response and we can do something with the response before it gets to the components.
            // we are not adding anything for now.
          }
        },
        (err: any)=> {
          if (err instanceof HttpErrorResponse){

            if (err.status == 401) {
              console.log(err);
              alert("401 Not Authorized Error");
            }

          } 
        }
        ));
  }
}
