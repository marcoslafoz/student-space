import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../../common/context'
import { useGetDocumentLazyQuery } from '../../../../common/api/graphql/query'
import { Spinner } from '@nextui-org/react'
import { Layout } from '../../../layout'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { htmlTitle } from '../../../../common/utils'
import { DocumentView } from '../../../components/document/document-view'

export const DocumentDetailScene: React.FC = () => {
  const { documentId } = useParams()
  const { userID } = useContext(UserContext)
  const navigate = useNavigate()
  const [getDocuments, { loading, error, data }] = useGetDocumentLazyQuery()

  useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  useEffect(() => {
    if (userID && documentId && !error) {
      getDocuments({ variables: { documentId: Number(documentId), userId: userID } })
    } else {
      navigate('/documents')
    }
  }, [userID, getDocuments, documentId, error, navigate])

  if (loading || !data || !data?.getDocument) {
    return <Spinner />
  }

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
