import React, { useContext } from 'react'
import { Test } from './test'
import { Helmet } from 'react-helmet'
import { UserContext } from '../../../common/context'
import { destroyToken } from '../../../common/api/endpoints/login'


export const DashboardScene: React.FC = () => {

  const { userID } = useContext(UserContext)
  
  return (
    <>
      <Helmet><title>{'StudentSpace - Dashboard'}</title></Helmet>

      <div>Dashboard</div>
      <Test id={userID}/>
      <button onClick={destroyToken}>Destroy token</button>

    </>
  )
}