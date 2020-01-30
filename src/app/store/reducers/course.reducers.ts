import { AppState } from './../app.states';
import { initialState } from './auth.reducers';
import { Action } from '@ngrx/store';
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

export interface AppState extends fromRoot.AppState {
  courses : CoursesState;
}

export const  customerAdapter: EntityAdapter<Courses> = createEntityAdapter<Courses>();

export const defaultCourse = {
  ids:  [],
  entities: {},
  selectedCourseId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = customerAdapter.getInitialState(defaultCourse);

export function courseReducer(
  state = initialState,
  action: courseActions.Action
): CoursesState {
  switch (action.type) {

    // LOAD CUSTOMERS
    case courseActions.CourseActionTypes.LOAD_COURSES_SUCCESS: {
      return customerAdapter.addAll(action.payload, {
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

    // CREATE CUSTOMER
    case courseActions.CourseActionTypes.CREATE_COURSES_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.CREATE_COURSES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // UPDATE CUSTOMER
    case courseActions.CourseActionTypes.UPDATE_COURSES_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);
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

    // DELETE CUSTOMER
    case courseActions.CourseActionTypes.DELETE_COURSES_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
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


export const getCurrentCourseId = createSelector(
  getCustomerFeatureState,
  (state: CourseState) => state.selectedCustomerId
);
export const getCurrentCourse = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  state => state.entities[state.selectedCustomerId]
);
