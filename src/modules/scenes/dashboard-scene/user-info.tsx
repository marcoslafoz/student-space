import { useUserReadQuery } from '../../../common/api/apollo/graphql/user'
import { User } from '../../../common/types'

interface UserInfoProps {
  id: number
}

export const UserInfo: React.FC<UserInfoProps> = props => {
  const { id } = props

  const { data, loading, error } = useUserReadQuery({ variables: { userId: id } })

  const userData: User | undefined = data?.userRead

  if (!data || loading || error) return <></>

  return (
    <div>
      {userData?.name && (
        <div className='text-2xl'>
          Bienvenido de nuevo <span className='text-bold'>{userData.name}</span>!
        </div>
      )}
    </div>
  )
}
