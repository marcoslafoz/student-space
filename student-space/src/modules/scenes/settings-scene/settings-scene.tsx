import React from 'react'
import { UserContext } from '../../../common/context'
import { Helmet } from 'react-helmet'
import { SettingsView } from '../../components/settings'
import { useUserReadLazyQuery } from '../../../common/api/apollo/graphql/user'

export const SettingsScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  const [userRead, { data, refetch }] = useUserReadLazyQuery()

  React.useEffect(() => {
    if (userId) {
      userRead({ variables: { userId: userId } })
    }
  }, [userId, userRead])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (!userId || !data) return <></>

  return (
    <>
      <Helmet title='Ajustes - StudentSpace' />
      <SettingsView data={data.userRead} refetchUser={refetch} />
    </>
  )
}
