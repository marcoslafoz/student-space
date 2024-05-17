import { Task } from '../../../common/types'

export interface TaskItemComponentProps {
  data: Task
}

export const TaskItemComponent: React.FC<TaskItemComponentProps> = props => {
  
  const {data} = props
  
  return (
    <div className="container">
      {data.title}
    </div>
  )
}