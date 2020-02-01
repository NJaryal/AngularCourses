
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../common/auth/_services/auth.service';
import {
  AuthenticationActionTypes,
  Login, LoginSuccess, LoginFailure
} from '../actions/auth.actions';


@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN),

      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authenticationService.login(payload.username, payload.password)
        .pipe(
          map((user) => {
            console.log(user);
            return new LoginSuccess({token: user.token, username: payload.username});
          }),
          catchError((error) => {
            return of(new LoginFailure({ error: error }));
          }));
    }));


  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('username', user.payload.username);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public Logout: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigateByUrl('/login');
    })
  );
}
