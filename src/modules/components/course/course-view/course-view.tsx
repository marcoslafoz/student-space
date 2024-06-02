import React from 'react'
import { Course } from '../../../../common/types'
import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EditIcon } from '../../../../common/constants/icons'
import { CourseEditModal } from '../course-form'
import { SubjectList } from '../../subject'

interface CourseViewProps {
  data: Course
  refetch: () => void
}

export const CourseView: React.FC<CourseViewProps> = props => {
  const { data, refetch } = props
  const { name, subjects, id } = data

  const [showCourseEditModal, setShowCourseEditModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='px-3 pb-3 flex items-center gap-3 flex-wrap'>
          <Tooltip closeDelay={0} content='Cursos'>
            <Link to={'/courses'}>
              <img src={ArrowLeftIcon} alt='' />
            </Link>
          </Tooltip>
          <span className='text-xl'>{name}</span>
          <Tooltip closeDelay={0} content='Editar'>
            <button onClick={() => setShowCourseEditModal(true)}>
              <img src={EditIcon} className='opacity-40 w-5' alt='Editar curso' />
            </button>
          </Tooltip>
        </div>
        <SubjectList data={subjects} courseId={id} refetch={refetch} />
      </div>
      <CourseEditModal
        isOpen={showCourseEditModal}
        onClose={() => setShowCourseEditModal(false)}
        data={data}
        refetch={refetch}
      />
    </>
  )
}
