import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // mon-9-oct: we have now added the interceptor to the app module and it will inject the jwt token into every request. if there is a situation where you would not want to have the
  // token injected then you will follow these steps:
  //mon-9-oct: you will create a new httpClient and set it to null
  private httpClient: HttpClient | null = null;
  constructor(/* previous parameter if you want the interceptor to inject jwt token: private httpClient: HttpClient*/ private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService) {}

  currentUsername:any = null;

  // we are creating a login function using a post request to that link within our nodejs project
  // it accepts the login class as a parameter
  public Login(Login: Login): Observable<any> {
    // mon-9-oct: we are now manually creating the httpclient and connecting it to the httpbackend so we can go around the jwt interceptor for this function
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(
      'http://localhost:9090/authenticate',
      Login,
      { responseType: 'json' }
      // we have attached a pipe and a map to transform the data gotten from the server before it is passed to the components. We are saving the username in the service.
      // when I see other examples of pipe, it is also associated with the map.
    ).pipe(map(user => {
      // if you ever need to see what the pipe is doing you can console log the variable to see the json object.
      if (user) {
        this.currentUsername = user.userName;
        // here we are storing the currentuser's information inside of a JSON object at the sessionStorage so we might be able to acess it.
        sessionStorage['currentUser'] = JSON.stringify(user);
      }
      return user;
    }));
  }

  public Logout() {
    // we are now removing the currentuser from the sessionStorage
    sessionStorage.removeItem('currentUser');
    this.currentUsername = null;
  }

  // function to chech if the jwt token has expired
  public isAuthenticated(): boolean {
    let currentUser = sessionStorage.getItem('currentUser');
    let token = currentUser ? JSON.parse(currentUser).token : null;
    if (this.jwtHelperService.isTokenExpired()) {
      return false; // token is expired
    }
    else {
      return true; // token is valid
    }
  }

}
