import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/courses', pathMatch: 'full'},
  {path: 'home', component: HomeComponent , data: { breadcrumb: 'Home'}},
  {path: 'courses', component: CoursesComponent , data: { breadcrumb: 'Courses'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
