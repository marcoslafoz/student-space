import React from 'react'
import { Document } from '../../../../common/types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon } from '../../base/nextui-icons'
import { DocumentIcon } from '../../../../common/constants/icons'
import { DocumentModalDelete, DocumentModalRename } from '../document-form'

interface DocumentCardProps {
  data: Document
  refetchDocuments: () => void
}

export const DocumentCard: React.FC<DocumentCardProps> = props => {
  const { data, refetchDocuments } = props

  const { id, title } = data

  const [showRenameDocumentModal, setShowRenameDocumentModal] = React.useState<boolean>(false)
  const [showDeleteDocumentModal, setShowDeleteDocumentModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='group grid grid-cols-1 border rounded-lg p-4 gap-y-1 cursor-pointer '>
        <div className='flex items-center justify-between'>
          <Link to={`/documents/detail/${id}`}>
            <div className='flex items-center justify-start gap-3 flex-wrap'>
              <img src={DocumentIcon} alt='' />
              <span className={clsx('hover:text-gray-400 cursor-pointer')}>{title}</span>
            </div>
          </Link>
          <div className='flex flex-row flex-wrap gap-3 '>
            <button className='hidden group-hover:block' onClick={() => setShowRenameDocumentModal(true)}>
              <Tooltip content='Renombrar documento' closeDelay={0}>
                <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                  <EditIcon />
                </span>
              </Tooltip>
            </button>
            <button className='hidden group-hover:block' onClick={() => setShowDeleteDocumentModal(true)}>
              <Tooltip content='Eliminar documento' color='danger' closeDelay={0}>
                <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                  <DeleteIcon />
                </span>
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
      <DocumentModalRename
        data={data}
        isOpen={showRenameDocumentModal}
        onClose={() => setShowRenameDocumentModal(false)}
        onRefetch={refetchDocuments}
      />
      <DocumentModalDelete
        data={data}
        isOpen={showDeleteDocumentModal}
        onClose={() => setShowDeleteDocumentModal(false)}
        onRefetch={refetchDocuments}
      />
    </>
  )
}
