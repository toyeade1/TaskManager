import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
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
