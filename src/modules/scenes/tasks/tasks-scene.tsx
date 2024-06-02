import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { Layout } from '../../components/layout'
import { TaskList } from '../../components/tasks'
import { useTaskGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/task'
import { CourseProvider } from '../../../common/context/course-context'

export const TasksScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useTaskGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getTasks({ variables: { userId: userId } })
    }
  }, [userId, getTasks])

  if (!data || loading || error) return <></>

  return (
    <CourseProvider userId={userId || 0}>
      <Layout>
        <TaskList data={data.taskGetListByUser || []} refetch={() => refetch()} />
      </Layout>
    </CourseProvider>
  )
}
