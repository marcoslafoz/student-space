import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID, UserData } from '../../../common/api/graphql/user'

interface TestProps {
  id: number | null
}

export const Test: React.FC<TestProps> = props => {

  const { id } = props


  const { data } = useQuery<UserData>(GET_USER_BY_ID, { variables: { userId: id }, })


  const userData = data?.getUserById

  return (
    <div>
      <p>{userData?.name}</p>
      <p>{userData?.email}</p>
      <p>{userData?.surname}</p>
      <p>{userData?.username}</p>
    </div>
  )
}
