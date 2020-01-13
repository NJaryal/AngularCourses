import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';

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
  courseId: string;
  searchText: string;

  constructor(private coursesService: CoursesService, private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.courses = this.coursesService.getList();
    this.cd.markForCheck();
  }

  onDeleteCourse(id: string) {
    this.myOutput.emit(id);
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
