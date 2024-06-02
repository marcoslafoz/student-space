import React, { useContext, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../common/context'
import { Spinner } from '@nextui-org/react'
import { Layout } from '../../components/layout'
import { Helmet } from 'react-helmet'
import { htmlTitle } from '../../../common/utils'
import { DocumentView } from '../../components/document/document-view'
import { useDocumentReadQuery } from '../../../common/api/apollo/graphql/document/query'

export const DocumentDetailScene: React.FC = () => {
  const { documentId } = useParams()
  const { userId: userID } = useContext(UserContext)

  const { data, error, loading } = useDocumentReadQuery({
    variables: {
      documentId: Number(documentId),
      userId: userID || 0,
    },
  })

  useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (error) return <Navigate to={'/documents'} />

  if (loading || !data || !data?.documentRead) return <Spinner />

  return (
    <>
      <Helmet>
        <title>{htmlTitle(data.documentRead.title)}</title>
      </Helmet>
      <Layout>
        <DocumentView data={data.documentRead} />
      </Layout>
    </>
  )
}
