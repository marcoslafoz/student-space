import React from 'react'
import { Layout } from '../../layout'
import { UserInfo } from './user-info'
import { UserContext } from '../../../common/context'
import { Checkbox } from '@nextui-org/react'
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
              <UserInfo id={userID} /><DarkMode/>
            </div>
          </div>
        
        </div>
      </div>
    </Layout>
  )
}

function DarkMode() {

  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark)
    console.log('AQUI DARK')
    
    document.body.classList.toggle("dark");
  }

  return (
    <div className="bg-yellow-100 dark:bg-blue-900">
      <button onClick={() => darkModeHandler()}>
      hOLA</button>
    </div>
  );
}

export default DarkMode;