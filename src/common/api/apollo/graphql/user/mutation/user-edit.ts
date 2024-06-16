import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { User } from '../../../../../types'

const USER_EDIT = gql`
  mutation userEdit($user: InputUserDto) {
    userEdit(user: $user)
  }
`

interface UserEditData {
  userEdit: boolean
}

interface UserEditVars {
  user: User
}

export const useLazyMutationUserEdit = (options?: MutationHookOptions<UserEditData, UserEditVars>) => {
  return useMutation<UserEditData, UserEditVars>(
    USER_EDIT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
