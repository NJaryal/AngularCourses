import { AppState } from './../app.state';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as courseActions from '../actions/course.actions';
import { Store, State, select } from "@ngrx/store";
import { CreateCourses } from '../actions/course.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Courses } from 'src/app/common/models/courses.model';

export interface CoursesState extends EntityState<Courses> {
  selectedCourseId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

 export interface IAppState extends EntityState<Courses> {
  courses : CoursesState;
}

export const  courseAdapter: EntityAdapter<Courses> = createEntityAdapter<Courses>();

export const defaultCourse = {
  ids:  [],
  entities: {},
  selectedCourseId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState:CoursesState = courseAdapter.getInitialState(defaultCourse);

export function courseReducer(
  state = initialState,
  action: courseActions.courseAction
): CoursesState {
  switch (action.type) {

    // LOAD COURSES
    case courseActions.CourseActionTypes.LOAD_COURSES_SUCCESS: {
      return courseAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case courseActions.CourseActionTypes.LOAD_COURSES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // CREATE COURSE
    case courseActions.CourseActionTypes.CREATE_COURSES_SUCCESS: {
      return courseAdapter.addOne(action.payload, initialState);
    }
    case courseActions.CourseActionTypes.CREATE_COURSES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: "Fail"
      };
    }

    // UPDATE COURSE
    case courseActions.CourseActionTypes.UPDATE_COURSES_SUCCESS: {
      return courseAdapter.updateOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.UPDATE_COURSES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // DELETE COURSE
    case courseActions.CourseActionTypes.DELETE_COURSES_SUCCESS: {
      return courseAdapter.removeOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.DELETE_COURSES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }


    default: {
      return state;
    }
  }
}

const getCoursesFeatureState = createFeatureSelector<CoursesState>(
  "courses;"
)

export const getCourses = createSelector(
  getCoursesFeatureState,
  courseAdapter.getSelectors().selectAll
);

export const getError = createSelector(
  getCoursesFeatureState,
  (state: CoursesState) => state.error
)


export const getCurrentCourseId = createSelector(
  getCoursesFeatureState,
  (state: CoursesState) => state.ids
);

export const getCurrentCourse = createSelector(
  getCoursesFeatureState,
  getCurrentCourseId,
  state => state.entities
);








