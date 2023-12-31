import { LoginProfileState } from "./login-profile/login-profile.reducers";
import { UserProfileState } from "./user-profile/user-profile.reducers";
import { UserRegisterState } from "./user-register/user-register.reducers";

export interface AppState {
    userProfileInfo: UserProfileState
    userRegister: UserRegisterState,
    loginInfo: LoginProfileState
}
