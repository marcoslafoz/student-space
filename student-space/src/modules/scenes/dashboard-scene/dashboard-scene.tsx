import React from 'react'
import { UserContext } from '../../../common/context'
import { DashboardView } from '../../components/dashboard'
export const DashboardScene: React.FC = () => {
  const { userId: userID } = React.useContext(UserContext)

  if (!userID) return <></>

  return <DashboardView />
}
