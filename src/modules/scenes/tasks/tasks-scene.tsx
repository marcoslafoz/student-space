import React, { useContext } from 'react'
import { useGetTasksByUserLazyQuery } from '../../../common/api/graphql/query'
import { UserContext } from '../../../common/context'
import { Layout } from '../../layout'
import { TaskList } from '../../components/tasks'

export const TasksScene: React.FC = () => {
  const { userID } = useContext(UserContext)

  const [getTasks, { loading, error, data }] = useGetTasksByUserLazyQuery()

  React.useEffect(() => {
    if (userID) {
      getTasks({ variables: { userId: userID } })
    }
  }, [userID, getTasks])

  if (!data || loading || error) return <></>

  return (
    <Layout>
      <TaskList data={data.getTasksByUserId || []} />
    </Layout>
  )
}
