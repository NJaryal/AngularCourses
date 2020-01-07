import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {path: '**', redirectTo: '/courses'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent , data: { breadcrumb: 'Home'}},
  {path: 'courses', component: CoursesComponent , data: { breadcrumb: 'Courses'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
