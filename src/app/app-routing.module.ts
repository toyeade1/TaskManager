import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// since we moved all of the components into the Admin module we have now changed their paths
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { ContactMeComponent } from './contact-me/contact-me.component';

const routes: Routes = [
  {path: 'dashboard', component:DashboardComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component:ContactMeComponent},
  {path: "", redirectTo: "dashboard", pathMatch: 'full'} // this is added to make sure that if the link is put with no route then it would be redirected to the dashboard.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
