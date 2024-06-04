import { Tooltip } from '@nextui-org/react'
import React from 'react'
import { PlusIcon } from '../../../../common/constants/icons'
import { ScoreTable } from '../score-table'
import { Score } from '../../../../common/types'

interface ScoreViewProps {
  data: Score[]
}

export const ScoreView: React.FC<ScoreViewProps> = props => {
  const { data } = props
  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-2 flex-wrap'>
          <span className='text-xl'>Notas</span>
          <Tooltip closeDelay={0} content='Añadir nota'>
            <button className='rounded-full' onClick={() => {}}>
              <img src={PlusIcon} className='w-5' alt='Añadir tarea' />
            </button>
          </Tooltip>
        </div>
        <ScoreTable data={data} initialVisibleColumns={['name', 'status', 'actions', 'date', 'score', 'subject']} />
      </div>
    </>
  )
}
