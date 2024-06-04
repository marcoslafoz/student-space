/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
} from '@nextui-org/react'

import { columns, capitalize, DEFAULT_INITIAL_VISIBLE_COLUMNS, statusColorMap } from './score-table-utils'
import {
  ChevronDownIcon,
  DeleteDocumentIcon,
  EditDocumentIcon,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from '../../base/nextui-icons'
import { Score, Subject } from '../../../../common/types'
import moment from 'moment'
import { formatLocalTimezoneToString, scoreStatusCodeToString } from '../../../../common/utils'
import { ItemChip } from '../../base/item'

interface ScoreTableProps {
  data: Score[]
  initialVisibleColumns?: string[]
}

export const ScoreTable: React.FC<ScoreTableProps> = props => {
  const { data, initialVisibleColumns = DEFAULT_INITIAL_VISIBLE_COLUMNS } = props

  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(initialVisibleColumns))
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })

  const [page, setPage] = React.useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredScores = [...data]

    if (hasSearchFilter) {
      filteredScores = filteredScores.filter(score => score.name.toLowerCase().includes(filterValue.toLowerCase()))
    }

    return filteredScores
  }, [data, filterValue])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Score, b: Score) => {
      const first = a[sortDescriptor.column as keyof Score] as number
      const second = b[sortDescriptor.column as keyof Score] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((score: Score, columnKey: React.Key): React.ReactNode => {
    const cellValue = score[columnKey as keyof Score]
    const subject: Subject = score.subject

    switch (columnKey) {
      case 'date':
        return (
          <>
            {cellValue && <span>{moment(formatLocalTimezoneToString(cellValue?.toString())).format('DD/MM/YY')}</span>}
          </>
        )
      case 'status':
        return (
          <>
            {cellValue && (
              <Chip className='capitalize' color={statusColorMap[score.status]} size='sm' variant='flat'>
                {scoreStatusCodeToString(Number(cellValue))}
              </Chip>
            )}
          </>
        )
      case 'subject':
        return (
          <>
            <ItemChip data={subject} />
          </>
        )
      case 'actions':
        return (
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
                  description='Edita el detalle de esta nota'
                  startContent={
                    <span className='text-xl text-default-500 pointer-events-none flex-shrink-0'>
                      <EditDocumentIcon />
                    </span>
                  }
                >
                  Editar nota
                </DropdownItem>
                <DropdownItem
                  key='delete'
                  className='text-danger'
                  color='danger'
                  description='Elimina permanente esta nota'
                  startContent={
                    <span className='text-xl pointer-events-none flex-shrink-0'>
                      <DeleteDocumentIcon />
                    </span>
                  }
                >
                  Eliminar nota
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue?.toString()
    }
  }, [])

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

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

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <div className='flex flex-row gap-3'>
            <Input
              isClearable
              size='sm'
              className='w-full sm:max-w-[60%]'
              placeholder='Buscar por nombre...'
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  size='sm'
                  className='text-foreground-500'
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='flex gap-3'>
            <Button size='sm' color='primary' endContent={<PlusIcon />}>
              Añadir
            </Button>
          </div>
        </div>
      </div>
    )
  }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, data.length, hasSearchFilter])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex items-center justify-between'>
        <div className=' w-1/3'>
          <span className='text-default-400 text-xs '>Notas totales {data.length}</span>
        </div>
        <div className='w-1/3 flex justify-center'>
          <Pagination
            isCompact
            size='sm'
            showControls
            showShadow
            color='default'
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
        <div className='w-1/3 flex justify-end'>
          <label className='flex items-center text-default-400 text-xs'>
            Notas por página:
            <select className='bg-transparent outline-none text-default-400 text-xs' onChange={onRowsPerPageChange}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <Table
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{ wrapper: 'max-h-[382px]' }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No se han encontrado notas'} items={sortedItems}>
        {item => <TableRow key={item.id}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  )
}
