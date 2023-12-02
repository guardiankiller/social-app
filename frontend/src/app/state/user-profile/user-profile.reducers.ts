import { createReducer, on } from '@ngrx/store'
import { User } from 'src/app/models/user.model'
import { loadUserProfileInfo, loadUserProfileInfoFail, loadUserProfileInfoNotFound, loadUserProfileInfoSuccess } from './user-profile.actions'
import { Status } from 'src/app/models/status.model'

export interface UserProfileState {
    profile?: User
    status: Status
    error?: Error
}

const initialState: UserProfileState = {
    status: Status.INIT
} 

export const userProfileReducer = createReducer(
    initialState,
    on(loadUserProfileInfo, state => ({ ...state, status: Status.LOADING})),
    on(loadUserProfileInfoSuccess, (state, { profile }) => ({ ...state, profile, status: Status.SUCCESS})),
    on(loadUserProfileInfoFail, (state, { error }) => ({ ...state, error, status: Status.FAIL})),
    on(loadUserProfileInfoNotFound, (state, { error }) => ({ ...state, error, status: Status.NOT_FOUND})),
);

