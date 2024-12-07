import React from 'react'
import { User } from '../../../../common/types'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User as UserComponent } from '@nextui-org/react'
import { useAvatarGetListQuery, useLazyMutationUserChangeAvatar } from '../../../../common/api/apollo/graphql/user'
import { UserContext } from '../../../../common/context'

interface UserAvatarProps {
  data: User
  refetchUser: () => void
}

export const UserAvatar: React.FC<UserAvatarProps> = props => {
  const { data, refetchUser } = props

  const { data: avatarData, loading, error } = useAvatarGetListQuery()
  const { userId } = React.useContext(UserContext)

  const [userChangeAvatar] = useLazyMutationUserChangeAvatar()

  const surname: string = data.surname != undefined && data.surname != null ? data.surname : ''

  if (!avatarData || error || loading) return <></>

  return (
    <>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <UserComponent
            name={data.name + ' ' + surname}
            description={'@' + data.username}
            avatarProps={{
              src: data.avatar?.url || 'https://i.imgur.com/v18m7Nx.jpg',
              size: 'lg',
              className: 'hover:opacity-75 cursor-pointer w-16 h-16 gap-6',
            }}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Profile Actions'
          variant='flat'
          onAction={key => {
            userChangeAvatar({
              variables: {
                avatarId: Number(key),
                userId: userId || 0,
              },
            }).then(() => refetchUser())
          }}
        >
          {avatarData.avatarGetList.map(a => (
            <DropdownItem key={a.id} className=''>
              <div className='flex flex-row items-center gap-3 '>
                <div className=''>
                  <img className='size-14 rounded-full' src={a.url} alt={a.title} />
                </div>
                <div className=''>{a.title}</div>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
