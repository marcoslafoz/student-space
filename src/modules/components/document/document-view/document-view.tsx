import { Document } from '../../../../common/types'
import { Editor } from './document-editor'
import { ArrowLeftIcon, CloudErrorIcon, CloudSuccessIcon } from '../../../../common/constants/icons'
import React, { useState, useEffect, useRef } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useLazyMutationDocumentEditBody } from '../../../../common/api/apollo/graphql/document'
import { DeleteDocumentIcon, EditDocumentIcon, VerticalDotsIcon } from '../../base/nextui-icons'
import { DocumentModalDelete, DocumentModalRename } from '../document-form'

interface DocumentViewProps {
  data: Document
  refetchDocument: () => void
}

export const DocumentView: React.FC<DocumentViewProps> = props => {
  const { data, refetchDocument } = props

  const [editDocumentBody] = useLazyMutationDocumentEditBody()

  const [successSaved, setSuccessSaved] = React.useState<boolean>(true)

  const [body, setBody] = useState<string>(data.body)
  const prevBodyRef = useRef<string>(body)
  const [hasBodyChanged, setHasBodyChanged] = useState<boolean>(false)

  const getValue = (value: string): void => {
    setBody(value)
  }

  const handleSave = () => {
    editDocumentBody({
      variables: {
        body: body,
        documentId: data.id,
      },
    })
      .then(() => {
        setSuccessSaved(true)
      })
      .catch(() => {
        setSuccessSaved(false)
      })
  }

  useEffect(() => {
    if (prevBodyRef.current !== body) {
      setHasBodyChanged(true)
      prevBodyRef.current = body
    }
  }, [body])

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasBodyChanged) {
        editDocumentBody({
          variables: {
            body: body,
            documentId: data.id,
          },
        })
          .then(() => {
            setSuccessSaved(true)
          })
          .catch(() => {
            setSuccessSaved(false)
          })

        setHasBodyChanged(false)
      }
    }, 5000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBodyChanged])

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-3 flex-wrap'>
          <Tooltip closeDelay={0} content='Documentos'>
            <Link to={'/documents'}>
              <img src={ArrowLeftIcon} alt='' />
            </Link>
          </Tooltip>
          <span className='text-xl'>{data.title}</span>
          <DocumentDropdownOptions data={data} refetchDocument={refetchDocument} />
          <Tooltip closeDelay={0} content='Guardar manualmente'>
            <button onClick={handleSave}>
              <img src={successSaved ? CloudSuccessIcon : CloudErrorIcon} alt='Guardar manualmente' className='w-5' />
            </button>
          </Tooltip>
        </div>
        <Editor data={data} getValue={value => getValue(value)} />
      </div>
    </>
  )
}

const DocumentDropdownOptions: React.FC<DocumentViewProps> = props => {
  const { data, refetchDocument } = props

  const [showRenameDocumentModal, setShowRenameDocumentModal] = React.useState<boolean>(false)
  const [showDeleteDocumentModal, setShowDeleteDocumentModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='flex'>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-300' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
            <DropdownItem
              key='edit'
              showDivider
              description='Renombrar este documento'
              onPress={() => setShowRenameDocumentModal(true)}
              startContent={
                <span className='text-xl text-default-500 pointer-events-none flex-shrink-0'>
                  <EditDocumentIcon />
                </span>
              }
            >
              Renombrar documento
            </DropdownItem>
            <DropdownItem
              onPress={() => setShowDeleteDocumentModal(true)}
              key='delete'
              className='text-danger'
              color='danger'
              description='Elimina permanente este documento'
              startContent={
                <span className='text-xl pointer-events-none flex-shrink-0'>
                  <DeleteDocumentIcon />
                </span>
              }
            >
              Eliminar documento
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <DocumentModalRename
        data={data}
        isOpen={showRenameDocumentModal}
        onClose={() => setShowRenameDocumentModal(false)}
        refetchDocuments={refetchDocument}
      />
      <DocumentModalDelete
        data={data}
        isOpen={showDeleteDocumentModal}
        onClose={() => setShowDeleteDocumentModal(false)}
        refetchDocuments={refetchDocument}
      />
    </>
  )
}
