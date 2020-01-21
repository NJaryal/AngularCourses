import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/common/modal/modal.service';

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
  config: any = {};
  collection = { count: 60, data: [] };
  constructor(
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private modalService: ModalService
  ) {
    this.coursesService.getList().subscribe(
      (res: any) => {
        this.courses = res
        this.myupdate()
      }
    );
    this.myupdate();


  }

  ngOnInit() {

  }
  myupdate() {
    this.cd.markForCheck();
    if (typeof this.courses !== 'undefined') {
      this.collection.count = this.courses.length || 0;
      this.collection.data = this.courses;
      this.config = {
        itemsPerPage: 2,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  onEditCourse(id: string) {
    this.myEditEvent.emit(id);
  }

  searchVal() {
    console.log(this.searchText);
  }

  refresh() {
    this.cd.detectChanges();
  }

  openCourseModal() {
    this.modalService.open('course-modal-delete');
  }

  deletedCourse(id: string) {
    this.coursesService.deleteItem(id).
      subscribe(
        data => {
          this.myupdate();
          //this.router.navigate(['courses/list'])
        });
    this.modalService.close('course-modal-delete');
  }

  closeCourseModal() {
    this.modalService.close('course-modal-delete');
  }

}
