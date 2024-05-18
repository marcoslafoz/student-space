import React, { useContext } from 'react'
import { TaskList } from './tasks'
import { useGetAcademicCourseListQuery, useGetTasksByUserLazyQuery } from '../../../common/api/graphql/query'
import { UserContext } from '../../../common/context'
import { Layout } from '../../layout'

export const TasksScene: React.FC = () => {
  const { userID } = useContext(UserContext)


  const [getTasks, { loading, error, data }] = useGetTasksByUserLazyQuery()

  React.useEffect(() => {
    if (userID) {
      getTasks({ variables: { userId : userID } })
    }
  }, [userID, getTasks])

  if (!data || loading || error) return <></>



  return (
    <Layout>
      <TaskList data={data.getTasksByUserId || []} />
    </Layout>
  )
}
