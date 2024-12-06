import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const USER_CHANGE_AVATAR = gql`
  mutation userChangeAvatar($userId: ID, $avatarId: ID) {
    userChangeAvatar(userId: $userId, avatarId: $avatarId)
  }
`

interface UserChangeAvatarData {
  userChangeAvatar: boolean
}

interface UserChangeAvatarVars {
  userId: number
  avatarId: number
}

export const useLazyMutationUserChangeAvatar = (
  options?: MutationHookOptions<UserChangeAvatarData, UserChangeAvatarVars>
) => {
  return useMutation<UserChangeAvatarData, UserChangeAvatarVars>(
    USER_CHANGE_AVATAR,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
