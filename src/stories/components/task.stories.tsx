import { StoryFn, Meta } from '@storybook/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { TaskItemComponent as TaskItem, TaskItemComponentProps as TaskItemProps } from '../../modules/components/task-item/task-item.component'

export default {
  title: 'Components/TaskItem',
  component: TaskItem,
  parameters: {
    description: {
      component: 'Esta es una breve descripción de MiComponente.',
    },
  }
} as Meta

const Story: StoryFn<TaskItemProps> = args => {
  return (
    <TaskItem {...args}/>
  )
}

export const TaskItemStory = Story.bind({})
TaskItemStory.args = {
  data: { id: 0, title: 'Titulo', description: 'Esto en una simple descripcion', isChecked: true }
}
