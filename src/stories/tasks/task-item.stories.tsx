import { StoryFn, Meta } from '@storybook/react'
import { TaskItem, TaskItemProps } from '../../modules/components/tasks/task-item/task-item'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../common/api/apollo/config/client'

export default {
  title: 'Components/Tasks/Task Item',
  component: TaskItem,
} as Meta

const Story: StoryFn<TaskItemProps> = args => {
  return <ApolloProvider client={client}><TaskItem {...args} /></ApolloProvider>
}

export const TaskItemStory = Story.bind({})
TaskItemStory.args = {
  data: {
    id: 1,
    title: 'Titulo',
    description: 'Esto es una breve descripcion de la tarea',
    checked: false,
    date: '2024-05-20T10:00Z',
    course: {
      id: 11,
      name: '4º ESO',
      color: 'red',
    },
    subject: {
      id: 111,
      name: 'Biología',
      color: 'indigo',
    },
  },
}
