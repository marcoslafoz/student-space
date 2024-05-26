import { Document } from '../../../common/types'
import { Editor } from './document-editor'
import { ArrowLeftIcon, CloudErrorIcon, CloudSuccessIcon } from '../../../common/constants/icons'
import React, { useState, useEffect, useRef } from 'react'
import { useLazyMutationEditDocumentBody } from '../../../common/api/graphql/mutation'
import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { AddCourseButton } from '../add-course'

interface DocumentViewProps {
  data: Document
}

export const DocumentView: React.FC<DocumentViewProps> = props => {
  const { data } = props

  const [editDocumentBody] = useLazyMutationEditDocumentBody()

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
    }).then(() => {
      setSuccessSaved(true)
    }).catch(() => {
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
        }).then(() => {
          setSuccessSaved(true)
        }).catch(() => {
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
        <div className='px-3 pb-3 flex items-center gap-3 flex-wrap'>
          <Tooltip content="Documentos">
            <Link to={'/documents'}>
              <img src={ArrowLeftIcon} alt='' />
            </Link>
          </Tooltip>
          <span className='text-xl'>{data.title}</span>
          <Tooltip content="Guardar">
            <button onClick={handleSave}>
              <img src={successSaved ? CloudSuccessIcon : CloudErrorIcon} alt='' />
            </button>
          </Tooltip>

          <AddCourseButton data={data} refetch={() => {}} />
        </div>
        <Editor data={data} getValue={value => getValue(value)} />
      </div>
    </>
  )
}
