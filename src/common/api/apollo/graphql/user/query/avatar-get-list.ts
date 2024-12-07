import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { Avatar } from '../../../../../types'

const GET_AVATAR_LIST = gql`
  query avatarGetList {
    avatarGetList {
      id
      url
      title
    }
  }
`

interface AvatarGetListData {
  avatarGetList: Avatar[]
}

interface AvatarGetListVars {}

export const useAvatarGetListLazyQuery = (options?: LazyQueryHookOptions<AvatarGetListData, AvatarGetListVars>) => {
  return useLazyQuery<AvatarGetListData, AvatarGetListVars>(GET_AVATAR_LIST, {
    errorPolicy: 'all',
    ...options,
  })
}

export const useAvatarGetListQuery = (options?: QueryHookOptions<AvatarGetListData, AvatarGetListVars>) => {
  return useQuery<AvatarGetListData, AvatarGetListVars>(GET_AVATAR_LIST, {
    errorPolicy: 'all',
    ...options,
  })
}
