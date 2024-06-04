import React from 'react'
import { Subject } from '../../../../common/types'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../../common/constants/icons'
import { SubjectEditModal, SubjectModalDelete } from '../subject-form'
import { ScoreTable } from '../../score'
import { useScoreGetListBySubjectLazyQuery } from '../../../../common/api/apollo/graphql/score'
import { EditDocumentIcon, VerticalDotsIcon, DeleteDocumentIcon } from '../../base/nextui-icons'

interface SubjectViewProps {
  data: Subject
  refetchSubject: () => void
  courseId: number
}

export const SubjectView: React.FC<SubjectViewProps> = props => {
  const { data, courseId } = props
  const { name } = data

  const [scoreGetListBySubject, { data: scoreData, refetch: refetchScores }] = useScoreGetListBySubjectLazyQuery()

  React.useEffect(() => {
    scoreGetListBySubject({ variables: { subjectId: data.id } })
  }, [scoreGetListBySubject, data.id])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-3 flex-wrap'>
          <Tooltip closeDelay={0} content='Volver'>
            <Link to={`/courses/detail/${courseId}`}>
              <img src={ArrowLeftIcon} alt='' />
            </Link>
          </Tooltip>
          <span className='text-xl'>{name}</span>
          <SubjectDropdownOptions {...props} />
        </div>
        <div className='flex'>
          <div className='w-full max-w-2xl'>
            <ScoreTable
              initialVisibleColumns={['name', 'status', 'actions', 'date', 'score']}
              data={scoreData?.scoreGetListBySubject || []}
              refetchScores={refetchScores}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const SubjectDropdownOptions: React.FC<SubjectViewProps> = props => {
  const { data, refetchSubject, courseId } = props

  const [showSubjectEditModal, setShowSubjectEditModal] = React.useState<boolean>(false)
  const [showSubjectDeleteModal, setShowSubjectDeleteModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='flex'>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-300' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
            <DropdownItem
              key='edit'
              showDivider
              description={<>Edita los detalles de {data.name}</>}
              onPress={() => setShowSubjectEditModal(true)}
              startContent={
                <span className='text-xl text-default-500 pointer-events-none flex-shrink-0'>
                  <EditDocumentIcon />
                </span>
              }
            >
              Editar asignatura
            </DropdownItem>
            <DropdownItem
              onPress={() => setShowSubjectDeleteModal(true)}
              key='delete'
              className='text-danger'
              color='danger'
              description='Elimina permanente esta asignatura'
              startContent={
                <span className='text-xl pointer-events-none flex-shrink-0'>
                  <DeleteDocumentIcon />
                </span>
              }
            >
              Eliminar asignatura
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <SubjectEditModal
        isOpen={showSubjectEditModal}
        onClose={() => setShowSubjectEditModal(false)}
        data={data}
        refetch={refetchSubject}
      />
      <SubjectModalDelete
        courseId={courseId}
        data={data}
        isOpen={showSubjectDeleteModal}
        onClose={() => setShowSubjectDeleteModal(false)}
        refetchSubject={refetchSubject}
      />
    </>
  )
}
