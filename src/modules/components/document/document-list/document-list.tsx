import React from 'react'
import { DocumentTable } from '../document-table'
import { Document } from '../../../../common/types'
import { Tooltip } from '@nextui-org/react'
import { PlusIcon } from '../../../../common/constants/icons'
import { DocumentModalCreate } from '../document-form'

interface DocumentListProps {
  data: Document[]
  refetchDocuments: () => void
}

export const DocumentList: React.FC<DocumentListProps> = props => {
  const { data, refetchDocuments } = props

  const [showCreateDocumentModal, setShowCreateDocumentModal] = React.useState(false)

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-2 flex-wrap'>
          <span className='text-xl'>Documentos</span>
          <Tooltip closeDelay={0} content='Añadir documento'>
            <button className='rounded-full' onClick={() => setShowCreateDocumentModal(true)}>
              <img src={PlusIcon} className='w-5' alt='Añadir tarea' />
            </button>
          </Tooltip>
        </div>
        <DocumentTable data={data} refetchDocuments={refetchDocuments} />
      </div>
      <DocumentModalCreate
        isOpen={showCreateDocumentModal}
        onClose={() => setShowCreateDocumentModal(false)}
        onRefetch={refetchDocuments}
      />
    </>
  )
}
