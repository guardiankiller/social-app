import { createAction, props } from '@ngrx/store'
import { User } from '../../models/user.model';

export const loadUserProfileInfo = createAction(
    '[User profile] Load user profile info',
    props<{username: string}>()
);

export const loadUserProfileInfoSuccess = createAction(
    '[User profile] Load user profile info success',
    props<{profile: User}>()
);

export const loadUserProfileInfoFail = createAction(
    '[User profile] Load user profile info fail',
    props<{error: Error}>()
);

export const loadUserProfileInfoNotFound = createAction(
    '[User profile] Load user profile not found',
    props<{error: Error}>()
);
