import React from 'react'
import { User } from '../../../../common/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UserSettingForm as UserSettingFormType } from './user-settings.vm'
import { Button, DatePicker, Input } from '@nextui-org/react'
import { MailIcon } from '../../base/nextui-icons'
import { useLazyMutationUserEdit } from '../../../../common/api/apollo/graphql/user'
import { UserContext } from '../../../../common/context'
import { formatDate } from '../../../../common/utils'

interface UserEditFormProps {
  data: User
  refetchUser: () => void
}

export const UserEditForm: React.FC<UserEditFormProps> = props => {
  const { data, refetchUser } = props

  const [userEdit] = useLazyMutationUserEdit()

  const { userId } = React.useContext(UserContext)

  const { handleSubmit, register, setValue } = useForm<UserSettingFormType>({
    defaultValues: {
      ...data,
    },
  })

  const onSuccessUserEdit: SubmitHandler<UserSettingFormType> = values => {
    if (!userId) return
    userEdit({
      variables: {
        user: {
          name: values.name,
          birthday: values.birthday || '',
          surname: values.surname,
          username: '',
          email: '',
          id: userId,
        },
      },
    }).then(() => refetchUser())
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSuccessUserEdit)}>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row gap-3 '>
            <Input {...register('name', { required: true })} isRequired placeholder='Nombre' />
            <Input {...register('surname')} placeholder='Apellido' />
          </div>

          <DatePicker
            size='sm'
            label='Fecha de nacimiento'
            defaultValue={formatDate(data?.birthday)}
            onChange={e => setValue('birthday', e ? e.toString() : '')}
          />
          <Input {...register('username', { required: true })} isDisabled isRequired placeholder='Nombre de usuario' />
          <div className='flex flex-row gap-3 items-center'>
            <Input
              {...register('email', { required: true })}
              isRequired
              type='email'
              className='max-w-82'
              placeholder='Correo electrónico'
              isDisabled
              size='md'
              endContent={<MailIcon className='text-lg text-default-400 pointer-events-none flex-shrink-0' />}
            />

            <Button type='submit' color='primary' variant='flat'>
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
