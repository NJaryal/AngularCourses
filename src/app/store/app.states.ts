import * as auth from './reducers/auth.reducers';
import * as course from './reducers/course.reducers';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer,
  course: course.courseReducer
};
