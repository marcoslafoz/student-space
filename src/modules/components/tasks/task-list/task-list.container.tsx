import React, { useState } from 'react'
import { AcademicCourse, Subject, Task } from '../../../../common/types'
import { TaskItem } from '../task-item'
import { Chip } from '@nextui-org/react'
import { TaskFilterChip } from './task-filter-chip'
import { AddTaskModal } from '../add-task/add-task-modal'

export interface TaskListProps {
  data: Task[]
  refetch: () => void
}

export const TaskList: React.FC<TaskListProps> = props => {
  const { data, refetch } = props

  const [showModal, setShowModal] = React.useState<boolean>(false)

  const uniqueCourses: AcademicCourse[] = []
  const uniqueSubjects: Subject[] = []

  data.forEach(task => {
    if (task.academicCourse?.id && !uniqueCourses.some(course => course.id === task.academicCourse?.id)) {
      uniqueCourses.push(task.academicCourse)
    }
  })

  data.forEach(task => {
    if (task.subject?.id && !uniqueSubjects.some(subject => subject.id === task.subject?.id)) {
      uniqueSubjects.push(task.subject)
    }
  })

  const [selectedCourses, setSelectedCourses] = useState<AcademicCourse[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([])

  const [resetCounter, setResetCounter] = useState<number>(0)

  const filterTasksByCourse = (course: AcademicCourse) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id))
    } else {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const filterTasksBySubject = (subject: Subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(c => c.id !== subject.id))
    } else {
      setSelectedSubjects([...selectedSubjects, subject])
    }
  }

  const handleResetFilter = () => {
    setResetCounter(prevCounter => prevCounter + 1)
    setSelectedCourses([])
    setSelectedSubjects([])
  }

  return (

    <>
      <div className='flex flex-col min-[1200px]:flex-row gap-6'>
        <div className='grid grid-cols-1 space-y-3 flex-grow'>
          <div className='flex whitespace-pre-wrap space-x-0 justify-between gap-3 '>
            <div className='flex flex-wrap items-center gap-3 '>

              {uniqueCourses.map(course => (
                <TaskFilterChip
                  key={`${course.id}-${resetCounter}`}
                  data={course}
                  onClick={() => filterTasksByCourse(course)}
                  selected={selectedCourses.some(c => c.id === course.id)}
                />
              ))}

              {uniqueCourses.length > 0 && <span className='text-gray-200'>|</span>}

              {uniqueSubjects.map(subject => (
                <TaskFilterChip
                  key={`${subject.id}-${resetCounter}`}
                  data={subject}
                  onClick={() => filterTasksBySubject(subject)}
                  selected={selectedSubjects.some(c => c.id === subject.id)}
                />
              ))}

              {uniqueSubjects.length > 0 && <span className='text-gray-200'>|</span>}

              <div>
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
            <div>
              <button className='rounded-xl' onClick={() => setShowModal(true)}>
                <Chip
                  variant='flat'
                  color='primary'
                  classNames={{ content: 'px-1' }}
                  size='sm'
                  endContent={<></>} >
                  Añadir tarea
                </Chip>
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-y-2'>
            {data
              .filter(task => selectedCourses.length === 0 || selectedCourses.some(c => c.id === task.academicCourse?.id))
              .filter(task => selectedSubjects.length === 0 || selectedSubjects.some(s => s.id === task.subject?.id))
              .map(t => (
                <TaskItem key={t.id} data={t} refetch={refetch} />
              ))}
          </div>
        </div>
        <div className='flex-grow  min-[1200px]:mt-10  flex-shrink-0  min-[1200px]:w-20'>
          <div className='w-36 h-36 flex items-center justify-center rounded-xl border text-7xl font-sans text-gray-300'>
            {data.filter(t => !t.checked).length}
          </div>
        </div>
      </div>
      <AddTaskModal isOpen={showModal} onClose={() => setShowModal(false)} refetch={refetch} />
    </>
  )
}