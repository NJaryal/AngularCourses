import { Courses } from 'src/app/common/models/courses.model';
import { Action } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CoursesService } from '../common/services/courses.service';
//import { CourseActionTypes, All } from './actions/course.actions';
import * as courseActions from './actions/course.actions';

@Injectable()
export class CourseEffects {

  constructor(
    private actions$: Actions,
    private customerService: CoursesService
  ) { }

  // CREATE COURSE
  @Effect()
  createCourse$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.CreateCourses>(
      courseActions.CourseActionTypes.CREATE_COURSES
    ),
    map((action: courseActions.CreateCourses) => action.payload),
    mergeMap((course: Courses) =>
      this.customerService.createCourse(course).pipe(
        map(
          (newCustomer: any) =>
            new courseActions.CreateCoursesSuccess(newCustomer)
        ),
        catchError(err => of(new courseActions.CreateCoursesFail(err)))
      )
    )
  );

  @Effect()
  loadCourses$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.LoadCourses>(
      courseActions.CourseActionTypes.LOAD_COURSES
    ),
    mergeMap((action: courseActions.LoadCourses) =>
      this.customerService.getList().pipe(
        map(
          (customers: Courses) =>
            new courseActions.LoadCoursesSuccess(customers)
        ),
        catchError(err => of(new courseActions.LoadCoursesFail(err)))
      )
    )
  );

// LOAD CUSTOMER


/*   //Update
  @Effect()
  updateCustomer$ = this.actions$.pipe(
    ofType<courseActions.UpdateCustomer>(
      courseActions.CourseActionTypes.UPDATE_CUSTOMER
    ),
    map((action: courseActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(
          (updatedCustomer: Customer) =>
            new courseActions.UpdateCustomerSuccess({
              id: updatedCustomer.id,
              changes: updatedCustomer
            })
        )
        catchError(err => of(new courseActions.UpdateCustomerFail(err)))
      )
    )
  );


  //Delete
  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(courseActions.CourseActionTypes.DELETE_CUSTOMER),
    map((action: courseActions.DeleteCustomer) => action.payload),
    mergeMap((id: number) =>
      this.customerService.deleteCustomer(id).pipe(
        map(() => new courseActions.DeleteCustomerSuccess(id)),
        catchError(err => of(new courseActions.DeleteCustomerFail(err)))
      )
    )
  ); */


}




