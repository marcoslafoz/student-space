import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from '../../../common/context'
import { UserInfo } from './user-info'
import { destroyToken } from '../../../common/api/endpoints/login'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router'

export const DashboardScene: React.FC = () => {
  const { userID } = useContext(UserContext)

  const navigate = useNavigate()

  if (userID)
    return (
      <>
        <Helmet>
          <title>{'StudentSpace - Dashboard'}</title>
        </Helmet>

        <div className='dashboard-scene-container'>
          <div className='container'>
            <div>
              <UserInfo id={userID} />
              <Button onClick={() => destroyToken()}>Cerrar sesión</Button>
              <Button onClick={() => navigate('/courses')} >Cursos académicos</Button>
            </div>
          </div>
        </div>
      </>
    )

  return <></>
}
