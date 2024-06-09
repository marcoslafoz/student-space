import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { useDocumentGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/document/query'
import { DocumentList } from '../../components/document'
import { Helmet } from 'react-helmet'

export const DocumentsScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getDocuments, { loading, error, data, refetch }] = useDocumentGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getDocuments({ variables: { userId: userId } })
    }
  }, [userId, getDocuments])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (!data || loading || error) return <></>

  return (
    <>
      <Helmet title='Documentos - StudentSpace' />
      <DocumentList data={data.documentGetListByUser} refetchDocuments={refetch} />
    </>
  )
}
