import React from 'react'
import { CourseContext } from '../../../../common/context'
import { Link } from 'react-router-dom'
import { ItemCard } from '../../item'
import { Tooltip } from '@nextui-org/react'
import { PlusIcon } from '../../../../common/constants/icons'
import { CourseAddModal } from '../course-form'

export const CourseList: React.FC = () => {
  const { courseList } = React.useContext(CourseContext)
  const [showCourseAddModal, setShowCourseAddModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='px-3 pb-3 flex items-center gap-2 flex-wrap'>
          <span className='text-xl'>Cursos</span>
          <Tooltip closeDelay={0} content='Añadir curso'>
            <button onClick={() => setShowCourseAddModal(true)}>
              <img src={PlusIcon} className='w-5' alt='Añadir curso' />
            </button>
          </Tooltip>
        </div>
        <div className='flex flex-row flex-wrap gap-2'>
          {courseList.map(c => (
            <Link to={`/courses/detail/${c.id}`} key={c.id}>
              <ItemCard key={c.id} data={c} />
            </Link>
          ))}
        </div>
      </div>
      <CourseAddModal isOpen={showCourseAddModal} onClose={() => setShowCourseAddModal(false)} />
    </>
  )
}
