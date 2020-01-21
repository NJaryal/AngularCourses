import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  @Input() courseList: Courses;
  courses: Courses | any;
  @Output() public myOutput = new EventEmitter<string>();
  @Output() public myEditEvent = new EventEmitter<string>();
  courseId: string;
  searchText: string;

  constructor(
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }
  ngOnInit() {
    this.coursesService.getList().subscribe(
      (res: any) => this.courses = res
    );
    if (this.courses && this.courses.length === 1) {
      this.router.navigate(['courses/courseId'], { queryParams: { courseId: this.courses[0].id }});
    }
    this.cd.markForCheck();
  }

  onDeleteCourse(id: string) {
    this.myOutput.emit(id);
  }

  onEditCourse(id: string) {
    this.myEditEvent.emit(id);
  }

  loadMore() {
    console.log("Another course list");
  }

  searchVal() {
    console.log(this.searchText);
  }

  refresh() {
    this.cd.detectChanges();
  }
}
