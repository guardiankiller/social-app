import { createAction, props } from '@ngrx/store'
import { UserRegister } from 'src/app/models/user-register.model';

export const registerUserSubmit = createAction(
    '[User profile] Register new user'
);

export const registerUserFill = createAction(
    '[User profile] Register new user fill',
    props<{register: UserRegister}>()  
);

export const registerUserSuccess = createAction(
    '[User profile] Register new user success' 
);

export const registerUserFail = createAction(
    '[User profile] Register new user fail',
    props<{error: Error}>()  
);

export const registerUserReset = createAction(
    '[User profile] Register new user reset'
);
