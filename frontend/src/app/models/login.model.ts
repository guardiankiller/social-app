
export interface LoginInfo {
    username: string
    password: string
}

export enum LoginInfoStatus {
    LOGGED_IN, FAIL, NOT_LOGGED_IN, PENDING
}