import React, { useContext, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../../common/context'
import { useGetDocumentQuery } from '../../../../common/api/graphql/query'
import { Spinner } from '@nextui-org/react'
import { Layout } from '../../../layout'
import { Helmet } from 'react-helmet'
import { htmlTitle } from '../../../../common/utils'
import { DocumentView } from '../../../components/document/document-view'

export const DocumentDetailScene: React.FC = () => {
  const { documentId } = useParams()
  const { userID } = useContext(UserContext)
  
  const {data, error, loading} = useGetDocumentQuery({
    variables: {
      documentId: Number(documentId),
      userId: userID || 0
    }
  })

  useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if(error) return <Navigate to={'/documents'}/>
  
  if (loading || !data || !data?.getDocument) return <Spinner />

  return (
    <>
      <Helmet>
        <title>{htmlTitle(data.getDocument.title)}</title>
      </Helmet>
      <Layout>
        <DocumentView data={data.getDocument} />
      </Layout>
    </>
  )
}
