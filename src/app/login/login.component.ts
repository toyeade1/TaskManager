import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Inside of the login component we are creating an event listener called onLoginClick which will subscribe to the post request of the service and if it is successful, it will 
  // direct the page to the dashboard using Angular's router function.
  loginViewModel: Login = new Login();
  loginError: string = '';

  // it is important to create these variables in the constructor.
  constructor(private loginService: LoginService, private router: Router) {}


  ngOnInit() {
      
  }

  onLoginClick(event:any) {
    this.loginService.Login(this.loginViewModel).subscribe(
      (response)=>{
      this.router.navigateByUrl("/dashboard");
      },
      (error)=>{
        console.log(error);
        this.loginError = "Invalid Username or Password"

      })
  }
}
