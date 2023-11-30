import { createSelector } from '@ngrx/store'
import { AppState } from '../app.state'

const userProfileState = (state: AppState) => state.userProfileInfo;

export const selectUserProfileInfo = createSelector(
    userProfileState,
    state => state.profile
);

export const selectUserProfileStatus = createSelector(
    userProfileState,
    state => state.status
);

export const selectUserProfileError = createSelector(
    userProfileState,
    state => state.error
);