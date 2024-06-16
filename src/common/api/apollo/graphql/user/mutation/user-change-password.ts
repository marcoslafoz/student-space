import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const USER_CHANGE_PASSWORD = gql`
  mutation userChangePassword($userId: ID, $password: String) {
    userChangePassword(userId: $userId, password: $password)
  }
`

interface UserChangePasswordData {
  userChangePassword: boolean
}

interface UserChangePasswordVars {
  userId: number
  password: string
}

export const useLazyMutationUserChangePassword = (
  options?: MutationHookOptions<UserChangePasswordData, UserChangePasswordVars>
) => {
  return useMutation<UserChangePasswordData, UserChangePasswordVars>(
    USER_CHANGE_PASSWORD,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
