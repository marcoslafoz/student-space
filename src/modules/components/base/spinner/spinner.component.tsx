import React from 'react'
import './spinner.scss'
import { StudentSpaceIcon } from '../../../../common/constants/icons'
import clsx from 'clsx'

interface SpinnerProps {
  isCentered?: boolean
}

export const Spinner: React.FC<SpinnerProps> = props => {
  const { isCentered } = props

  return (
    <>
      <div className={clsx(isCentered && 'full-screen position-relative')}>
        <img className={clsx('ss-loader', isCentered && 'centered-element')} src={StudentSpaceIcon} alt='Loading' />
      </div>
    </>
  )
}
