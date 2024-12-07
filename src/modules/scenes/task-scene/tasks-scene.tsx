import React from 'react'
import { UserContext } from '../../../common/context'
import { TasksView } from '../../components/tasks'
import { useTaskGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/task'
import { CourseProvider } from '../../../common/context/course-context'
import { Helmet } from 'react-helmet'

export const TasksScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useTaskGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getTasks({ variables: { userId: userId } })
    }
  }, [userId, getTasks])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (!data || loading || error) return <></>

  return (
    <>
      <Helmet title='Tareas - StudentSpace' />
      <CourseProvider userId={userId || 0}>
        <TasksView data={data.taskGetListByUser || []} refetch={refetch} />
      </CourseProvider>
    </>
  )
}
