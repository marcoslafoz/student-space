import React from 'react'
import { User } from '../../../../common/types'
import { UserAvatar } from '../user-avatar'
import { UserPasswordForm, UserEditForm } from '../settings-form'
import { Button } from '@nextui-org/react'
import { destroyJwtToken } from '../../../../common/api/axios'

interface SettingsViewProps {
  data: User
  refetchUser: () => void
}

export const SettingsView: React.FC<SettingsViewProps> = props => {
  const { data, refetchUser } = props

  return (
    <>
      <div className='grid grid-cols-1 '>
        <div className='pb-3 flex items-center gap-2 flex-wrap'>
          <span className='text-xl'>Ajustes</span>
        </div>

        <div className='flex flex-col gap-3 max-w-3xl '>
          <div className='flex flex-row justify-start my-5'>
            <UserAvatar data={data} refetchUser={refetchUser} />
          </div>
          <UserEditForm data={data} refetchUser={refetchUser} />
          <hr className='my-6' />
          <UserPasswordForm />
          <Button className='w-36 mt-12' color='danger' variant='flat' onClick={destroyJwtToken}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </>
  )
}
