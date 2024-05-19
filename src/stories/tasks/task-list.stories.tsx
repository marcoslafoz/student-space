import { StoryFn, Meta } from '@storybook/react'
import { TaskList, TaskListProps } from '../../modules/components/tasks'

export default {
  title: 'Components/Tasks',
  component: TaskList,
} as Meta

const Story: StoryFn<TaskListProps> = args => {
  return <TaskList {...args} />

}

export const TaskListStory = Story.bind({})
TaskListStory.args = {
  data: [{
    id: 1,
    title: 'Leer capítulo 5',
    description: 'Leer y analizar el capítulo 5 del libro de literatura.',
    checked: false,
    date: '18:30 20/05',
    academicCourse: {
      id: 11,
      name: 'Literatura',
      color: 'red'
    },
    subject: {
      id: 12,
      name: '4º ESO'
    }
  },
  {
    id: 2,
    title: 'Escribir ensayo',

    checked: true,
    date: '14:00 21/05',
    academicCourse: {
      id: 11,
      name: 'Literatura',
      color: 'orange'
    },

  },
  {
    id: 3,
    title: 'Presentación grupal',
    description: 'Preparar una presentación grupal sobre el Renacimiento.',
    checked: false,
    date: '10:00 22/05',
    academicCourse: {
      id: 11,
      name: 'Historia',
      color: 'green'
    },
    subject: {
      id: 13,
      name: '3º ESO',
      color: 'teal'
    }
  },
  {
    id: 4,
    title: 'Resolver ejercicios',
    checked: true,
    academicCourse: {
      id: 12,
      name: 'Matemáticas'
    },
  },
  {
    id: 5,
    title: 'Practicar conversación',
    description: 'Practicar conversación en inglés sobre temas cotidianos.',
    checked: false,
    date: '09:00 24/05',
    academicCourse: {
      id: 13,
      name: 'Inglés',
      color: 'indigo'
    },
    subject: {
      id: 15,
      name: '1º ESO'
    }
  }],
}
