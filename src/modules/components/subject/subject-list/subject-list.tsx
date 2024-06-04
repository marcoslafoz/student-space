import React from 'react'
import { Subject } from '../../../../common/types'
import { ItemCard } from '../../base/item'
import { Tooltip } from '@nextui-org/react'
import { PlusIcon } from '../../../../common/constants/icons'
import { Link } from 'react-router-dom'
import { SubjectAddModal } from '../subject-form'

interface SubjectListProps {
  data?: Subject[]
  courseId: number
  refetch: () => void
}

export const SubjectList: React.FC<SubjectListProps> = props => {
  const { data = [], courseId, refetch } = props
  const [showSubjectAddModal, setShowSubjectAddModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='py-2 flex items-center gap-2 flex-wrap'>
        <span>Asignaturas</span>
        <Tooltip closeDelay={0} content='Añadir asignatura'>
          <button onClick={() => setShowSubjectAddModal(true)}>
            <img src={PlusIcon} className='w-5' alt='Añadir asignatura' />
          </button>
        </Tooltip>
      </div>
      <div className='flex flex-row flex-wrap gap-2'>
        {data?.map(s => (
          <>
            <div>
              <Link to={`/courses/detail/${courseId}/subject/${s.id}`} key={s.id}>
                <ItemCard data={s} />
              </Link>
            </div>
          </>
        ))}
      </div>
      <SubjectAddModal
        isOpen={showSubjectAddModal}
        onClose={() => setShowSubjectAddModal(false)}
        courseId={courseId}
        refetch={refetch}
      />
    </>
  )
}
