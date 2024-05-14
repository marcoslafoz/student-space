import { AcademicCourse } from '../../../common/types'

interface CourseInfoProps {
  data: AcademicCourse[]
}

export const CourseInfo: React.FC<CourseInfoProps> = props => {
  const { data } = props

  return (
    <div>
      {data.map(ac => (
        <li key={ac.id}>{ac.name}</li>
      ))}
    </div>
  )
}
