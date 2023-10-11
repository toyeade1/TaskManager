import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { MyProfileComponent } from './admin/my-profile/my-profile.component';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './jwt-un-authorized-interceptor.service';
// make sure to import the forms module when you want to use ngmodel to show a variable.
@NgModule({
  declarations: [AppComponent, ContactMeComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    FormsModule,
    // we are importing the jwt token authenticator to check if the token has expired
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const currentUser = sessionStorage.getItem('currentUser');
          return currentUser ? JSON.parse(currentUser).token : null;
        },
      },
    }),
  ],
  // we would add the jwtinterceptor (HTTP Interceptor) as a provider inside of the App.Module
  // setting multi to true will allow the angular app to create multiple instaces of the service meaning it can be used simultaneouly for different functions within the application.
  providers: [
    // note that interceptors execute in a chain order meaning it will be interceptorservice first and then the unauthorizedinterceptorservice second.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
