import { Task } from '../../../common/types'

interface TaskListProps {
  data: Task[]
}

export const TaskList: React.FC<TaskListProps> = props => {
  const { data } = props

  return (
    <>
      <div className="px-8">
        {data.map(t => (
          <li key={t.id}>{t.title + ' ' + t.description + ' | ' + (t.academicCourse?.name ? t.academicCourse?.name : '')}</li>
        ))}
      </div>
    </>
  )
}
