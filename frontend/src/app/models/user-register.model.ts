export interface UserRegister {
    username: string
    firstName: string
    lastName: string
    userEmail: string
    dateOfBirth: Date
    gender: 'MALE' | 'FEMALE',
    password: string,
    confirmPassword: string
}