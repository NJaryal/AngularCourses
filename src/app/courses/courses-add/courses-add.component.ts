import { AppState } from './../../store/app.state';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Courses } from 'src/app/common/models/courses.model';
import { CoursesService } from '../../common/services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/common/services/loader.service';
import * as courseActions from "../../store/actions/course.actions";
import * as fromCourse from "../../store/reducers/course.reducers";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesAddComponent implements OnInit {
  @Input() selectedCourse: Courses;
  createCoursessForm: FormGroup;
  submitted = false;
  courseDuration: number;
  isFullScreenLoader: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    public loaderService: LoaderService,
    private store: Store<fromCourse.IAppState>
  ) { }

  ngOnInit() {
    this.isFullScreenLoader = true;
    this.createCoursessForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      length: ['', [Validators.required]],
      authors: new Array(),
      date: ['', [Validators.required]],
      isTopRated: ['', [Validators.required]]
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.onEditIDEvent(this.route.snapshot.paramMap.get('id'));
    }
    this.isFullScreenLoader = false;
  }

  saveItem() {
    this.isFullScreenLoader = true;
    if (this.createCoursessForm.valid || typeof this.selectedCourse !== "undefined") {
      this.createCoursessForm.value.id = this.selectedCourse.id;
      this.store.dispatch(new courseActions.UpdateCourses(this.createCoursessForm.value));
      this.coursesService.updateCourse(this.createCoursessForm.value).subscribe((res) => {
        this.router.navigate(['/courses/list']);
        this.isFullScreenLoader = false;
      });
    } else {
      const newCourse: Courses = {
        name: this.createCoursessForm.get("name").value,
        description: this.createCoursessForm.get("description").value,
        length: this.createCoursessForm.get("length").value,
        authors: this.createCoursessForm.get("authors").value,
        date: this.createCoursessForm.get("date").value,
        isTopRated: this.createCoursessForm.get("isTopRated").value
      };
      this.store.dispatch(new courseActions.CreateCourses(newCourse));
      this.coursesService.createCourse(this.createCoursessForm.value).subscribe((res) => {
        this.router.navigate(['/courses/list']);
        this.createCoursessForm.reset();
        this.isFullScreenLoader = false;
      });
    }

  }

  onEditIDEvent(id: string): void {
    this.loaderService.isFullScreenLoader = true;
    this.coursesService.getItemById(id).subscribe(res => this.createCoursessForm.patchValue(res));
    this.loaderService.isFullScreenLoader = false;
  }
}



