import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, DatePicker, Input } from '@nextui-org/react'
// import { useLoginFindUsernameLazyQuery } from '../../../../common/api/apollo/graphql/login'
import { RegisterForm as RegisterFormType, RegisterStepsEnum } from './register-form.vm'
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from '../../base/nextui-icons'
import clsx from 'clsx'
import { isAuthenticated } from '../../../../common/api/axios'
import { useLazyMutationUserCreate } from '../../../../common/api/apollo/graphql/user'

export const RegisterForm: React.FC = () => {
  const { handleSubmit, register, setValue } = useForm<RegisterFormType>()

  const [step, setStep] = React.useState<number>(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>()
  const [name, setName] = React.useState<string | undefined>()
  const [email, setEmail] = React.useState<string | undefined>()
  const [username, setUsername] = React.useState<string | undefined>()
  const [password, setPassword] = React.useState<string | undefined>()
  const [repeatPassword, setRepeatPassword] = React.useState<string | undefined>()

  const [userCreate] = useLazyMutationUserCreate()

  const handleSetStep = (amount: number) => {
    const newStep = step + amount
    if (newStep >= RegisterStepsEnum.NAME && newStep <= RegisterStepsEnum.PASSWORD) {
      setStep(newStep)
    }
  }

  const onRegisterSuccess: SubmitHandler<RegisterFormType> = async values => {
    if (values.password != values.repeatPassword) {
      setErrorMessage('Las contraseñas no coinciden')
      return
    }

    const result = await userCreate({
      variables: {
        user: {
          email: values.email,
          name: values.name,
          username: values.username,
          password: values.password,
          birthday: values.birthday,
        },
      },
    })

    if (result.data && result.data.userCreate) {
      localStorage.setItem('jwttoken', result.data.userCreate)
      const authenticated = await isAuthenticated()
      if (authenticated) window.location.reload()
      setErrorMessage(undefined)
    } else {
      setErrorMessage('El nombre de usuario o email ya está en uso')
    }
  }

  return (
    <>
      {step !== RegisterStepsEnum.NAME && (
        <div
          className=' fixed z-10'
          style={!errorMessage ? { margin: '145px 0px 0px -35px' } : { margin: '176px 0px 0px -35px' }}
        >
          <div>
            <span className='mt-2'>
              <button onClick={() => handleSetStep(-1)}>
                <span>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M8.76945 8.98006L9.09945 8.65006C9.38945 8.36006 9.38945 7.88006 9.09945 7.59006C8.80945 7.30006 8.32945 7.30006 8.03945 7.59006L6.46945 9.16006C6.17945 9.45006 6.17945 9.93006 6.46945 10.2201L8.03945 11.7901C8.18945 11.9401 8.37945 12.0101 8.56945 12.0101C8.75945 12.0101 8.94945 11.9401 9.09945 11.7901C9.38945 11.5001 9.38945 11.0201 9.09945 10.7301L8.83945 10.4701H13.9195C15.1995 10.4701 16.2495 11.5101 16.2495 12.8001C16.2495 14.0901 15.2095 15.1301 13.9195 15.1301H8.99945C8.58945 15.1301 8.24945 15.4701 8.24945 15.8801C8.24945 16.2901 8.58945 16.6301 8.99945 16.6301H13.9195C16.0295 16.6301 17.7495 14.9101 17.7495 12.8001C17.7495 10.6901 16.0295 8.98006 13.9195 8.98006H8.76945Z'
                      fill='#6A707F'
                    />
                  </svg>
                </span>
              </button>
            </span>
          </div>
        </div>
      )}

      <div className={clsx('grid grid-flow-col auto-cols-auto min-w-96')}>
        <div>
          <div className='flex flex-col gap-3 mb-8 '>
            {step === RegisterStepsEnum.NAME && (
              <>
                <p className='font-color-primary text-3xl text-bold max-w-sm'>
                  ¿Eres nuevo aquí? <br />
                  Crea tu cuenta ahora
                </p>
                <p className='text-gray-400 max-w-sm text-sm'>
                  Crea tu cuenta en unos sencillos pasos para unirte a Student Space.
                </p>
              </>
            )}
            {step !== RegisterStepsEnum.NAME && (
              <>
                {name?.trim() != undefined && (
                  <p className='font-color-primary text-3xl text-bold max-w-sm'>
                    <span className='text-orange-500'>{name}</span>, ayudanos a <br />
                    conocerte mejor
                  </p>
                )}
                {name?.trim() == undefined && (
                  <p className='font-color-primary text-3xl text-bold max-w-md'>Ayudanos a conocerte mejor</p>
                )}
                <p className='text-gray-400 max-w-sm text-sm'>Rellena tus datos para unirte a Student Space.</p>
              </>
            )}
          </div>
          <form onSubmit={handleSubmit(onRegisterSuccess)}>
            <div className='text-red-500 mb-2'>{errorMessage}</div>
            <div className='flex-row flex justify-between gap-3  '>
              {step === RegisterStepsEnum.NAME && (
                <Input
                  {...register('name', { required: true })}
                  isRequired
                  placeholder='¿Cúal es tu nombre?'
                  size='md'
                  onValueChange={e => setName(e)}
                />
              )}
              {step === RegisterStepsEnum.USERNAME_EMAIL_BIRTHDAY && (
                <div className='flex flex-col w-full gap-3'>
                  <Input
                    {...register('username', { required: true })}
                    isRequired
                    placeholder='Nombre de usuario'
                    size='md'
                    onValueChange={e => setUsername(e)}
                  />
                  <Input
                    {...register('email', { required: true })}
                    isRequired
                    onValueChange={e => setEmail(e)}
                    type='email'
                    className='max-w-82'
                    placeholder='Correo electrónico'
                    size='md'
                    endContent={<MailIcon className='text-lg text-default-400 pointer-events-none flex-shrink-0' />}
                  />
                  <DatePicker
                    onChange={e => setValue('birthday', e && e.toString())}
                    size='sm'
                    label='Fecha de nacimiento'
                  />
                </div>
              )}
              {step === RegisterStepsEnum.PASSWORD && (
                <div className='flex flex-col w-full gap-3'>
                  <Input
                    placeholder='Contraseña'
                    {...register('password', { required: true })}
                    onValueChange={e => setPassword(e)}
                    className={clsx('min-w-72')}
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
                    className={clsx('min-w-72')}
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
                </div>
              )}
              {step == RegisterStepsEnum.NAME && (
                <Button
                  isIconOnly
                  onClick={() => handleSetStep(+1)}
                  isDisabled={name?.trim() === undefined || name?.trim() === ''}
                  size='md'
                  className='z-10'
                  style={{ backgroundColor: '#191c1f' }}
                  data-test-id='login-username-btn'
                >
                  <svg
                    className='size-3.5'
                    width='23'
                    height='21'
                    viewBox='0 0 23 21'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21 10.5L12.8571 2M21 10.5L12.8571 19M21 10.5H2'
                      stroke='#F7F7F7'
                      strokeWidth='3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Button>
              )}
              {step == RegisterStepsEnum.USERNAME_EMAIL_BIRTHDAY && (
                <Button
                  isIconOnly
                  onClick={() => handleSetStep(+1)}
                  isDisabled={
                    username?.trim() === undefined ||
                    email?.trim() === undefined ||
                    username?.trim() === '' ||
                    email?.trim() === ''
                  }
                  size='md'
                  className='z-10'
                  style={{ backgroundColor: '#191c1f' }}
                  data-test-id='login-username-btn'
                >
                  <svg
                    className='size-3.5'
                    width='23'
                    height='21'
                    viewBox='0 0 23 21'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21 10.5L12.8571 2M21 10.5L12.8571 19M21 10.5H2'
                      stroke='#F7F7F7'
                      strokeWidth='3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Button>
              )}
              {step === RegisterStepsEnum.PASSWORD && (
                <Button
                  isIconOnly
                  size='md'
                  isDisabled={
                    password?.trim() === undefined ||
                    password?.trim() === '' ||
                    repeatPassword?.trim() === undefined ||
                    repeatPassword?.trim() === ''
                  }
                  className='z-10'
                  type='submit'
                  style={{ backgroundColor: '#191c1f' }}
                  data-test-id='login-username-btn'
                >
                  <svg
                    className='size-3.5'
                    width='23'
                    height='21'
                    viewBox='0 0 23 21'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21 10.5L12.8571 2M21 10.5L12.8571 19M21 10.5H2'
                      stroke='#F7F7F7'
                      strokeWidth='3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
