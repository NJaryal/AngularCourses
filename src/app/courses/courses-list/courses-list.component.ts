import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: Courses | any;
  @Output() public myOutput = new EventEmitter<string>();
  courseId: string;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  onDeleteCourse(id: string) {
    this.myOutput.emit(id);
  }

  loadMore() {
    console.log("Another course list");
  }

}
