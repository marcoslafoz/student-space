export interface RegisterForm {
  name: string

  email: string
  username: string
  birthdate?: string
  
  password: string
  repeatPassword: string
}


export enum RegisterStepsEnum {
  NAME = 0,
  USERNAME_EMAIL_BIRTHDAY = 1,
  PASSWORD = 2  
}