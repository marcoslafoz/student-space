import React, { useState } from 'react'
import { AcademicCourse, Task } from '../../../../common/types'
import { TaskItem } from '../task-item'
import { Chip } from '@nextui-org/react';
import { colorClasses } from '../../../../common/constants/colors';
import { TaskChip } from '../task-item/task-chip';
import { TaskFilterChip } from '../task-item/task-filter-chip';

export interface TaskListProps {
  data: Task[];
}

export const TaskList: React.FC<TaskListProps> = (props) => {
  const { data } = props


  const uniqueCourses: AcademicCourse[] = []
  
  data.forEach((task) => {
    if (task.academicCourse?.id && !uniqueCourses.some((course) => course.id === task.academicCourse?.id)) {
      uniqueCourses.push(task.academicCourse)
    }
  })

  const [selectedCourses, setSelectedCourses] = useState<AcademicCourse[]>([])

  const filterTasksByCourse = (course: AcademicCourse) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id))
    } else {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const resetFilter = () => {
    setSelectedCourses([])
  }
  
  return (
    <>
      <div className='grid grid-cols-1 gap-y-2'>


        <div className='grid grid-cols-1 space-y-2'>


          <div className='flex flex-wrap items-center gap-3'>
            
            {uniqueCourses.map((course) => (
              <TaskFilterChip key={course.id} data={course} onClick={() => filterTasksByCourse(course)} />
            ))}

            <button onClick={resetFilter}>
              <Chip
                size='sm'
                classNames={{
                  base: 'bg-red-200',
                  content: ' text-red-500 px-1',
                  closeButton: 'text-red-500'
                }}
                variant="flat"
                onClose={resetFilter} >
                Reiniciar filtro
              </Chip>
            </button>
          </div>

        </div>

        <div className='grid grid-cols-1 gap-y-2'>
          {data
            .filter((task) => selectedCourses.length === 0 || selectedCourses.some((c) => c.id === task.academicCourse?.id))
            .map((t) => (
              <TaskItem key={t.id} data={t} />
            ))}
        </div>
      </div>
    </>
  )
}
