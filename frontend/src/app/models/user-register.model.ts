export interface UserRegister {
    username: string
    firstName: string
    lastName: string
    email: string
    dateOfBirth: Date
    gender: 'MALE' | 'FEMALE'
}