import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFilterComponent } from './courses-filter/courses-filter.component';



@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CoursesFilterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
