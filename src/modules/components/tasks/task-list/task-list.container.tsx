import React, { useState } from 'react'
import { AcademicCourse, Subject } from '../../../../common/types'
import { TaskItem } from '../task-item'
import { Chip } from '@nextui-org/react'
import { TaskFilterChip } from './filter/task-filter-chip'

export interface Task {
  id: number
  title: string
  date?: string
  description?: string
  checked: boolean
  academicCourse?: AcademicCourse
  subject?: Subject
}

export interface TaskListProps {
  data: Task[]
  refetch: () => void
}

export const TaskList: React.FC<TaskListProps> = props => {
  const { data, refetch } = props

  const uniqueCourses: AcademicCourse[] = []

  data.forEach(task => {
    if (task.academicCourse?.id && !uniqueCourses.some(course => course.id === task.academicCourse?.id)) {
      uniqueCourses.push(task.academicCourse)
    }
  })

  const [selectedCourses, setSelectedCourses] = useState<AcademicCourse[]>([])
  const [resetCounter, setResetCounter] = useState<number>(0)

  const filterTasksByCourse = (course: AcademicCourse) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id))
    } else {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const handleResetFilter = () => {
    setResetCounter(prevCounter => prevCounter + 1)
    setSelectedCourses([])
  }

  return (
    <div className='grid grid-cols-1 gap-y-2'>
      <div className='grid grid-cols-1 space-y-2'>
        <div className='flex flex-wrap items-center gap-3'>
          {uniqueCourses.map(course => (
            <TaskFilterChip
              key={`${course.id}-${resetCounter}`}
              data={course}
              onClick={() => filterTasksByCourse(course)}
              selected={selectedCourses.some(c => c.id === course.id)}
            />
          ))}

          <button onClick={handleResetFilter}>
            <Chip
              size='sm'
              classNames={{
                base: 'bg-red-200',
                content: ' text-red-500 px-1',
                closeButton: 'text-red-500',
              }}
              variant='flat'
            >
              Reiniciar filtro
            </Chip>
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-y-2'>
        {data
          .filter(task => selectedCourses.length === 0 || selectedCourses.some(c => c.id === task.academicCourse?.id))
          .map(t => (
            <TaskItem key={t.id} data={t} refetch={refetch} />
          ))}
      </div>
    </div>
  )
}
