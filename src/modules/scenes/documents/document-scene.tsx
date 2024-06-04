import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { useDocumentGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/document/query'
import { DocumentList } from '../../components/document'

export const DocumentsScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getDocuments, { loading, error, data, refetch }] = useDocumentGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getDocuments({ variables: { userId: userId } })
    }
  }, [userId, getDocuments])

  if (!data || loading || error) return <></>

  return <DocumentList data={data.documentGetListByUser} refetchDocuments={refetch} />
}
