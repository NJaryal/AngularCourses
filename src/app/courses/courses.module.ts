import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFilterComponent } from './courses-filter/courses-filter.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../common/modal/modal.module';


@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CoursesFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
