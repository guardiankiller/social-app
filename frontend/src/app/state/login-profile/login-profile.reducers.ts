import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createReducer, on, createAction, props, createSelector } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { LoginInfo, LoginInfoStatus } from 'src/app/models/login.model';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AppState } from '../app.state';

export interface LoginProfileState {
    status: LoginInfoStatus,
    error?: Error,
    login?: LoginInfo
}

const initalState: LoginProfileState = {
    status: LoginInfoStatus.NOT_LOGGED_IN
};

export const login = createAction(
  '[Login] Login start',
  props<{ login: LoginInfo }>()
);

export const loginSucess = createAction(
    '[Login] Login success'
);

export const loginFail = createAction(
    '[Login] Login failed',
    props<{ error: Error }>()
);

export const logout = createAction(
    '[Login] Logout'
);

export const loginProfileReducer = createReducer(
    initalState,
    on(login, (state, { login }) => ({ ...state, login, status: LoginInfoStatus.PENDING })),
    on(loginSucess, state => ({ ...state, status: LoginInfoStatus.LOGGED_IN })),
    on(loginFail, (state, { error }) => ({ ...state, error, status: LoginInfoStatus.FAIL })),
    on(logout, _ => initalState),
);

const select = (state: AppState) => state.loginInfo;
export const selectUsername = createSelector (
    select,
    state => state.login?.username
);

export const selectStatus = createSelector (
    select,
    state => state.status
);

export const selectError = createSelector (
    select,
    state => state.error
);

@Injectable()
export class LoginProfilerEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        exhaustMap(({ login }) => this.service.verifyLoginInfo(login).pipe(
            map(b=> b ? loginSucess() : loginFail({ error: new Error("Invalid credentials")}))
        ))
    ));

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        exhaustMap(()=> this.router.navigate(['/login']))
    ), { dispatch: false });

    constructor(
        private actions$: Actions, 
        private service: UserProfileService,
        private router: Router) {}
}
