import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FormsModule } from '@angular/forms';
import { SortCourseDirective } from '../common/directive/sort-course-directive';
import { DurationPipe } from '../common/pipe/duration.pipe';
import { FilterCoursesPipe } from '../common/pipe/filter-courses.pipe';


@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, SortCourseDirective, DurationPipe, FilterCoursesPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CoursesComponent,
    SortCourseDirective,
    DurationPipe,
    FilterCoursesPipe
  ]
})
export class CoursesModule { }
