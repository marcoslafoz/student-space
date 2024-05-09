import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from '../../../common/context'
import { Test } from './test'


export const DashboardScene: React.FC = () => {

  const { userID } = useContext(UserContext)

  return (
    <>
      <Helmet><title>{'StudentSpace - Dashboard'}</title></Helmet>


      <div className='dashboard-scene-container'>
        <div className='container'>
          <div>
            <Test id={userID} />
          </div>
        </div>
      </div>

    </>
  )
}