import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// since we moved all of the components into the Admin module we have now changed their paths
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component:ContactMeComponent},
  {path: 'projects', component:ProjectsComponent},
  {path: "", redirectTo: "login", pathMatch: 'full'} // this is added to make sure that if the link is put with no route then it would be redirected to the dashboard.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
