import { useUserReadQuery } from '../../../common/api/apollo/graphql/user'
import { User } from '../../../common/types'

interface UserInfoProps {
  id: number
}

export const UserInfo: React.FC<UserInfoProps> = props => {
  const { id } = props

  const { data, loading, error } = useUserReadQuery({ variables: { userId: id } })

  const userData: User | undefined = data?.getUserById

  if (!data || loading || error) return <></>

  return (
    <div>
      <p>Username: {userData?.username}</p>
      <p>Nombre: {userData?.name}</p>
      <p>Surname: {userData?.surname}</p>
      <p>Email: {userData?.email}</p>
    </div>
  )
}
