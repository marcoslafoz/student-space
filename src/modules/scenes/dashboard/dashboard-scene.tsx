import React from 'react'
import { Layout } from '../../layout'
import { UserInfo } from './user-info'
import { UserContext } from '../../../common/context'
export const DashboardScene: React.FC = () => {
  const { userID } = React.useContext(UserContext)

  if (!userID) return <></>

  return (
    <Layout>
      <UserInfo id={userID} />
    </Layout>
  )
}
