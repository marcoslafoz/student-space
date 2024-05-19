import { StoryFn, Meta } from '@storybook/react'
import {
  TaskItem, TaskItemProps,
} from '../../modules/components/tasks/task-item/task-item.container'

export default {
  title: 'Components/Tasks',
  component: TaskItem,
} as Meta

const Story: StoryFn<TaskItemProps> = args => {
  return <TaskItem {...args} />
}

export const TaskItemStory = Story.bind({})
TaskItemStory.args = {
  data: {
    id: 1,
    title: 'Titulo',
    description: 'Esto es una breve descripcion de la tarea',
    checked: false,
    date: '20:46 19/04',
    academicCourse: {
      id: 11,
      name: 'Literatura',
      color: 'red'
    },
    subject: {
      id: 12,
      name: '4º ESO',
    }
  },
}
