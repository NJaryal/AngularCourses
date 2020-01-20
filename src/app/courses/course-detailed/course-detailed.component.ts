import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/common/models/courses.model';
import { CoursesService } from '../../common/services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detailed',
  templateUrl: './course-detailed.component.html',
  styleUrls: ['./course-detailed.component.scss']
})
export class CourseDetailedComponent implements OnInit {
  detailedCourses: Courses | any;
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.coursesService.getItemById(this.route.snapshot.paramMap.get('id')).subscribe((res) => {
      this.router.navigate(['/courses/list']);
      this.detailedCourses = res;
    });
  }

}
