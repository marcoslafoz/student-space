import React, { useContext } from 'react'
import { useGetTasksByUserLazyQuery } from '../../../common/api/graphql/query'
import { UserContext } from '../../../common/context'
import { Layout } from '../../layout'
import { TaskList } from '../../components/tasks'
import { useLazyMutationRemoveCheckedTasks } from '../../../common/api/graphql/mutation'
import { Chip } from '@nextui-org/react'

export const TasksScene: React.FC = () => {
  const { userID } = useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useGetTasksByUserLazyQuery()

  React.useEffect(() => {
    if (userID) {
      getTasks({ variables: { userId: userID } })
    }
  }, [userID, getTasks])

  const [removeCheckedTasks] = useLazyMutationRemoveCheckedTasks()

  const handleRemoveCheckedTasks = () => {
    if (!userID) return

    removeCheckedTasks({
      variables: {
        userId: userID,
      },
    }).then(() => refetch())
  }

  if (!data || loading || error) return <></>

  return (
    <Layout>
      <button onClick={handleRemoveCheckedTasks}>
        <Chip variant='flat' color='warning' size='sm'>
          Borrar tareas completadas
        </Chip>
      </button>
      <TaskList data={data.getTasksByUserId || []} refetch={() => refetch()} />
    </Layout>
  )
}
