import { User } from '../../../../common/types'

export interface RegisterForm extends User {
  // name: string

  // email: string
  // username: string
  // birthdate?: string

  // password: string
  repeatPassword: string
}

export enum RegisterStepsEnum {
  NAME = 0,
  USERNAME_EMAIL_BIRTHDAY = 1,
  PASSWORD = 2,
}
