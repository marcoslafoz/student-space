import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { CourseContext } from '../../../../common/context'
import { Subject } from '../../../../common/types'

interface CourseSelectorProps {
  defaultSubjectId?: number
  defaultCourseId?: number
  onCourseChange: (courseId: number) => void
  onSubjectChange: (subjectId: number) => void
}

export const CourseSelector: React.FC<CourseSelectorProps> = props => {
  const { defaultCourseId = 0, defaultSubjectId = 0, onCourseChange, onSubjectChange } = props

  const { courseList, loading } = React.useContext(CourseContext)

  const [courseState, setCourseState] = React.useState<number | undefined>(defaultCourseId)

  const subjectArray: Subject[] | undefined = React.useMemo(() => {
    const course = courseList.find(c => c.id == courseState)
    return course ? course.subjects : []
  }, [courseList, courseState])

  if (loading) return <></>

  return (
    <div className='grid grid-cols-2 gap-3'>
      <Select
        label='Curso'
        size='sm'
        onChange={e => {
          const newCourseId = Number(e.target.value)
          setCourseState(newCourseId)
          onCourseChange(newCourseId)
        }}
        defaultSelectedKeys={[defaultCourseId]}
      >
        {courseList.map(a => (
          <SelectItem key={a.id} value={a.id}>
            {a.name}
          </SelectItem>
        ))}
      </Select>

      <Select
        label='Asignatura'
        size='sm'
        onChange={e => {
          const newSubjectId = Number(e.target.value)
          onSubjectChange(newSubjectId)
        }}
        defaultSelectedKeys={[defaultSubjectId]}
      >
        {(subjectArray || []).map(s => (
          <SelectItem key={s.id} value={s.id}>
            {s.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
