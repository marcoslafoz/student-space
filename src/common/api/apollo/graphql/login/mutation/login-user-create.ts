import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { User } from '../../../../../types'

const USER_CREATE = gql`
  mutation userCreate($user: InputUserDto) {
    userCreate(user: $user)
  }
`

interface UserCreateData {
  userCreate: string
}

interface UserCreateVars {
  user: User
}

export const useLazyMutationUserCreate = (options?: MutationHookOptions<UserCreateData, UserCreateVars>) => {
  return useMutation<UserCreateData, UserCreateVars>(
    USER_CREATE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}