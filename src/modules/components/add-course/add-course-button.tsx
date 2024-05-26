import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import React, { useContext } from 'react'
import { PlusIcon } from '../../../common/constants/icons'
import { Task, Document, AcademicCourse, Subject } from '../../../common/types'
import { ChipItem } from '../chip'
import { UserContext } from '../../../common/context'
import { useGetAcademicCourseListQuery, useGetSubjectListByUserQuery } from '../../../common/api/graphql/query'
import { useLazyMutationRemoveTaskAcademicCourse, useLazyMutationRemoveTaskSubject } from '../../../common/api/graphql/mutation'

interface AddCourseButtonProps {
  data: Task | Document
  refetch: () => void
}

type objectType = 'task' | 'document'

export const AddCourseButton: React.FC<AddCourseButtonProps> = props => {

  const { data, refetch } = props
  const { userID } = useContext(UserContext)

  const objectType: objectType = ((data as Task).checked !== undefined) ? 'task' : 'document'

  const { data: courseListData } = useGetAcademicCourseListQuery({ variables: { userId: userID || 0 } })
  const { data: subjectListData } = useGetSubjectListByUserQuery({ variables: { userId: userID || 0 } })

  const [removeTaskSubject] = useLazyMutationRemoveTaskSubject()
  const [removeTaskAcademicCourse] = useLazyMutationRemoveTaskAcademicCourse()

  const courses: AcademicCourse[] = courseListData?.getAcademicCourseListByUserId || []
  const subjects: Subject[] = subjectListData?.getSubjectListByUserId.filter(x => x.academicCourse?.id == data.academicCourse?.id) || []


  const handleAddCourse = (courseId: number) => {

    if (objectType == 'document') {
      console.log('DOC', courseId)
    }

    if (objectType == 'task') {
      console.log('TASK', courseId)
    }

  }

  const handleAddSubject = (courseId: number) => {
    if (objectType == 'document') {
      console.log('DOC', courseId)
    }

    if (objectType == 'task') {
      console.log('TASK', courseId)
    }
  }

  const handleRemoveCourse = (courseId: number) => {

    if (objectType == 'document') {
      console.log('REMOVE DOC', courseId)
    }

    if (objectType == 'task') removeTaskAcademicCourse({ variables: { taskId: data?.id || 0, academicCourseId: data?.academicCourse?.id || 0 }, }).then(() => refetch()) 
  }

  const handleRemoveSubject = (courseId: number) => {
    if (objectType == 'document') {
      console.log('REMOVE DOC', courseId)
    }

    if (objectType == 'task') removeTaskSubject({ variables: { taskId: data?.id || 0, subjectId: data?.subject?.id || 0 } }).then(() => refetch()) 
  }




  if (courses.length < 1) return <></>

  return (
    <>

      {
        !data.academicCourse &&
        (<Dropdown>
          <DropdownTrigger>
            <button>
              <Tooltip content="Añadir a curso">
                <div className='bg-gray-200 p-1.5 rounded-full' >
                  <img className='p-0 m-0' src={PlusIcon} alt='' />
                </div>
              </Tooltip>
            </button>
          </DropdownTrigger>
          <DropdownMenu>
            {courses.map((x) => (
              <DropdownItem onClick={() => handleAddCourse(x.id)} key={x.id}>{x.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>)
      }

      {data.academicCourse && <ChipItem onClose={() => handleRemoveCourse(data.academicCourse?.id || 0)} data={data.academicCourse} />}

      {
        (data.academicCourse && !data.subject && subjects.length > 0) &&
        (<Dropdown>
          <DropdownTrigger>
            <button>
              <Tooltip content="Añadir a asignatura">
                <div className='bg-gray-200 p-1.5 rounded-full' >
                  <img className='p-0 m-0' src={PlusIcon} alt='' />
                </div>
              </Tooltip>
            </button>
          </DropdownTrigger>
          <DropdownMenu>
            {subjects.map((x) => (
              <DropdownItem onClick={() => handleAddSubject(x.id)} key={x.id}>{x.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>)
      }

      {data.academicCourse && data.subject && <ChipItem onClose={() => handleRemoveSubject(data.subject?.id || 0)} data={data.subject} />}

    </>
  )
}