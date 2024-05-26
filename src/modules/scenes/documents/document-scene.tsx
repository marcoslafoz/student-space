import React, { useContext } from 'react'
import { useGetDocumentsByUserLazyQuery } from '../../../common/api/graphql/query'
import { UserContext } from '../../../common/context'
import { Layout } from '../../layout'
import { Spinner } from '@nextui-org/react'
import { Link } from 'react-router-dom'

export const DocumentsScene: React.FC = () => {
  const { userID } = useContext(UserContext)

  const [getDocuments, { loading, error, data }] = useGetDocumentsByUserLazyQuery()

  React.useEffect(() => {
    if (userID) {
      getDocuments({ variables: { userId: userID } })
    }
  }, [userID, getDocuments])

  if (!data || loading || error) return <Spinner />

  return (
    <Layout>
      {data.getDocumentListByUserId.map(x => (
        <li key={x.id}>
          <Link to={`/documents/detail/${x.id}`}>{x.title}</Link>
        </li>
      ))}
    </Layout>
  )
}
