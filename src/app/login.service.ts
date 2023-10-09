import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  currentUsername:any = null;

  // we are creating a login function using a post request to that link within our nodejs project
  // it accepts the login class as a parameter
  public Login(Login: Login): Observable<any> {
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
}
