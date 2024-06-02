import React from 'react'
import { Subject } from '../../../../common/types'
import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EditIcon } from '../../../../common/constants/icons'
import { SubjectEditModal } from '../subject-form'

interface SubjectViewProps {
  data: Subject
  refetch: () => void
  courseId: number
}

export const SubjectView: React.FC<SubjectViewProps> = props => {
  const { data, courseId, refetch } = props
  const { name } = data

  const [showSubjectEditModal, setShowSubjectEditModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='px-3 pb-3 flex items-center gap-3 flex-wrap'>
          <Tooltip closeDelay={0} content='Volver'>
            <Link to={`/courses/detail/${courseId}`}>
              <img src={ArrowLeftIcon} alt='' />
            </Link>
          </Tooltip>
          <span className='text-xl'>{name}</span>
          <Tooltip closeDelay={0} content='Editar'>
            <button onClick={() => setShowSubjectEditModal(true)}>
              <img src={EditIcon} className='opacity-40 w-5' alt='Editar curso' />
            </button>
          </Tooltip>
        </div>
      </div>
      <SubjectEditModal
        isOpen={showSubjectEditModal}
        onClose={() => setShowSubjectEditModal(false)}
        data={data}
        refetch={refetch}
        courseId={courseId}
      />
    </>
  )
}
