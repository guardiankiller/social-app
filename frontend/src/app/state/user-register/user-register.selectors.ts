import { createSelector } from '@ngrx/store'
import { AppState } from '../app.state'

const state = (state: AppState) => state.userRegister;

export const selectRegisterInfo = createSelector(
  state,
  state => state.register 
);

export const selectRegisterInfoStatus = createSelector(
    state,
    state => state.status 
);

export const selectRegisterInfoError = createSelector(
    state,
    state => state.error 
);
