import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/common/modal/modal.service';
import { of, Observable } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { LoaderService } from 'src/app/common/services/loader.service';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {

  @ViewChild('movieSearchInput',{static: true}) movieSearchInput: ElementRef;
  apiResponse:any;
  isSearching:boolean;
  @Input() courseList: Courses;
  courses: Courses | any;
   data$: Observable<string[]>;
  list$: Observable<string[]>;
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
    private modalService: ModalService,
    private spinner: NgxSpinnerService,
    public loaderService: LoaderService
  ) {
    this.spinner.show();
    this.coursesService.getList().subscribe(
      (res: any) => {
        this.courses = res;
        this.myupdate();
        this.spinner.hide();
      }
    );
    this.myupdate();
  }

  ngOnInit() {
    this.spinner.show();
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      ,filter(res => res.length > 3)
      // Time in milliseconds between key events
      ,debounceTime(1000)
      // If previous query is diffent from current
      ,distinctUntilChanged()
      // subscription for response
      ).subscribe((text: string) => {
        this.isSearching = true;
        this.coursesService.getItemByText(text).subscribe((res)=>{
          console.log('res',res);
          this.isSearching = false;
          this.courses = res;
          this.myupdate();
          this.spinner.hide();
        },(err)=>{
          this.isSearching = false;
          console.log('error',err);
        });
      });

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
    this.loaderService.isFullScreenLoader = true;
    this.coursesService.deleteItem(id).
      subscribe(
        data => {
          this.myupdate();
          this.loaderService.isFullScreenLoader = false;
        });
    this.modalService.close('course-modal-delete');
  }

  closeCourseModal() {
    this.modalService.close('course-modal-delete');
  }

}
