import { useGetAcademicCourseListQuery, useGetUserQuery } from '../../../common/api/graphql/query'
import { User } from '../../../common/types'

interface UserInfoProps {
  id: number
}

export const UserInfo: React.FC<UserInfoProps> = props => {
  const { id } = props

  const { data, loading, error } = useGetUserQuery({ variables: { userId: id } })
  const {data: academicCourseData} = useGetAcademicCourseListQuery({variables: {userId: id}})

  console.log('AQUI',academicCourseData?.getAcademicCourseListByUserId)

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
