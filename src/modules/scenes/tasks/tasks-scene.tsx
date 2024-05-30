import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { Layout } from '../../components/layout'
import { TaskList } from '../../components/tasks'
import { useTaskGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/task'

export const TasksScene: React.FC = () => {
  const { userID } = useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useTaskGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userID) {
      getTasks({ variables: { userId: userID } })
    }
  }, [userID, getTasks])

  if (!data || loading || error) return <></>

  return (
    <Layout>
      <TaskList data={data.taskGetListByUser || []} refetch={() => refetch()} />
    </Layout>
  )
}
