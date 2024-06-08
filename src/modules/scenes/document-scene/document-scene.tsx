import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { useDocumentGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/document/query'
import { DocumentTable } from '../../components/document'

export const DocumentsScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getDocuments, { loading, error, data, refetch }] = useDocumentGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getDocuments({ variables: { userId: userId } })
    }
  }, [userId, getDocuments])

  if (!data || loading || error) return <></>

  return <DocumentTable data={data.documentGetListByUser} refetchDocuments={refetch} />
}
