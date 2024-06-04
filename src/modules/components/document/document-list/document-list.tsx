import React from 'react'
import { Document } from '../../../../common/types'
import { DocumentCard } from './document-card'
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

        <div className='flex flex-col gap-6'>
          <div className='grid grid-cols-1 space-y-3 flex-grow'>
            <div className=' max-w-2xl'>
              <div className='gap-2 flex flex-col max-w-xl'>
                {data.map(d => (
                  <DocumentCard data={d} key={d.id} refetchDocuments={refetchDocuments} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocumentModalCreate
        isOpen={showCreateDocumentModal}
        onClose={() => setShowCreateDocumentModal(false)}
        refetchDocuments={refetchDocuments}
      />
    </>
  )
}
