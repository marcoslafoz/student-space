import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UserSettingForm as UserSettingFormType } from './user-settings.vm'
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons'
import { useLazyMutationUserChangePassword } from '../../../../common/api/apollo/graphql/user/mutation/user-change-password'
import { UserContext } from '../../../../common/context'

export const UserPasswordForm: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  const [isVisible, setIsVisible] = React.useState(false)

  const [password, setPassword] = React.useState<string | undefined>()
  const [repeatPassword, setRepeatPassword] = React.useState<string | undefined>()
  const [passwordStatus, setPasswordStatus] = React.useState<React.ReactNode | undefined>()

  const { handleSubmit, register, reset } = useForm<UserSettingFormType>()

  const [userChangePassword] = useLazyMutationUserChangePassword()

  const onSuccessUserEdit: SubmitHandler<UserSettingFormType> = values => {
    if (values.password !== values.repeatPassword) {
      setPasswordStatus(<div className='text-red-500'>Las contraseñas no coinciden</div>)
    }
    if (!userId) return

    if (values.password === values.repeatPassword) {
      userChangePassword({
        variables: {
          password: values.password,
          userId: userId,
        },
      }).then(() => {
        reset()
        setPasswordStatus(<div className='text-green-500'>Las contraseña se ha cambiado correctamente</div>)
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSuccessUserEdit)}>
        <div className='flex flex-col gap-5'>
          {passwordStatus && passwordStatus}
          <div className='flex flex-row gap-3'>
            <Input
              placeholder='Contraseña'
              {...register('password', { required: true })}
              onValueChange={e => setPassword(e)}
              endContent={
                <button className='focus:outline-none' type='button' onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
            />
            <Input
              placeholder='Confirma la contraseña'
              {...register('repeatPassword', { required: true })}
              onValueChange={e => setRepeatPassword(e)}
              endContent={
                <button className='focus:outline-none' type='button' onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
            />
            <Button
              isDisabled={
                password?.trim() === undefined ||
                password?.trim() === '' ||
                repeatPassword?.trim() === undefined ||
                repeatPassword?.trim() === ''
              }
              type='submit'
              className='w-96'
              color='primary'
              variant='flat'
              style={{ width: '500px' }}
            >
              Cambiar contraseña
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
