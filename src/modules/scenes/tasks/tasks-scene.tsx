import React from 'react'
import { UserContext } from '../../../common/context'
import { TasksView } from '../../components/tasks'
import { useTaskGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/task'
import { CourseProvider } from '../../../common/context/course-context'

export const TasksScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useTaskGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getTasks({ variables: { userId: userId } })
    }
  }, [userId, getTasks])

  if (!data || loading || error) return <></>

  return (
    <CourseProvider userId={userId || 0}>
      <TasksView data={data.taskGetListByUser || []} refetch={refetch} />
    </CourseProvider>
  )
}
