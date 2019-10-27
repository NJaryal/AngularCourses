import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service'
import { Courses } from 'src/app/common/models/courses.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: Courses | any;
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  onDeleteCourse() {
    console.log("Course deleted!")
  }

  loadMore() {
    console.log("Another course list");
  }

}
