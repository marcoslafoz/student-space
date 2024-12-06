import { User } from '../../../../common/types'

export interface UserSettingForm extends User {
  repeatPassword: string
}
