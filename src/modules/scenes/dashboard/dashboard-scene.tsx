import React from 'react'
import { Layout } from '../../layout'
import { UserInfo } from './user-info'
import { UserContext } from '../../../common/context'
import { Checkbox, Input } from '@nextui-org/react'
export const DashboardScene: React.FC = () => {
  const { userID } = React.useContext(UserContext)

  if (!userID) return <></>

  return (
    <Layout>

      <div className="container-fluid" >
        <div className="row">
          <div className="col col-auto">
            <div className='rounded-4 p-4 border '>
              <Checkbox />
              <Input/>
              <UserInfo id={userID} />
            </div>
          </div>
        
        </div>
      </div>
    </Layout>
  )
}

