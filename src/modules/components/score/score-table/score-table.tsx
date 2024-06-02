import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '../../base/nextui-icons'
import { Score } from '../../../../common/types'
import { formatLocalTimezoneToString } from '../../../../common/utils'
import moment from 'moment'

const columns = [
  { name: 'Nombre', uid: 'name' },
  { name: 'Nota', uid: 'score' },
  { name: 'Fecha', uid: 'date' },
  { name: 'Acciones', uid: 'actions' },
]

interface ScoreTableProps {
  data: Score[]
}

export const ScoreTable: React.FC<ScoreTableProps> = props => {
  const { data } = props

  const renderCell = React.useCallback((value: Score, columnKey: React.Key) => {
    const cellValue = value[columnKey as keyof Score]

    switch (columnKey) {
      case 'name':
        return <span>{value.name}</span>
      case 'score':
        return <span>{value.score}</span>
      case 'date':
        return <>{value.date && <span>{moment(formatLocalTimezoneToString(value.date)).format('DD/MM/YY')}</span>}</>

      case 'actions':
        return (
          <div className='relative flex items-center flex-row gap-3'>
            <Tooltip content='Details'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content='Edit user'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label='Example table with custom cells'>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {item => <TableRow key={item.id}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  )
}
