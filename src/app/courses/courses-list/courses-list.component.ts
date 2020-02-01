import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/common/modal/modal.service';
import { of, Observable } from "rxjs";
import { User } from './../../common/models/user.model';
import { AppState, selectAuthenticationState } from './../../store/app.state';
import { Logout } from './../../store/actions/auth.actions';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { LoaderService } from 'src/app/common/services/loader.service';
import { Store, State, select } from "@ngrx/store";
import * as courseActions from "../../store/actions/course.actions";
import * as fromCourse from "../../store/reducers/course.reducers";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  user:User;
  getState: Observable<any>;
  isAuthenticated: boolean = false;
  courses$: Observable<Courses | any>;
  error$: Observable<String>;
  @ViewChild('courseSearchInput',{static: true}) courseSearchInput: ElementRef;
  apiResponse:any;
  isSearching:boolean;
  @Input() courseList: Courses;
  coursesData: Courses | any;
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
    public loaderService: LoaderService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.spinner.show();
    this.coursesService.getList().subscribe(
      (res: any) => {
        this.coursesData = res;
        this.myupdate();
        this.spinner.hide();
      }
    );
    this.myupdate();
  }

  ngOnInit() {
    this.store.dispatch(new courseActions.LoadCourses());
    this.courses$ = this.store.pipe(select(fromCourse.getCourses));
    this.error$ = this.store.pipe(select(fromCourse.getError));

    this.spinner.show();


    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });


    fromEvent(this.courseSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,filter(res => res.length > 3)
      ,debounceTime(1000)
      ,distinctUntilChanged()
      ).subscribe((text: string) => {
        this.isSearching = true;
        this.coursesService.getItemByText(text).subscribe((res)=>{
          console.log('res',res);
          this.isSearching = false;
          this.coursesData = res;
          this.myupdate();
          this.spinner.hide();
        },(err)=>{
          this.isSearching = false;
          console.log('error',err);
        });
      });

  }

  logout(): void {
    this.store.dispatch(new Logout);
  }


  myupdate() {
    this.cd.markForCheck();
    if (typeof this.coursesData !== 'undefined') {
      this.collection.count = this.coursesData.length || 0;
      this.collection.data = this.coursesData;
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
    this.store.dispatch(new courseActions.DeleteCourses(this.coursesData.id));
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
