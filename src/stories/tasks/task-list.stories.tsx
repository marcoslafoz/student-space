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
  data : [
    {
      id: 1,
      title: 'Leer capítulo 5',
      description: 'Leer y analizar el capítulo 5 del libro de literatura.',
      checked: false,
      date: '2024-05-19T17:34Z',
      academicCourse: {
        id: 2121,
        name: '3º Ingieneria',
        color: 'yellow',
      },
      subject: {
        id: 12,
        name: 'Literatura',
        color: 'blue',
      },
    },
    {
      id: 2,
      title: 'Resolver problemas de álgebra',
      description: 'Completar los ejercicios 1 a 10 de la página 42 del libro de matemáticas.',
      checked: false,
      date: '2024-05-20T10:00Z',
      academicCourse: {
        id: 11,
        name: '4º ESO',
        color: 'pink',
      },
      subject: {
        id: 13,
        name: 'Matemáticas',
        color: 'green',
      },
    },
    {
      id: 3,
      title: 'Preparar presentación de historia',
      description: 'Crear diapositivas para la presentación sobre la Revolución Francesa.',
      checked: false,
      date: '2024-05-21T15:00Z',
      academicCourse: {
        id: 99,
        name: '1º DAM',
        color: 'indigo',
      },
      subject: {
        id: 14,
        name: 'Historia',
        color: 'yellow',
      },
    },
    {
      id: 4,
      title: 'Experimento de química',
      description: 'Realizar el experimento sobre las reacciones químicas y redactar un informe.',
      checked: true,
      date: '2024-05-18T09:00Z',
      academicCourse: {
        id: 11,
        name: '4º ESO',
        color: 'pink',
      },
      subject: {
        id: 15,
        name: 'Química',
        color: 'purple',
      },
    },
    {
      id: 5,
      title: 'Ensayo de inglés',
      description: 'Escribir un ensayo sobre las diferencias culturales entre países angloparlantes.',
      checked: false,
      date: '2024-05-22T18:00Z',
      academicCourse: {
        id: 99,
        name: '1º DAM',
        color: 'indigo',
      },
      subject: {
        id: 16,
        name: 'Inglés',
        color: 'red',
      },
    },
  ]

}
