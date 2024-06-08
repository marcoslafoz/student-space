import React from 'react'
import { UserInfo } from './user-info'
import { UserContext } from '../../../common/context'
export const DashboardScene: React.FC = () => {
  const { userId: userID } = React.useContext(UserContext)

  if (!userID) return <></>

  return <UserInfo id={userID} />
}
