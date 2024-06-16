import { Button, Card, CardFooter, Image } from '@nextui-org/react'
import { useUserReadQuery } from '../../../../common/api/apollo/graphql/user'
import { User } from '../../../../common/types'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../common/context'
import { useContext } from 'react'
import { BlackBoardImage, CoursesImage, DocumentsImage } from '../../../../common/constants/images'
import { PendingTasksWidget, UpcomingEventsWidget } from '../dashboard-widget'

export const DashboardView: React.FC = () => {
  const { userId } = useContext(UserContext)

  const { data, loading, error } = useUserReadQuery({ variables: { userId: userId || 0 } })

  const userData: User | undefined = data?.userRead

  const navigate = useNavigate()

  if (!data || loading || error) return <></>

  return (
    <div className='flex flex-col gap-5'>
      <div className='text-2xl'>
        Bienvenido de nuevo <span className='text-bold '>{userData?.name}</span>
      </div>

      <div className='max-w-[900px] gap-3 grid grid-cols-12 grid-rows-2 auto-rows-auto'>
        {/* Academic courses */}
        <Card isFooterBlurred className='w-full h-[275px] col-span-12 sm:col-span-5'>
          <Image removeWrapper alt='Card background' className='z-0 w-full h-full object-cover' src={CoursesImage} />
          <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
            <div className='flex flex-grow gap-2 items-center'>
              <div className='flex flex-col'>
                <p className='text-tiny text-white/80'>Cursos académicos</p>
              </div>
            </div>
            <Button radius='full' size='sm' onClick={() => navigate('/courses')}>
              Abrir
            </Button>
          </CardFooter>
        </Card>

        {/* Events */}
        <Card isFooterBlurred className='w-full h-[275px] col-span-12 sm:col-span-7'>
          <div className='p-4 overflow-y-scroll no-scrollbar'>
            <UpcomingEventsWidget />
          </div>
          <CardFooter className='absolute bg-black/10 bottom-0 z-10 border-t-1 border-default-300 dark:border-default-100'>
            <div className='flex flex-grow gap-2 items-center'>
              <div className='flex flex-col'>
                <p className='text-tiny text-black/90'>Eventos</p>
                <p className='text-tiny text-black/60'>Consulta tus proximos eventos.</p>
              </div>
            </div>
            <Button radius='full' color='primary' size='sm' onClick={() => navigate('/events')}>
              Abrir
            </Button>
          </CardFooter>
        </Card>

        {/* Scores */}
        <Card className='col-span-12 sm:col-span-4 h-[275px]'>
          <Image removeWrapper alt='Card background' className='z-0 w-full h-full object-cover' src={BlackBoardImage} />
          <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
            <div className='flex flex-grow gap-2 items-center'>
              <div className='flex flex-col'>
                <p className='text-tiny text-white/80'>Notas</p>
                <p className='text-tiny text-white/60'>Consulta tu historial de notas.</p>
              </div>
            </div>
            <Button radius='full' size='sm' onClick={() => navigate('/scores')}>
              Abrir
            </Button>
          </CardFooter>
        </Card>

        {/* Tasks */}
        <Card isFooterBlurred className='w-full h-[275px] col-span-12 sm:col-span-4'>
          <div className='p-4 overflow-y-scroll no-scrollbar'>
            <PendingTasksWidget />
          </div>
          <CardFooter className='absolute bg-black/10 bottom-0 z-10 border-t-1 border-default-300 dark:border-default-100'>
            <div className='flex flex-grow gap-2 items-center'>
              <div className='flex flex-col'>
                <p className='text-tiny text-black/90'>Tareas pendientes</p>
              </div>
            </div>
            <Button radius='full' color='primary' size='sm' onClick={() => navigate('/tasks')}>
              Abrir
            </Button>
          </CardFooter>
        </Card>

        {/* Documents */}
        <Card className='col-span-12 sm:col-span-4 h-[275px]'>
          <Image removeWrapper alt='Card background' className='z-0 w-full h-full object-cover' src={DocumentsImage} />
          <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
            <div className='flex flex-grow gap-2 items-center'>
              <div className='flex flex-col'>
                <p className='text-tiny text-white/80'>Documentos</p>
                <p className='text-tiny text-white/60'>Crea documentos de texto.</p>
              </div>
            </div>
            <Button radius='full' size='sm' onClick={() => navigate('/documents')}>
              Abrir
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
