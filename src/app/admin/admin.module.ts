import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
// importing the dashboard service so it can be used inside of all the components in the Admin Module.
import { DashboardService } from '../dashboard.service';

// we have now moved the dashboard component, my profile component and the about component to the Admin Module and so we add them to its declarations and export them so
// others can use them as well
@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent
  ],
  // I am adding the servide inside of provider
  providers: [DashboardService]
})
export class AdminModule { }
