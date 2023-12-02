import { CanActivateFn, Router } from '@angular/router'
import { inject,  } from '@angular/core'
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectStatus } from '../state/login-profile/login-profile.reducers';
import { LoginInfoStatus } from '../models/login.model';

export const isLoggedIn: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let store: Store<AppState> = inject(Store);

    let loggedIn = store.selectSignal(selectStatus)() === LoginInfoStatus.LOGGED_IN;

    return loggedIn || router.navigate(['/login']);
};

export const isNotLoggedIn: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let store: Store<AppState> = inject(Store);

    let loggedIn = store.selectSignal(selectStatus)() !== LoginInfoStatus.LOGGED_IN;

    return loggedIn || router.navigate(['/login']);
};