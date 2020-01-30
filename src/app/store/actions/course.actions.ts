import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {Courses } from '../../common/models/courses.model';

export enum CourseActionTypes {
  LOAD_COURSES = '[Courses] Login',
  LOAD_COURSES_SUCCESS = '[Courses] Success',
  LOAD_COURSES_FAIL = '[Courses] Failure',
  CREATE_COURSES = '[Courses] Create',
  CREATE_COURSES_SUCCESS = '[Courses] Create Success',
  CREATE_COURSES_FAIL = '[Courses] Create Failure',
  UPDATE_COURSES = '[Courses] Update',
  UPDATE_COURSES_SUCCESS = '[Courses] Update Success',
  UPDATE_COURSES_FAIL = '[Courses] Update Failure',
  DELETE_COURSES = '[Courses] Delete',
  DELETE_COURSES_SUCCESS = '[Courses] Delete Success',
  DELETE_COURSES_FAIL = '[Courses] Delete Failure',
}

export class LoadCourses implements Action {
  readonly type = CourseActionTypes.LOAD_COURSES;

  constructor(public payload: number) {}
}

export class LoadCoursesSuccess implements Action {
  readonly type = CourseActionTypes.LOAD_COURSES_SUCCESS;

  constructor(public payload: Courses) {}
}

export class LoadCoursesFail implements Action {
  readonly type = CourseActionTypes.LOAD_COURSES_FAIL;

  constructor(public payload: string) {}
}

export class CreateCourses implements Action {
  readonly type = CourseActionTypes.CREATE_COURSES;

  constructor(public payload: Courses) {}
}

export class CreateCoursesSuccess implements Action {
  readonly type = CourseActionTypes.CREATE_COURSES_SUCCESS;

  constructor(public payload: Courses) {}
}

export class CreateCoursesFail implements Action {
  readonly type = CourseActionTypes.CREATE_COURSES_FAIL;

  constructor(public payload: Courses) {}
}

export class UpdateCourses implements Action {
  readonly type = CourseActionTypes.UPDATE_COURSES;

  constructor(public payload: Courses) {}
}

export class UpdateCoursesSuccess implements Action {
  readonly type = CourseActionTypes.UPDATE_COURSES_SUCCESS;

  constructor(public payload: Update<Courses>) {}
}

export class UpdateCoursesFail implements Action {
  readonly type = CourseActionTypes.UPDATE_COURSES_FAIL;

  constructor(public payload: string) {}

}

export class DeleteCourses implements Action {
  readonly type = CourseActionTypes.DELETE_COURSES;

  constructor(public payload: number) {}
}

export class DeleteCoursesSuccess implements Action {
  readonly type = CourseActionTypes.DELETE_COURSES_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteCoursesFail implements Action {
  readonly type = CourseActionTypes.DELETE_COURSES_FAIL;

  constructor(public payload: string) {}
}



export type Action =
    LoadCourses
  | LoadCoursesSuccess
  | LoadCoursesFail
  | CreateCourses
  | CreateCoursesSuccess
  | CreateCoursesFail
  | UpdateCourses
  | UpdateCoursesSuccess
  | UpdateCoursesFail
  | DeleteCourses
  | DeleteCoursesSuccess
  | DeleteCoursesFail;
