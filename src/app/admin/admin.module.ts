import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
// importing the dashboard service so it can be used inside of all the components in the Admin Module.
import { DashboardService } from '../dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';

// we have now moved the dashboard component, my profile component and the about component to the Admin Module and so we add them to its declarations and export them so
// others can use them as well
@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent, 
    ProjectsComponent
  ],
  // I am adding the servide inside of provider
  providers: [DashboardService]
})
export class AdminModule { }
