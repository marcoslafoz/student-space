import { Card, CardHeader, Image } from '@nextui-org/react'
import { AcademicCourse } from '../../../common/types'

interface CourseInfoProps {
  data: AcademicCourse[]
}

export const CourseInfo: React.FC<CourseInfoProps> = props => {
  const { data } = props

  return (
    <>
      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        {data.map(ac => (
          <Card key={ac.id} className="col-span-12 sm:col-span-4 h-[200px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">{ac.name + ' - ' + ac.id}</p>
              <h4 className="text-white font-medium text-large">{ac.name}</h4>
            </CardHeader>
            <Image
              isZoomed
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-2.jpeg"
            />
          </Card>
        ))}
      </div>
    </>
  )
}
