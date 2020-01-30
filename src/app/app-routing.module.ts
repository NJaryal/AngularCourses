import { AuthGuard } from './common/auth/_guards/auth.guard';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { CoursesAddComponent } from './courses/courses-add/courses-add.component';
import { CourseDetailedComponent } from './courses/course-detailed/course-detailed.component';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'courses', component: CoursesComponent, data: { breadcrumb: 'Courses' },
    children: [
      {
        path: 'list',
        component: CoursesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'new',
        component: CoursesAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:id',
        component: CoursesAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: CourseDetailedComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '', redirectTo: '/courses/list', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
