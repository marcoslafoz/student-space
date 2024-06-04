import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../common/context'
import { Helmet } from 'react-helmet'
import { htmlTitle } from '../../../common/utils'
import { DocumentView } from '../../components/document/document-view'
import { useDocumentReadLazyQuery } from '../../../common/api/apollo/graphql/document/query'

export const DocumentDetailScene: React.FC = () => {
  const { documentId } = useParams()
  const { userId } = React.useContext(UserContext)

  const [getDocuments, { loading, error, data, refetch }] = useDocumentReadLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getDocuments({ variables: { documentId: Number(documentId), userId: userId } })
    }
  }, [userId, getDocuments, documentId])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (error) return <Navigate to={'/documents'} />

  if (loading || !data || !data?.documentRead) return <></>

  return (
    <>
      <Helmet>
        <title>{htmlTitle(data.documentRead.title)}</title>
      </Helmet>
      <DocumentView data={data.documentRead} refetchDocument={refetch} />
    </>
  )
}
