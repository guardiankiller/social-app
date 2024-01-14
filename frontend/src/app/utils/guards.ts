import { CanActivateFn, Router } from '@angular/router'
import { inject,  } from '@angular/core'
import { LoginInfoStatus } from '../models/login.model';
import { UserAuthenticationService } from '../services/user-authentication.service';

export const isLoggedIn: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let service: UserAuthenticationService = inject(UserAuthenticationService);

    let loggedIn = service.status() === LoginInfoStatus.LOGGED_IN;

    return loggedIn || router.navigate(['/login']);
};

export const isNotLoggedIn: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let service: UserAuthenticationService = inject(UserAuthenticationService);

    let loggedIn = service.status() !== LoginInfoStatus.LOGGED_IN;

    return loggedIn || router.navigate(['/login']);
};