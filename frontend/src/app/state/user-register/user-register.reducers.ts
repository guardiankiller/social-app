import { createReducer, on } from '@ngrx/store'
import { Status } from 'src/app/models/status.model'
import { UserRegister } from 'src/app/models/user-register.model'
import { registerUserSubmit, registerUserFail, registerUserReset, registerUserSuccess, registerUserFill } from './user-register.actions'

export interface UserRegisterState {
    register?: UserRegister
    status: Status
    error?: Error
}

const initalState = {
    status: Status.INIT
}

export const userRegisterReducer = createReducer(
    initalState,
    on(registerUserFill, (state, { register }) => ({ ...state, register })),
    on(registerUserSubmit, state => ({ ...state, status: Status.LOADING })),
    on(registerUserSuccess, state => ({ ...state, status: Status.SUCCESS })),
    on(registerUserFail, (state, { error }) => ({ ...state, error, status: Status.FAIL })),
    on(registerUserReset, _ => initalState)
);
