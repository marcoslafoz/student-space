import React from 'react'
import { Document } from '../../../../common/types'
import { DocumentCard } from './document-card'
import {
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { PlusIcon } from '../../../../common/constants/icons'
import { DocumentModalCreate } from '../document-form'
import { SearchIcon } from '../../base/nextui-icons'

interface DocumentTableProps {
  data: Document[]
  refetchDocuments: () => void
  defaultRowsPerPage?: number
}

export const DocumentTable: React.FC<DocumentTableProps> = props => {
  const { data, refetchDocuments, defaultRowsPerPage = 10 } = props

  const [showCreateDocumentModal, setShowCreateDocumentModal] = React.useState(false)
  const [filterValue, setFilterValue] = React.useState('')
  const [page, setPage] = React.useState(1)

  const pages = Math.ceil(data.length / defaultRowsPerPage)
  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = React.useMemo(() => {
    let filteredScores = [...data]

    if (hasSearchFilter) {
      filteredScores = filteredScores.filter(score => score.title.toLowerCase().includes(filterValue.toLowerCase()))
    }

    return filteredScores
  }, [data, filterValue, hasSearchFilter])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const items = React.useMemo(() => {
    const start = (page - 1) * defaultRowsPerPage
    const end = start + defaultRowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, defaultRowsPerPage])

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex'>
          <div className='flex flex-row'>
            <Input
              isClearable
              size='sm'
              className='w-full '
              placeholder='Buscar por nombre...'
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
      </>
    )
  }, [filterValue, onSearchChange, onClear])

  const bottomContent = (
    <div className='flex w-full justify-center'>
      <Pagination
        isCompact
        size='sm'
        showControls
        showShadow
        color='default'
        page={page}
        total={pages}
        onChange={page => setPage(page)}
      />
    </div>
  )

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

        <Table
          aria-label='Example table with client side pagination'
          className={'max-w-xl'}
          classNames={{ td: 'py-1 px-0' }}
          hideHeader
          removeWrapper
          topContent={topContent}
          bottomContent={items.length > defaultRowsPerPage && bottomContent}
        >
          <TableHeader>
            <TableColumn key='title'>Nombre</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {item => (
              <TableRow key={item.id}>
                {
                  <TableCell>
                    <DocumentCard data={item} key={item.id} refetchDocuments={refetchDocuments} />
                  </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DocumentModalCreate
        isOpen={showCreateDocumentModal}
        onClose={() => setShowCreateDocumentModal(false)}
        onRefetch={refetchDocuments}
      />
    </>
  )
}
