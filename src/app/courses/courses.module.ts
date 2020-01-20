import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ModalModule } from '../common/modal/modal.module';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { DurationPipe } from '../common/pipe/duration.pipe';
import { FilterCoursesPipe } from '../common/pipe/filter-courses.pipe';
import { SortCourseDirective } from '../common/directive/sort-course-directive';
import { CourseDetailedComponent } from './course-detailed/course-detailed.component';


@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CoursesAddComponent, DurationPipe, FilterCoursesPipe, SortCourseDirective, CourseDetailedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CoursesComponent,
    CoursesAddComponent,
    DurationPipe,
    FilterCoursesPipe,
    SortCourseDirective
  ]
})
export class CoursesModule { }
