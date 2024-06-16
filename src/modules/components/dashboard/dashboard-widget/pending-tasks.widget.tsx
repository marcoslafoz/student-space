import React, { useContext } from 'react'
import { UserContext } from '../../../../common/context'
import { TaskItem } from '../../tasks'
import { useTaskGetPendingListByUserLazyQuery } from '../../../../common/api/apollo/graphql/task'

export const PendingTasksWidget: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useTaskGetPendingListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getTasks({ variables: { userId: userId } })
    }
  }, [userId, getTasks])

  if (!data || loading || error || data.taskGetPendingListByUser.length < 1) {
    return <div className='text-sm text-center text-gray-400 mt-20'>Genial! No tienes tareas pendientes</div>
  }

  return (
    <>
      <div className='flex flex-col gap-1.5'>
        {data?.taskGetPendingListByUser.map(e => (
          <TaskItem data={e} enableDescription={false} key={e.id} refetch={refetch} />
        ))}
        <div className='py-6'></div>
      </div>
    </>
  )
}
